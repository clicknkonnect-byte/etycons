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
  Star,
  Users,
  BarChart3,
  Zap,
  Package,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { SEO } from "@/components/seo";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    icon: ShoppingBag,
    title: "eBay Account Management",
    slug: "/services/ebay",
    description: "Full-service eBay store management including listing optimization, pricing strategy, and customer service excellence.",
  },
  {
    icon: TrendingUp,
    title: "TikTok Shop Management",
    slug: "/services/tiktok",
    description: "Launch and scale your TikTok Shop with expert content strategy, product listing, and performance marketing.",
  },
  {
    icon: Package,
    title: "Amazon Seller Support",
    slug: "/services/amazon",
    description: "Navigate Amazon's marketplace with optimized listings, PPC management, and brand registry support.",
  },
  {
    icon: Globe,
    title: "Shopify Store Setup",
    slug: "/services/shopify",
    description: "Custom Shopify store design and development with conversion-focused themes and payment integrations.",
  },
  {
    icon: BarChart3,
    title: "Product Research",
    slug: "/services/product-research",
    description: "Data-driven product research to identify profitable niches and winning products across all marketplaces.",
  },
  {
    icon: Shield,
    title: "Compliance & Health",
    slug: "/services/compliance",
    description: "Protect your seller accounts with proactive compliance monitoring and account health management.",
  },
];

const stats = [
  { value: "500+", label: "Sellers Supported" },
  { value: "4", label: "Marketplaces" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "Support Available" },
];

const markets = [
  { icon: MapPin, name: "United Kingdom", detail: "Our home market" },
  { icon: Globe, name: "United States", detail: "Expanding reach" },
  { icon: Globe, name: "Europe", detail: "Cross-border growth" },
  { icon: MapPin, name: "Australia", detail: "Asia-Pacific access" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <SEO
        title="E-Commerce & Digital Operations Agency"
        description="Etycons helps e-commerce sellers scale on eBay, TikTok Shop, Amazon, and Shopify across UK, USA, Europe & Australia. Expert account management, product research, and compliance support."
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Trusted E-Commerce Partner
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            >
              Scale Your{" "}
              <span className="text-primary">E-Commerce</span>{" "}
              Business Globally
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl"
            >
              Expert account management and digital operations for eBay, TikTok Shop, Amazon, and Shopify sellers across the UK, USA, Europe, and Australia.
            </motion.p>
            <motion.div variants={fadeIn} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
                <Button size="lg" data-testid="button-hero-book-consultation">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="backdrop-blur-md bg-white/10 text-white border-white/30"
                  data-testid="button-hero-view-services"
                >
                  View Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">Our Services</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Everything You Need to{" "}
              <span className="text-primary">Succeed Online</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              From account setup to full-scale management, we handle the complexity so you can focus on growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <Link key={service.title} href={service.slug}>
                <Card
                  className="p-6 hover-elevate cursor-pointer group h-full"
                  data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" data-testid="button-view-all-services">
                View All Services
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">Global Reach</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Serving Sellers{" "}
              <span className="text-primary">Worldwide</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our team supports e-commerce businesses across key international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {markets.map((market) => (
              <Card
                key={market.name}
                className="p-6 text-center hover-elevate"
                data-testid={`card-market-${market.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-11 h-11 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <market.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold">{market.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{market.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-3">Why Etycons</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Why Sellers{" "}
              <span className="text-primary">Choose Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Dedicated Account Managers", desc: "Every client gets a dedicated specialist who understands your business inside out." },
              { icon: Star, title: "Proven Track Record", desc: "We've helped hundreds of sellers increase revenue and streamline operations." },
              { icon: Shield, title: "Compliance First", desc: "Proactive account health monitoring to keep your business safe and running." },
              { icon: Globe, title: "Multi-Market Expertise", desc: "Deep knowledge of UK, US, EU, and Australian marketplace regulations and trends." },
            ].map((item) => (
              <Card key={item.title} className="p-6 flex gap-4" data-testid={`card-why-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground">
            Ready to Scale Your E-Commerce Business?
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">
            Get in touch with our team today and discover how Etycons can help you grow across global marketplaces.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                data-testid="button-cta-contact"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <a
              href="https://wa.me/923367997447"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/10 text-primary-foreground border-white/30"
                data-testid="button-cta-whatsapp"
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
