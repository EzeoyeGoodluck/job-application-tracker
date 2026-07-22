import { Plus } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

export default function CreateJobApplicatioinDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Plus />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
            <DialogTitle> Add Job Application</DialogTitle>
            <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form>
            <div>
               <div>
                </div> 
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
