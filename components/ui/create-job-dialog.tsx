"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { createJobApplication } from "@/lib/actions/job-applications";

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

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

export default function CreateJobApplicatioinDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await createJobApplications({
        ...formData,
        columnId,
        boardId,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      console.log("createJobApplications result:", result);

      if (!result?.error) {
        // Success: reset form and close dialog
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
      } else {
        console.log("Failed to create job", result.error);
      }
    } catch (err) {
      console.error("createJobApplications threw:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTitle>Add Job Application</DialogTitle>
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
                    setFormData({ ...formData, company: e.target.value })
                  }
                  value={formData.company}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  value={formData.position}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  value={formData.location}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $100k - $150k"
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  value={formData.salary}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input
                id="jobUrl"
                placeholder="https://..."
                onChange={(e) =>
                  setFormData({ ...formData, jobUrl: e.target.value })
                }
                value={formData.jobUrl}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of the role..."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                value={formData.notes}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="remote, senior, frontend"
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                value={formData.tags}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData(INITIAL_FORM_DATA);
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
