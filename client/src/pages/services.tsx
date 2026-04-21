import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShoppingBag,
  TrendingUp,
  Shield,
  Globe,
  Package,
  BarChart3,
  Warehouse,
  CheckCircle,
  MessageCircle,
  Truck,
} from "lucide-react";
import { SEO } from "@/components/seo";

const services = [
  {
    id: "ebay",
    slug: "/services/ebay",
    icon: ShoppingBag,
    title: "eBay Account Management",
    description: "Complete eBay store management tailored for UK, US, European, and Australian markets.",
    features: [
      "Listing creation & optimization",
      "Pricing strategy & competitor analysis",
      "Customer service & returns management",
      "Performance analytics & reporting",
      "Multi-currency listing support",
      "Cross-border trade compliance",
    ],
  },
  {
    id: "tiktok",
    slug: "/services/tiktok",
    icon: TrendingUp,
    title: "TikTok Shop UK Management",
    description: "Launch and grow your TikTok Shop presence with expert social commerce strategies.",
    features: [
      "Shop setup & product catalogue",
      "Content strategy & creator partnerships",
      "Order fulfillment management",
      "Performance optimization",
      "Affiliate programme management",
      "Live shopping event support",
    ],
  },
  {
    id: "amazon",
    slug: "/services/amazon",
    icon: Package,
    title: "Amazon Seller Support",
    description: "Navigate Amazon's complex ecosystem with dedicated seller account management.",
    features: [
      "FBA & FBM account management",
      "Product listing optimization (SEO)",
      "PPC campaign management",
      "Brand Registry & A+ Content",
      "Inventory planning & restocking",
      "Account health monitoring",
    ],
  },
  {
    id: "shopify",
    slug: "/services/shopify",
    icon: Globe,
    title: "Shopify Store Setup",
    description: "Custom Shopify stores designed for conversion with multi-market capabilities.",
    features: [
      "Custom theme development",
      "Product migration & catalogue setup",
      "Payment gateway integration",
      "SEO & speed optimization",
      "Multi-language & currency support",
      "App integration & automation",
    ],
  },
  {
    id: "research",
    slug: "/services/product-research",
    icon: BarChart3,
    title: "Product Research",
    description: "Data-driven product research to find profitable opportunities across all marketplaces.",
    features: [
      "Market trend analysis",
      "Competitor research & gap analysis",
      "Profit margin calculations",
      "Supplier sourcing guidance",
      "Seasonal demand forecasting",
      "Niche viability assessment",
    ],
  },
  {
    id: "compliance",
    slug: "/services/compliance",
    icon: Shield,
    title: "Compliance & Account Health",
    description: "Protect your seller accounts with proactive compliance and health monitoring.",
    features: [
      "Policy compliance audits",
      "Account suspension prevention",
      "Appeal & reinstatement support",
      "IP & brand protection",
      "Regulatory compliance (UK/EU/US/AU)",
      "Performance metric optimization",
    ],
  },
  {
    id: "3pl",
    slug: "/services/3pl",
    icon: Warehouse,
    title: "UK & USA 3PL Consulting",
    description: "Expert guidance on third-party logistics solutions for UK & USA-based e-commerce fulfilment.",
    features: [
      "3PL provider selection & onboarding",
      "Warehouse network optimization",
      "Shipping rate negotiation",
      "Returns logistics setup",
      "International fulfilment strategy",
      "Cost reduction analysis",
    ],
  },
  {
    id: "sourcing-freight",
    slug: "/services/sourcing-freight",
    icon: Truck,
    title: "Product Sourcing & Freight",
    description: "Source verified suppliers from Pakistan and China, and ship worldwide with full logistics support.",
    features: [
      "Pakistan & China supplier sourcing",
      "Supplier verification & QC",
      "Price negotiation & sampling",
      "Air, sea & express freight options",
      "Customs documentation support",
      "Door-to-door delivery (DDP/DDU)",
    ],
  },
];

export default function Services() {
  return (
    <div className="flex flex-col">
      <SEO
        title="Our Services - E-Commerce Management"
        description="Comprehensive e-commerce services including eBay, TikTok Shop, Amazon, and Shopify management. Product research, compliance support, and UK & USA 3PL consulting."
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Badge variant="secondary" className="mb-3">
            What We Do
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="mt-4 text-white/80 max-w-xl text-base sm:text-lg leading-relaxed">
            Comprehensive e-commerce solutions designed to help you sell more, stay compliant, and grow across global marketplaces.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, idx) => (
              <Card
                key={service.id}
                className="overflow-visible p-6 sm:p-8"
                data-testid={`card-service-detail-${service.id}`}
              >
                <div className={`flex flex-col lg:flex-row gap-6 lg:gap-10 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link href={service.slug}>
                      <Button data-testid={`button-learn-more-${service.id}`}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      What's Included
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{feature}</span>
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

      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            Not Sure Which Service You Need?
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-lg mx-auto">
            Get in touch and our team will assess your business needs and recommend the best solution.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" data-testid="button-services-cta-contact">
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
