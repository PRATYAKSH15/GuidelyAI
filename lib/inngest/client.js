import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "guidelyai", name: "GuidelyAI",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});