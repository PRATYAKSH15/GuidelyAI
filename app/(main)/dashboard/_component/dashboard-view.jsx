"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Clock,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const getDemandColor = (level) => {
  switch (level?.toLowerCase()) {
    case "high":   return "bg-green-500";
    case "medium": return "bg-yellow-500";
    case "low":    return "bg-red-500";
    default:       return "bg-muted";
  }
};

const getDemandBadgeVariant = (level) => {
  switch (level?.toLowerCase()) {
    case "high":   return "default";
    case "medium": return "secondary";
    case "low":    return "destructive";
    default:       return "outline";
  }
};

const getOutlookInfo = (outlook) => {
  switch (outlook?.toLowerCase()) {
    case "positive": return { icon: TrendingUp,   color: "text-green-500" };
    case "neutral":  return { icon: LineChart,     color: "text-yellow-500" };
    case "negative": return { icon: TrendingDown,  color: "text-red-500" };
    default:         return { icon: LineChart,     color: "text-muted-foreground" };
  }
};

export default function DashboardView({ insights }) {
  const salaryData = insights.salaryRanges.map((r) => ({
    name: r.role,
    min:    Math.round(r.min / 1000),
    median: Math.round(r.median / 1000),
    max:    Math.round(r.max / 1000),
  }));

  const { icon: OutlookIcon, color: outlookColor } = getOutlookInfo(insights.marketOutlook);
  const lastUpdated     = format(new Date(insights.lastUpdated), "MMM d, yyyy");
  const nextUpdateLabel = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true });

  return (
    <div className="space-y-6">
      {/* Last updated */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        Last updated {lastUpdated} · Next update {nextUpdateLabel}
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Outlook</CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{insights.marketOutlook}</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Industry Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-2xl font-bold">{insights.growthRate.toFixed(1)}%</p>
            <Progress value={insights.growthRate} className="h-1.5" />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant={getDemandBadgeVariant(insights.demandLevel)} className="text-sm font-semibold">
              {insights.demandLevel}
            </Badge>
            <div className={`h-1.5 w-full rounded-full ${getDemandColor(insights.demandLevel)}`} />
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary chart */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>Min, median, and max salaries in thousands (USD)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="bg-background border border-border rounded-lg p-3 shadow-md text-sm">
                        <p className="font-semibold mb-1">{label}</p>
                        {payload.map((item) => (
                          <p key={item.name} className="text-muted-foreground">
                            {item.name}: <span className="text-foreground font-medium">${item.value}K</span>
                          </p>
                        ))}
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="min"    fill="#cbd5e1" name="Min"    radius={[3,3,0,0]} />
                <Bar dataKey="median" fill="#94a3b8" name="Median" radius={[3,3,0,0]} />
                <Bar dataKey="max"    fill="#475569" name="Max"    radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trends + Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Key Industry Trends</CardTitle>
            <CardDescription>Current signals shaping the market</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.keyTrends.map((trend, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>High-value skills to develop next</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
