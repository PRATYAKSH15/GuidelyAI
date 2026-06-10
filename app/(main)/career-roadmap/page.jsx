import { getRoadmaps } from "@/actions/career-roadmap";
import { getUserProfile } from "@/actions/user";
import RoadmapGenerator from "./_components/roadmap-generator";
import SavedRoadmaps from "./_components/saved-roadmaps";
import { Badge } from "@/components/ui/badge";
import { Map } from "lucide-react";

export default async function CareerRoadmapPage() {
  const [user, roadmaps] = await Promise.all([getUserProfile(), getRoadmaps()]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="gap-1.5">
          <Map className="h-3 w-3" />
          AI-Generated
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight gradient-title md:text-5xl">
          Career Roadmap
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Get a personalized, step-by-step plan to go from where you are to where you want to be.
        </p>
      </div>

      <RoadmapGenerator userIndustry={user?.industry ?? ""} />
      <SavedRoadmaps roadmaps={roadmaps} />
    </div>
  );
}
