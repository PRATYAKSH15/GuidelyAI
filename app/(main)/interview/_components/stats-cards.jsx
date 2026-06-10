import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const averageScore = assessments?.length
    ? (assessments.reduce((sum, a) => sum + a.quizScore, 0) / assessments.length).toFixed(1)
    : 0;

  const totalQuestions = assessments?.length
    ? assessments.reduce((sum, a) => sum + a.questions.length, 0)
    : 0;

  const latestScore = assessments?.[0]?.quizScore?.toFixed(1) ?? 0;

  const stats = [
    {
      label: "Average Score",
      value: `${averageScore}%`,
      sub: `Across ${assessments?.length ?? 0} assessments`,
      icon: Trophy,
    },
    {
      label: "Questions Practiced",
      value: totalQuestions,
      sub: "Total across all quizzes",
      icon: Brain,
    },
    {
      label: "Latest Score",
      value: `${latestScore}%`,
      sub: "Most recent quiz",
      icon: Target,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map(({ label, value, sub, icon: Icon }) => (
        <Card key={label} className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
