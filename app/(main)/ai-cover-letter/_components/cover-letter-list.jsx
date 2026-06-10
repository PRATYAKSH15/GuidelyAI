"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <div className="border border-dashed border-border rounded-xl py-16 flex flex-col items-center text-center gap-3">
        <div className="p-3 rounded-full bg-muted">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">No cover letters yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first cover letter to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {coverLetters.map((letter) => (
        <Card key={letter.id} className="border-border hover:border-primary/30 transition-colors">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-1.5">
                <p className="font-semibold text-base leading-snug">
                  {letter.jobTitle}{" "}
                  <span className="text-muted-foreground font-normal">at</span>{" "}
                  {letter.companyName}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {format(new Date(letter.createdAt), "MMM d, yyyy")}
                  </Badge>
                </div>
                {letter.jobDescription && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {letter.jobDescription}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 hover:border-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this cover letter?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your cover letter for{" "}
                        <strong>{letter.jobTitle}</strong> at{" "}
                        <strong>{letter.companyName}</strong>. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
