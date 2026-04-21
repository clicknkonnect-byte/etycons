import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { SEO } from "@/components/seo";
import type { LucideIcon } from "lucide-react";

export interface ServicePageData {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  heroDescription: string;
  overview: string;
  features: { title: string; description: string }[];
  benefits: string[];
  markets: string[];
  process: { step: string; title: string; description: string }[];
  faq: { question: string; answer: string }[];
}

export function ServiceDetailPage({ data }: { data: ServicePageData }) {
  return (
    <div className="flex flex-col">
      <SEO title={data.seoTitle} description={data.seoDescription} />

      <section className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Link href="/services">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" data-testid="button-back-services">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              All Services
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <data.icon className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="outline">{data.tagline}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-testid="text-service-title">
            {data.title}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
            {data.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" data-testid="button-service-cta">
                Book Free Consultation
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <a href="https://wa.me/923367997447" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed text-base sm:text-lg">
            {data.overview}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-3">What's Included</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature) => (
              <Card key={feature.title} className="overflow-visible p-6" data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge variant="outline" className="mb-3">Why Choose Us</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Benefits</h2>
              <ul className="space-y-3">
                {data.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Badge variant="outline" className="mb-3">Global Reach</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Markets We Serve</h2>
              <div className="grid grid-cols-2 gap-3">
                {data.markets.map((market) => (
                  <Card key={market} className="overflow-visible p-4 text-center">
                    <span className="font-medium text-sm">{market}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-3">How It Works</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.process.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-4xl font-bold text-primary/15 mb-2">{step.step}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-3">FAQ</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {data.faq.map((item) => (
              <Card key={item.question} className="overflow-visible p-6">
                <h3 className="font-semibold mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-lg mx-auto">
            Book a free consultation and let us show you how we can help grow your business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" data-testid="button-service-bottom-cta">
                Book a Free Consultation
              </Button>
            </a>
            <a href="https://wa.me/923367997447" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/10 text-primary-foreground border-white/30"
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
