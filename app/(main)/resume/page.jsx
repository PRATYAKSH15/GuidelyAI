import { getResume } from "@/actions/resume";
import ResumeEditor from "./_components/resume-editor";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-6xl font-bold gradient-title">Resume Builder</h1>
        <p className="text-muted-foreground mt-1">
          Write your resume in Markdown and get an instant AI-powered ATS score with improvement tips.
        </p>
      </div>

      <ResumeEditor existing={resume} />
    </div>
  );
}
