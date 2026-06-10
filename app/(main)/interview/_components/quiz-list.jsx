"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, ChevronRight, Lightbulb, ClipboardList } from "lucide-react";
import QuizResult from "./quiz-result";

function scoreVariant(score) {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";
  return "destructive";
}

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Quizzes</CardTitle>
              <CardDescription>Review your past performance</CardDescription>
            </div>
            <Button onClick={() => router.push("/interview/mock")} className="gap-2">
              <Plus className="h-4 w-4" />
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!assessments?.length ? (
            <div className="border border-dashed border-border rounded-lg py-12 flex flex-col items-center text-center gap-3">
              <div className="p-3 rounded-full bg-muted">
                <ClipboardList className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">No quizzes yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start your first quiz to see results here
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {assessments.map((assessment, i) => (
                <div
                  key={assessment.id}
                  className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => setSelectedQuiz(assessment)}
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">Quiz {assessments.length - i}</p>
                      <Badge variant={scoreVariant(assessment.quizScore)} className="text-xs">
                        {assessment.quizScore.toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(assessment.createdAt), "MMM d, yyyy · h:mm a")}
                    </p>
                    {assessment.improvementTip && (
                      <div className="flex items-start gap-1.5 mt-2">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {assessment.improvementTip}
                        </p>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle />
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
