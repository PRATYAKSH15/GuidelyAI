import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_component/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { BarChart2 } from "lucide-react";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) redirect("/onboarding");

  const insights = await getIndustryInsights();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="gap-1.5">
          <BarChart2 className="h-3 w-3" />
          Live Data
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight gradient-title md:text-5xl">
          Industry Insights
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Real-time market trends, salary benchmarks, and demand signals for your industry.
        </p>
      </div>

      <DashboardView insights={insights} />
    </div>
  );
}
