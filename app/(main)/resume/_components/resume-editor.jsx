"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { saveResume } from "@/actions/resume";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Loader2, Save, Sparkles, Download } from "lucide-react";
import AtsScore from "./ats-score";
import { BarLoader } from "react-spinners";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const RESUME_TEMPLATE = `# Your Name
**Email:** your@email.com | **Phone:** +1 234 567 890 | **Location:** City, Country
**LinkedIn:** linkedin.com/in/yourprofile | **GitHub:** github.com/yourhandle

---

## Summary
A brief 2-3 sentence summary highlighting your key skills, experience, and career goals.

---

## Experience

### Job Title — Company Name *(Month Year – Present)*
- Quantified achievement: Increased X by Y% using Z technology
- Led a team of N engineers to deliver a project that resulted in...
- Built/designed/optimized [feature/system] which reduced [metric] by [amount]

### Previous Job Title — Previous Company *(Month Year – Month Year)*
- Achievement with measurable impact
- Responsibility or project description

---

## Education

### Degree Name — University Name *(Year – Year)*
- Relevant coursework or achievements

---

## Skills
**Languages:** JavaScript, TypeScript, Python
**Frameworks:** React, Next.js, Node.js
**Tools:** Git, Docker, AWS

---

## Projects

### Project Name
- Short description of what it does and the tech stack used
- Link: github.com/yourhandle/project
`;

export default function ResumeEditor({ existing }) {
  const [content, setContent] = useState(existing?.content ?? RESUME_TEMPLATE);
  const [saved, setSaved] = useState(existing ?? null);

  const { loading, fn: save } = useFetch(saveResume);

  const handleDownloadPDF = () => {
    const previewEl = document.querySelector(".w-md-editor-preview .wmde-markdown");
    if (!previewEl) {
      toast.error("Switch to Live or Preview mode first, then download.");
      return;
    }
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Resume</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      max-width: 820px;
      margin: 0 auto;
      padding: 48px 56px;
      color: #111;
      line-height: 1.65;
      font-size: 13px;
    }
    h1 { font-size: 26px; font-weight: 700; margin-bottom: 4px; }
    h2 {
      font-size: 13px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      border-bottom: 1.5px solid #111;
      padding-bottom: 3px;
      margin: 20px 0 8px;
    }
    h3 { font-size: 13px; font-weight: 600; margin: 12px 0 3px; }
    p { margin-bottom: 5px; }
    ul { margin: 4px 0 8px 18px; }
    li { margin-bottom: 2px; }
    a { color: #111; text-decoration: none; }
    strong { font-weight: 600; }
    em { font-style: italic; }
    hr { border: none; border-top: 1px solid #ddd; margin: 10px 0; }
    @media print {
      body { padding: 32px 40px; }
      @page { margin: 0.5cm; }
    }
  </style>
</head>
<body>${previewEl.innerHTML}</body>
</html>`);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  const handleSave = async () => {
    if (!content?.trim()) {
      toast.error("Resume content cannot be empty");
      return;
    }
    const result = await save(content);
    if (result) {
      setSaved(result);
      toast.success("Resume saved and scored!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-border">
        <p className="text-sm text-muted-foreground">
          Edit in Markdown · Click{" "}
          <span className="font-medium text-foreground">Save & Score</span> for
          your ATS analysis
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button size="sm" onClick={handleSave} disabled={loading} className="gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Save & Score
              </>
            )}
          </Button>
        </div>
      </div>

      {loading && <BarLoader width="100%" color="gray" />}

      {/* Editor + ATS panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Editor — 2/3 width */}
        <div className="lg:col-span-2 rounded-lg border border-border overflow-hidden" data-color-mode="light">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val ?? "")}
            height={680}
            preview="live"
          />
        </div>

        {/* ATS Score panel — 1/3 width */}
        <div className="lg:col-span-1">
          {saved?.feedback ? (
            <AtsScore resume={saved} />
          ) : (
            <Card className="border-dashed border-border">
              <CardContent className="pt-10 pb-10 flex flex-col items-center text-center gap-3">
                <div className="p-3 rounded-full bg-muted">
                  <Save className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">No score yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Save your resume to see your ATS score and improvement tips.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
