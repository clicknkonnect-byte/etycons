import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  MessageSquare,
  Search,
  Rocket,
  BarChart3,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { SEO } from "@/components/seo";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    description: "We start with a detailed conversation to understand your business, current challenges, and growth goals across your target marketplaces.",
    details: [
      "Discuss your current e-commerce presence",
      "Identify pain points and bottlenecks",
      "Understand your target markets (UK, US, EU, AU)",
      "Align on goals and expectations",
    ],
  },
  {
    step: "02",
    icon: Search,
    title: "Business Audit & Strategy",
    description: "Our team conducts a thorough audit of your current operations and develops a tailored growth strategy.",
    details: [
      "Account health assessment",
      "Competitor and market analysis",
      "Revenue opportunity identification",
      "Custom action plan development",
    ],
  },
  {
    step: "03",
    icon: Rocket,
    title: "Implementation & Launch",
    description: "We execute the strategy with dedicated account managers handling every detail of your marketplace operations.",
    details: [
      "Listing optimization and creation",
      "Account setup and configuration",
      "Compliance and policy alignment",
      "Fulfilment and logistics coordination",
    ],
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Monitor & Scale",
    description: "Continuous monitoring, reporting, and optimization to ensure consistent growth and maximum profitability.",
    details: [
      "Weekly performance reports",
      "Ongoing listing and pricing optimization",
      "Scaling into new markets and categories",
      "Regular strategy review meetings",
    ],
  },
];

const faqs = [
  {
    q: "How long does onboarding take?",
    a: "Most clients are fully onboarded within 5-7 business days. Complex multi-platform setups may take up to 2 weeks.",
  },
  {
    q: "Do you offer contracts or is it month-to-month?",
    a: "We offer flexible month-to-month agreements with no long-term commitments. We believe in earning your business every month.",
  },
  {
    q: "Which markets do you support?",
    a: "We actively support sellers in the UK, USA, Europe (including Germany, France, Italy, Spain), and Australia.",
  },
  {
    q: "Can you manage multiple platforms simultaneously?",
    a: "Absolutely. Many of our clients use us for multi-platform management across eBay, Amazon, TikTok Shop, and Shopify together.",
  },
  {
    q: "What reporting do you provide?",
    a: "We provide weekly performance reports covering sales, traffic, conversion rates, account health metrics, and actionable recommendations.",
  },
  {
    q: "Do I need existing accounts to get started?",
    a: "No. We can help you set up new marketplace accounts from scratch or take over management of your existing ones.",
  },
];

export default function HowItWorks() {
  return (
    <div className="flex flex-col">
      <SEO
        title="How It Works - Our Simple 4-Step Process"
        description="Learn how Etycons works. From free consultation to ongoing monitoring, our 4-step process makes scaling your e-commerce business simple and transparent."
      />
      <section className="relative overflow-hidden bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Badge variant="outline" className="mb-3">Our Process</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            How It <span className="text-primary">Works</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl text-base sm:text-lg leading-relaxed">
            A simple, transparent process designed to get your e-commerce business up and running quickly.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <Card
                key={step.step}
                className="overflow-visible p-6 sm:p-8"
                data-testid={`card-step-${step.step}`}
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                  <div className="flex items-start gap-4 lg:w-1/2">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {step.step}
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="hidden lg:block w-0.5 h-8 bg-primary/20 mt-2" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">{step.title}</h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {faqs.map((faq) => (
              <Card key={faq.q} className="p-6" data-testid={`card-faq-${faq.q.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}`}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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
            Book your free consultation today and let's discuss how we can help scale your e-commerce business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" data-testid="button-hiw-cta-contact">
                Book Free Consultation
                <ArrowRight className="w-4 h-4 ml-1.5" />
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
