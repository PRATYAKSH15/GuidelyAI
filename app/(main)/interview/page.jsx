import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="gap-1.5">
          <GraduationCap className="h-3 w-3" />
          Practice & Improve
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight gradient-title md:text-5xl">
          Interview Preparation
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Sharpen your skills with AI-generated quizzes tailored to your industry. Track your progress and improve over time.
        </p>
      </div>

      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
