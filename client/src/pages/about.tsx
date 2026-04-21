import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Target,
  Heart,
  Users,
  Award,
  Globe,
  TrendingUp,
  Shield,
} from "lucide-react";
import { SEO } from "@/components/seo";

const values = [
  {
    icon: Target,
    title: "Transparency",
    description: "Clear processes, honest reporting, and open communication at every step.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused",
    description: "Every strategy we implement is designed to drive measurable business growth.",
  },
  {
    icon: Shield,
    title: "Compliance First",
    description: "We prioritize account health and regulatory compliance across all markets.",
  },
  {
    icon: Heart,
    title: "Client Partnership",
    description: "We treat every client's business as our own, building long-term partnerships.",
  },
];

const timeline = [
  {
    year: "Founded",
    title: "Etycons Established",
    description: "Started as a specialist eBay management agency in the United Kingdom.",
  },
  {
    year: "Expanded",
    title: "Multi-Platform Growth",
    description: "Extended services to TikTok Shop, Amazon, and Shopify management.",
  },
  {
    year: "Global",
    title: "International Markets",
    description: "Expanded operations to serve sellers across USA, Europe, and Australia.",
  },
  {
    year: "Today",
    title: "Full-Service Agency",
    description: "Comprehensive e-commerce operations partner with 500+ active seller accounts.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col">
      <SEO
        title="About Us - Your E-Commerce Growth Partner"
        description="Learn about Etycons, a UK-based e-commerce operations agency helping sellers scale across eBay, TikTok Shop, Amazon, and Shopify in the UK, USA, Europe, and Australia."
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Badge variant="secondary" className="mb-3">
            About Etycons
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Your Trusted <span className="text-primary">E-Commerce Partner</span>
          </h1>
          <p className="mt-4 text-white/80 max-w-xl text-base sm:text-lg leading-relaxed">
            We're a team of e-commerce specialists dedicated to helping online sellers navigate, scale, and succeed across global marketplaces.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-3">Our Story</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Built by Sellers, <span className="text-primary">for Sellers</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Etycons was founded with a simple mission: to make e-commerce accessible and profitable for sellers of all sizes. Our team brings together deep expertise across eBay, TikTok Shop, Amazon, and Shopify, having managed hundreds of accounts and millions in marketplace revenue.
                </p>
                <p>
                  Based in the United Kingdom, we've expanded our reach to serve sellers across the United States, Europe, and Australia. We understand the unique challenges of cross-border e-commerce and provide tailored solutions for each market.
                </p>
                <p>
                  Whether you're just starting out or looking to scale an established business, our process-driven approach ensures transparent, measurable results that you can rely on.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, value: "500+", label: "Active Sellers" },
                { icon: Globe, value: "4", label: "Global Markets" },
                { icon: Award, value: "98%", label: "Retention Rate" },
                { icon: TrendingUp, value: "3x", label: "Avg. Revenue Growth" },
              ].map((stat) => (
                <Card key={stat.label} className="p-5 text-center" data-testid={`stat-about-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">Our Values</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              What <span className="text-primary">Drives Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center" data-testid={`card-value-${value.title.toLowerCase()}`}>
                <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">Our Journey</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              The Etycons <span className="text-primary">Timeline</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative" data-testid={`timeline-${item.year.toLowerCase()}`}>
                  <div className="absolute -left-[calc(0.5rem+1px)] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                  <Badge variant="secondary" className="mb-2">{item.year}</Badge>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            Want to Join Our Growing Client Base?
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-lg mx-auto">
            Let's discuss how Etycons can help your e-commerce business thrive.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" data-testid="button-about-cta">
                Book Free Consultation
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/10 text-primary-foreground border-white/30"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
