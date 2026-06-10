"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

export default function OnboardingForm({ industries }) {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const { loading: updateLoading, fn: updateUserFn, data: updateResult } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(onboardingSchema) });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;
      await updateUserFn({ ...values, industry: formattedIndustry });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Badge variant="outline" className="gap-1.5 mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            One-time setup
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight gradient-title">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground">
            Tell us about yourself so we can personalize your experience.
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Industry */}
              <div className="space-y-1.5">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("industry", value);
                    setSelectedIndustry(industries.find((ind) => ind.id === value));
                    setValue("subIndustry", "");
                  }}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Industries</SelectLabel>
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id}>
                          {ind.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-destructive">{errors.industry.message}</p>
                )}
              </div>

              {/* Specialization */}
              {watchIndustry && (
                <div className="space-y-1.5">
                  <Label htmlFor="subIndustry">Specialization</Label>
                  <Select onValueChange={(value) => setValue("subIndustry", value)}>
                    <SelectTrigger id="subIndustry">
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Specializations</SelectLabel>
                        {selectedIndustry?.subIndustries.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.subIndustry && (
                    <p className="text-sm text-destructive">{errors.subIndustry.message}</p>
                  )}
                </div>
              )}

              {/* Experience */}
              <div className="space-y-1.5">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="e.g. 3"
                  {...register("experience")}
                />
                {errors.experience && (
                  <p className="text-sm text-destructive">{errors.experience.message}</p>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g. Python, JavaScript, Project Management"
                  {...register("skills")}
                />
                <p className="text-xs text-muted-foreground">Separate multiple skills with commas</p>
                {errors.skills && (
                  <p className="text-sm text-destructive">{errors.skills.message}</p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief summary of your background and goals..."
                  className="h-28 resize-none"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full gap-2" disabled={updateLoading}>
                {updateLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
