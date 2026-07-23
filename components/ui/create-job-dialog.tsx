import { Plus } from "lucide-react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Label } from "./label";
import { Input } from "./input";
import React, { useState } from "react";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

export default function CreateJobApplicatioinDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [FormData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
  });

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()

    try {

    } catch (err) {
        console.error(err)

    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle> Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  required
                  onChange={(e) =>
                    setFormData({ ...FormData, company: e.target.value })
                  }
                  value={FormData.company}
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  required
                  onChange={(e) =>
                    setFormData({ ...FormData, position: e.target.value })
                  }
                  value={FormData.position}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="loaction">Location</Label>
                <Input
                  id="location"
                  required
                  onChange={(e) =>
                    setFormData({ ...FormData, location: e.target.value })
                  }
                  value={FormData.location}
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $100k - $150k"
                  onChange={(e) =>
                    setFormData({ ...FormData, salary: e.target.value })
                  }
                  value={FormData.salary}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input
                id="jobUrl"
                placeholder="https://..."
                onChange={(e) =>
                  setFormData({ ...FormData, jobUrl: e.target.value })
                }
                value={FormData.jobUrl}
              />
            </div>

            <div>
              <Label htmlFor="description"> Description </Label>
              <Input
                id="description"
                placeholder="Brief description of the role..."
                onChange={(e) =>
                  setFormData({ ...FormData, description: e.target.value })
                }
                value={FormData.description}
              />
            </div>

            <div>
              <Label htmlFor="notes"> Notes </Label>
              <Input
                id="notes"
                onChange={(e) =>
                  setFormData({ ...FormData, notes: e.target.value })
                }
                value={FormData.notes}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit"> Add Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
