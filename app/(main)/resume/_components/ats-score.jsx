"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, TrendingUp, Key } from "lucide-react";

function scoreColor(score) {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-amber-500";
  return "text-red-500";
}

function scoreLabel(score) {
  if (score >= 80) return { label: "Excellent", variant: "default" };
  if (score >= 60) return { label: "Good", variant: "secondary" };
  if (score >= 40) return { label: "Fair", variant: "outline" };
  return { label: "Needs Work", variant: "destructive" };
}

export default function AtsScore({ resume }) {
  if (!resume?.feedback) return null;

  let analysis;
  try {
    analysis = JSON.parse(resume.feedback);
  } catch {
    return null;
  }

  const { score, summary, strengths = [], improvements = [], keywords = [] } = analysis;
  const { label, variant } = scoreLabel(score);

  return (
    <div className="space-y-4">
      {/* Score card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center justify-between">
            ATS Score
            <Badge variant={variant}>{label}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className={`text-5xl font-bold ${scoreColor(score)}`}>
            {score}<span className="text-xl text-muted-foreground">/100</span>
          </div>
          <Progress value={score} className="h-2" />
          <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
        </CardContent>
      </Card>

      {/* Strengths */}
      {strengths.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Improvements */}
      {improvements.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-500" />
              Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                  {imp}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Key className="h-4 w-4 text-violet-500" />
              Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((kw, i) => (
                <Badge key={i} variant="outline" className="text-xs font-normal">
                  {kw}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
