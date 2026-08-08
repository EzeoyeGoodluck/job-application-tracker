"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Board, Column, JobApplication } from "../models";

interface UpdateJobApplicationData {
  company?: string;
  position?: string;
  location?: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  columnId?: string;
  order?: number;
  tags?: string[];
  description?: string;
}

export async function updateJobApplication(
  id: string,
  updates: UpdateJobApplicationData
) {
  await connectDB();

  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const jobApplication = await JobApplication.findById(id);

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  if (jobApplication.userId.toString() !== session.user.id) {
    return { error: "Unauthorized" };
  }

  const currentColumnId = jobApplication.columnId.toString();
  const newColumnId = updates.columnId ?? currentColumnId;
  const isMovingToDifferentColumn = newColumnId !== currentColumnId;

  const { columnId, order, ...otherUpdates } = updates;

  const updatesToApply: Record<string, unknown> = {
    ...otherUpdates,
  };

  if (isMovingToDifferentColumn) {
    const board = await Board.findOne({
      _id: jobApplication.boardId,
      userId: session.user.id,
    });

    if (!board) {
      return { error: "Board not found" };
    }

    const targetColumn = await Column.findOne({
      _id: newColumnId,
      boardId: board._id,
    });

    if (!targetColumn) {
      return { error: "Target column not found" };
    }

    await Column.findByIdAndUpdate(currentColumnId, {
      $pull: { jobApplications: jobApplication._id },
    });

    await Column.findByIdAndUpdate(newColumnId, {
      $push: { jobApplications: jobApplication._id },
    });

    const targetJobs = await JobApplication.find({
      columnId: newColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    const targetIndex =
      order !== undefined
        ? Math.min(Math.max(order, 0), targetJobs.length)
        : targetJobs.length;

    for (let index = targetIndex; index < targetJobs.length; index++) {
      const job = targetJobs[index];

      await JobApplication.findByIdAndUpdate(job._id, {
        $set: { order: job.order + 100 },
      });
    }

    updatesToApply.columnId = newColumnId;
    updatesToApply.order = targetIndex * 100;
  } else if (order !== undefined) {
    const jobsInColumn = await JobApplication.find({
      columnId: currentColumnId,
      _id: { $ne: id },
    })
      .sort({ order: 1 })
      .lean();

    const newIndex = Math.min(Math.max(order, 0), jobsInColumn.length);

    for (let index = newIndex; index < jobsInColumn.length; index++) {
      const job = jobsInColumn[index];

      await JobApplication.findByIdAndUpdate(job._id, {
        $set: { order: job.order + 100 },
      });
    }

    updatesToApply.order = newIndex * 100;
  }

  const updated = await JobApplication.findByIdAndUpdate(
    id,
    { $set: updatesToApply },
    {
      new: true,
      runValidators: true,
    }
  );

  revalidatePath("/dashboard");

  return {
    data: updated ? JSON.parse(JSON.stringify(updated)) : null,
  };
}