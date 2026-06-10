import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "50+", label: "Industries Covered" },
  { value: "1,000+", label: "Interview Questions" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "AI Support" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-4xl font-bold gradient-title">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to grow your career
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A complete suite of AI tools designed to help you stand out,
              prepare effectively, and advance with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <Card
                key={i}
                className="group border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <CardContent className="pt-8 pb-6 px-6 flex flex-col items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/5 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-lg leading-snug">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Process</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {howItWorks.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-base">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What our users say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonial.map((t, i) => (
              <Card key={i} className="border border-border bg-card hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6 pb-6 px-6 flex flex-col gap-5">
                  <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                    <Image
                      src={t.image}
                      alt={t.author}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Find answers to common questions about GuidelyAI
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border rounded-lg px-4 bg-background"
                >
                  <AccordionTrigger className="text-left font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-muted/40 px-8 py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Ready to accelerate your career?
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-xl mx-auto mb-8">
              Join professionals who are advancing their careers with AI-powered
              guidance. Free to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Link href="/dashboard">
                <Button size="lg" className="px-8 gap-2">
                  Start for Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {["No credit card required", "AI-powered tools", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
