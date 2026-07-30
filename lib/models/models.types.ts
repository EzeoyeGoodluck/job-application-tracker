export interface JobApplication {
  _id: string;
  company: string;
  position: string;
  location: string;
  status: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  order: number;
  tags?: string[];
  description?: string;
  columnId?: string;
  boardId?: string;
}
export interface Column {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplication[];
}

export interface Board {
  _id: string;
  name: string;
  column: Column[];
}
