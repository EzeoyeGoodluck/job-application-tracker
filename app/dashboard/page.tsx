import KanbanBoard from "@/components/kanban-board";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getBoard(userId: string) {
  "use cache";

  await connectDB();

  const boardDoc = await Board.findOne({
    userId,
    name: "Job Hunt",
  })
    .populate({
      path: "columns",
      populate: {
        path: "jobApplications",
      },
    })
    .lean();

  if (!boardDoc) return null;

  return {
    _id: String(boardDoc._id),
    name: boardDoc.name,
    userId: String(boardDoc.userId),
    createdAt: boardDoc.createdAt?.toISOString?.() ?? null,
    updatedAt: boardDoc.updatedAt?.toISOString?.() ?? null,
    columns: (boardDoc.columns || []).map((column: any) => ({
      _id: String(column._id),
      name: column.name,
      order: column.order,
      createdAt: column.createdAt?.toISOString?.() ?? null,
      updatedAt: column.updatedAt?.toISOString?.() ?? null,
      jobApplications: (column.jobApplications || []).map((job: any) => ({
        _id: String(job._id),
        company: job.company,
        position: job.position,
        location: job.location,
        status: job.status,
        notes: job.notes ?? null,
        salary: job.salary ?? null,
        jobUrl: job.jobUrl ?? null,
        order: job.order,
        tags: job.tags ?? [],
        description: job.description ?? null,
        columnId: job.columnId ? String(job.columnId) : String(column._id),
        boardId: job.boardId ? String(job.boardId) : String(boardDoc._id),
        createdAt: job.createdAt?.toISOString?.() ?? null,
        updatedAt: job.updatedAt?.toISOString?.() ?? null,
      })),
    })),
  };
}

async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const board = await getBoard(session.user.id);

  if (!board) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
            <p className="text-gray-600">No board found for this user.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">{board.name}</h1>
          <p className="text-gray-600">Track your job application</p>
        </div>
        <KanbanBoard board={board} userId={session.user.id} />
      </div>
    </div>
  );
}

export default async function Dashboard() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage />
    </Suspense>
  );
}
