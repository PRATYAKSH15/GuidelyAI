"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Award,
  Lightbulb,
  ChevronRight,
  DollarSign,
} from "lucide-react";

export default function RoadmapDisplay({ roadmap }) {
  const data = roadmap.content ?? roadmap;

  return (
    <div className="space-y-8">
      {/* Header summary card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{data.currentRole}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-primary text-base">{data.targetRole}</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
          <div className="flex flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{data.timeframe}</span>
            </div>
            {data.salaryExpectation && (
              <div className="flex items-center gap-1.5 text-sm">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="font-medium">{data.salaryExpectation}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline phases */}
      <div className="relative space-y-0">
        {data.phases?.map((phase, index) => (
          <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Vertical connector line */}
            {index < data.phases.length - 1 && (
              <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />
            )}

            {/* Phase number bubble */}
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow">
              {phase.phase}
            </div>

            {/* Phase content */}
            <div className="flex-1 min-w-0">
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="pt-5 space-y-4">
                  {/* Phase header */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg">{phase.title}</h3>
                    <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />
                      {phase.duration}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Skills */}
                  {phase.skills?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Skills to Learn
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {phase.actions?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                        <Target className="h-3 w-3" /> Key Actions
                      </p>
                      <ul className="space-y-1.5">
                        {phase.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Milestones */}
                  {phase.milestones?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Milestones
                      </p>
                      <ul className="space-y-1.5">
                        {phase.milestones.map((m, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Skill gaps + certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.skillGaps?.length > 0 && (
          <Card>
            <CardContent className="pt-5 space-y-3">
              <p className="font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Skill Gaps to Address
              </p>
              <div className="flex flex-wrap gap-2">
                {data.skillGaps.map((gap, i) => (
                  <Badge key={i} variant="destructive" className="text-xs font-normal">
                    {gap}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {data.certifications?.length > 0 && (
          <Card>
            <CardContent className="pt-5 space-y-3">
              <p className="font-semibold flex items-center gap-2">
                <Award className="h-4 w-4 text-violet-500" />
                Recommended Certifications
              </p>
              <ul className="space-y-1.5">
                {data.certifications.map((cert, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Award className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
