import { getRoadmaps } from "@/actions/career-roadmap";
import { getUserProfile } from "@/actions/user";
import RoadmapGenerator from "./_components/roadmap-generator";
import SavedRoadmaps from "./_components/saved-roadmaps";

export default async function CareerRoadmapPage() {
  const [user, roadmaps] = await Promise.all([getUserProfile(), getRoadmaps()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-6xl font-bold gradient-title">Career Roadmap</h1>
        <p className="text-muted-foreground mt-1">
          Generate a personalized step-by-step plan to reach your target role.
        </p>
      </div>

      <RoadmapGenerator userIndustry={user?.industry ?? ""} />

      <SavedRoadmaps roadmaps={roadmaps} />
    </div>
  );
}
