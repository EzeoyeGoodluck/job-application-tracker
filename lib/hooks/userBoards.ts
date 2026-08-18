"use client";

import { useEffect, useState } from "react";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";

export function UserBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns ?? []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBoard(initialBoard ?? null);
    setColumns(initialBoard?.columns ?? []);
  }, [initialBoard]);

  async function moveJobs(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number
  ) {
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      // Find and remove job from the old column
      let jobToMove: JobApplication | null = null;
      let oldColumnIndex = -1;

      for (let i = 0; i < newColumns.length; i++) {
        const col = newColumns[i];
        const jobIndex = col.jobApplications.findIndex(
          (j) => j._id === jobApplicationId
        );
        if (jobIndex !== -1) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnIndex = i;
          // Create a new array instead of mutating
          newColumns[i] = {
            ...col,
            jobApplications: col.jobApplications.filter(
              (job) => job._id !== jobApplicationId
            ),
          };
          break;
        }
      }

      if (jobToMove && oldColumnIndex !== -1) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId
        );
        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          const jobsWithUpdatedOrders = updatedJobs.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Error", err);
      // Optional: revert state on error
    }
  }

  return { board, columns, error, moveJobs };
}
