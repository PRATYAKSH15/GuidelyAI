"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { generateRoadmap } from "@/actions/career-roadmap";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import RoadmapDisplay from "./roadmap-display";

const schema = z.object({
  currentRole: z.string().min(2, "Current role is required"),
  targetRole: z.string().min(2, "Target role is required"),
});

export default function RoadmapGenerator({ userIndustry }) {
  const [generated, setGenerated] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { currentRole: userIndustry ?? "" },
  });

  const { loading, fn: generate } = useFetch(generateRoadmap);

  const onSubmit = async (data) => {
    const result = await generate(data);
    if (result) setGenerated(result);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <BarLoader width="100%" color="gray" />
        <p className="text-center text-muted-foreground text-sm">
          Generating your personalized career roadmap…
        </p>
      </div>
    );
  }

  if (generated) {
    return (
      <div className="space-y-6">
        <RoadmapDisplay roadmap={generated} />
        <Button variant="outline" onClick={() => setGenerated(null)} className="w-full">
          Generate Another Roadmap
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="currentRole">Current Role / Title</Label>
            <Input
              id="currentRole"
              placeholder="e.g. Frontend Developer"
              {...register("currentRole")}
            />
            {errors.currentRole && (
              <p className="text-sm text-destructive">{errors.currentRole.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="targetRole">Target Role / Title</Label>
            <Input
              id="targetRole"
              placeholder="e.g. Engineering Manager"
              {...register("targetRole")}
            />
            {errors.targetRole && (
              <p className="text-sm text-destructive">{errors.targetRole.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full gap-2">
            <Sparkles className="h-4 w-4" />
            Generate Roadmap
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
