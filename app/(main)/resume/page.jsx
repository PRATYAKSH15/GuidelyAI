import { getResume } from "@/actions/resume";
import ResumeEditor from "./_components/resume-editor";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="gap-1.5">
          <FileText className="h-3 w-3" />
          ATS-Optimized
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight gradient-title md:text-5xl">
          Resume Builder
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Write your resume in Markdown and get an instant AI-powered ATS score with improvement tips.
        </p>
      </div>

      <ResumeEditor existing={resume} />
    </div>
  );
}
