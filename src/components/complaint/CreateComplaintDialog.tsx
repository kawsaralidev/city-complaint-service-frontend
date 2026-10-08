"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ComplaintForm from "@/components/form/complaintForm";

interface CreateComplaintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateComplaintDialog = ({
  open,
  onOpenChange,
}: CreateComplaintDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create a Complaint
          </DialogTitle>

          <DialogDescription>
            Provide the details below to submit your complaint.
          </DialogDescription>
        </DialogHeader>

        <ComplaintForm onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateComplaintDialog;
