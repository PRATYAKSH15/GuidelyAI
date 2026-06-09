"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { deleteRoadmap } from "@/actions/career-roadmap";
import RoadmapDisplay from "./roadmap-display";
import { toast } from "sonner";

export default function SavedRoadmaps({ roadmaps: initial }) {
  const [roadmaps, setRoadmaps] = useState(initial);
  const [expanded, setExpanded] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await deleteRoadmap(id);
      setRoadmaps((prev) => prev.filter((r) => r.id !== id));
      if (expanded === id) setExpanded(null);
      toast.success("Roadmap deleted");
    } catch {
      toast.error("Failed to delete roadmap");
    } finally {
      setDeleting(null);
    }
  };

  if (!roadmaps.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Saved Roadmaps</h2>

      {roadmaps.map((roadmap) => (
        <Card key={roadmap.id} className="overflow-hidden">
          <CardContent className="pt-4 pb-4">
            {/* Row header */}
            <div className="flex items-center justify-between gap-3">
              <button
                className="flex items-center gap-2 flex-1 text-left min-w-0"
                onClick={() => setExpanded(expanded === roadmap.id ? null : roadmap.id)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium truncate">{roadmap.currentRole}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-semibold text-primary truncate">{roadmap.targetRole}</span>
                </div>
                <Badge variant="secondary" className="shrink-0 ml-2">
                  {new Date(roadmap.createdAt).toLocaleDateString()}
                </Badge>
                {expanded === roadmap.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                disabled={deleting === roadmap.id}
                onClick={() => handleDelete(roadmap.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Expanded content */}
            {expanded === roadmap.id && (
              <div className="mt-6 border-t pt-6">
                <RoadmapDisplay roadmap={roadmap} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
