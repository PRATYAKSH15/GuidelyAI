import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus, PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <Badge variant="outline" className="gap-1.5">
            <PenBox className="h-3 w-3" />
            AI-Powered
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight gradient-title md:text-5xl">
            Cover Letters
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Generate tailored cover letters in seconds. Each one is crafted around the job description and your profile.
          </p>
        </div>
        <Link href="/ai-cover-letter/new" className="shrink-0">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
