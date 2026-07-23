"use client";

import { Board, Column } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicatioinDialog from "./ui/create-job-dialog";

interface KanbanBoardProps {
  board: Board;
  userId: string;
}

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: ColConfig[] = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
}) {
  return (
    <Card className="min-w-[300px] shrink-0 overflow-hidden p-0 shadow-md">
      <CardHeader
        className={`${config.color} rounded-t-lg px-4 py-3 text-white`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-base font-semibold text-white">
              {column.name}
            </CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="min-h-[400px] space-y-2 rounded-b-lg bg-gray-50/50 pt-4">
        <CreateJobApplicatioinDialog
          columnId={String(column._id)}
          boardId={boardId}
        />
      </CardContent>
    </Card>
  );
}

export default function KanbanBoard({ board, userId }: KanbanBoardProps) {
  const columns = board.columns;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 overflow-x-auto p-2 pb-4">
        {columns.map((col, index) => {
          const config = COLUMN_CONFIG[index] || {
            color: "bg-gray-500",
            icon: <Calendar className="h-4 w-4" />,
          };

          return (
            <DroppableColumn
              key={String(col._id)}
              column={col}
              config={config}
              boardId={String(board._id)}
            />
          );
        })}
      </div>
    </div>
  );
}
