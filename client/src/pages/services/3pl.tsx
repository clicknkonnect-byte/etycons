import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SEO } from "@/components/seo";
import { motion } from "framer-motion";
import {
  Warehouse,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  Package,
  Truck,
  Globe,
  BarChart3,
  ShieldCheck,
  Clock,
  Box,
  MapPin,
  Zap,
  RefreshCw,
  HeadphonesIcon,
  Settings,
  TrendingUp,
  Users,
  Star,
  PackageCheck,
  LayoutGrid,
  Send,
  Loader2,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@assets/3pl-hero.png";
import packingImg from "@assets/3pl-packing.png";
import shippingImg from "@assets/3pl-shipping.png";
import dashboardImg from "@assets/3pl-dashboard.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const threeplSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone/WhatsApp number"),
  company: z.string().optional(),
  currentMonthlyOrders: z.string().min(1, "Please enter your monthly orders"),
  platforms: z.string().min(1, "Please select your platforms"),
  productType: z.string().min(2, "Please describe your products"),
  avgOrderWeight: z.string().optional(),
  storageNeeded: z.string().optional(),
  shippingDestinations: z.string().min(1, "Please select destinations"),
  currentSetup: z.string().optional(),
  notes: z.string().optional(),
});

type ThreePLFormData = z.infer<typeof threeplSchema>;

function ThreePLQuoteForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ThreePLFormData>({
    resolver: zodResolver(threeplSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      currentMonthlyOrders: "",
      platforms: "",
      productType: "",
      avgOrderWeight: "",
      storageNeeded: "",
      shippingDestinations: "",
      currentSetup: "",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ThreePLFormData) => {
      const message = [
        `--- 3PL Requirements ---`,
        `Monthly Orders: ${data.currentMonthlyOrders}`,
        `Sales Platforms: ${data.platforms}`,
        `Product Type: ${data.productType}`,
        data.avgOrderWeight ? `Avg Order Weight: ${data.avgOrderWeight}` : null,
        data.storageNeeded ? `Storage Needed: ${data.storageNeeded}` : null,
        `Shipping Destinations: ${data.shippingDestinations}`,
        data.currentSetup ? `Current Setup: ${data.currentSetup}` : null,
        data.notes ? `\nNotes: ${data.notes}` : null,
      ].filter(Boolean).join("\n");

      const res = await apiRequest("POST", "/api/contact", {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company || "",
        service: "3PL Fulfilment Quote",
        message,
      });
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Quote Request Submitted",
        description: "We'll review your requirements and get back to you within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    },
  });

  if (submitted) {
    return (
      <Card className="p-8 text-center overflow-visible" data-testid="card-3pl-quote-success">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quote Request Received!</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Our fulfilment team will review your requirements and send you a personalised quote within 24 hours.
        </p>
        <Button onClick={() => setSubmitted(false)} data-testid="button-submit-another-3pl">
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 overflow-visible" data-testid="card-3pl-quote-form">
      <h2 className="text-xl font-bold mb-1">3PL Quotation Request</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Tell us about your business and fulfilment needs. We'll send you a personalised quote.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl><Input placeholder="John Smith" {...field} data-testid="input-3pl-name" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl><Input type="email" placeholder="john@example.com" {...field} data-testid="input-3pl-email" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp / Phone *</FormLabel>
                <FormControl><Input placeholder="+44 7000 000000" {...field} data-testid="input-3pl-phone" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl><Input placeholder="Your Business Ltd" {...field} value={field.value || ""} data-testid="input-3pl-company" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <hr className="border-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="currentMonthlyOrders" render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Orders *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-3pl-orders"><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Under 100">Under 100</SelectItem>
                    <SelectItem value="100-500">100 - 500</SelectItem>
                    <SelectItem value="500-2000">500 - 2,000</SelectItem>
                    <SelectItem value="2000-5000">2,000 - 5,000</SelectItem>
                    <SelectItem value="5000+">5,000+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="platforms" render={({ field }) => (
              <FormItem>
                <FormLabel>Sales Platforms *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-3pl-platforms"><SelectValue placeholder="Select platforms" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="eBay">eBay</SelectItem>
                    <SelectItem value="Amazon">Amazon</SelectItem>
                    <SelectItem value="Shopify">Shopify</SelectItem>
                    <SelectItem value="TikTok Shop">TikTok Shop</SelectItem>
                    <SelectItem value="Multiple Channels">Multiple Channels</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="productType" render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type / Category *</FormLabel>
              <FormControl><Input placeholder="e.g. Clothing, Electronics, Homeware..." {...field} data-testid="input-3pl-product" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField control={form.control} name="avgOrderWeight" render={({ field }) => (
              <FormItem>
                <FormLabel>Avg Order Weight</FormLabel>
                <FormControl><Input placeholder="e.g. 0.5 kg" {...field} value={field.value || ""} data-testid="input-3pl-weight" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="storageNeeded" render={({ field }) => (
              <FormItem>
                <FormLabel>Storage Needed</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl><SelectTrigger data-testid="select-3pl-storage"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="1-5 pallets">1-5 pallets</SelectItem>
                    <SelectItem value="5-20 pallets">5-20 pallets</SelectItem>
                    <SelectItem value="20-50 pallets">20-50 pallets</SelectItem>
                    <SelectItem value="50+ pallets">50+ pallets</SelectItem>
                    <SelectItem value="Not sure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="shippingDestinations" render={({ field }) => (
              <FormItem>
                <FormLabel>Ship To *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-3pl-destinations"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="UK Only">UK Only</SelectItem>
                    <SelectItem value="UK & Europe">UK & Europe</SelectItem>
                    <SelectItem value="UK & USA">UK & USA</SelectItem>
                    <SelectItem value="Worldwide">Worldwide</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="currentSetup" render={({ field }) => (
            <FormItem>
              <FormLabel>Current Fulfilment Setup</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl><SelectTrigger data-testid="select-3pl-current"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="Self-fulfilling from home">Self-fulfilling from home</SelectItem>
                  <SelectItem value="Small warehouse/unit">Small warehouse / unit</SelectItem>
                  <SelectItem value="Using another 3PL">Using another 3PL</SelectItem>
                  <SelectItem value="Amazon FBA">Amazon FBA</SelectItem>
                  <SelectItem value="Not started yet">Not started yet</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requirements, packaging needs, or questions..." className="resize-none" rows={3} {...field} value={field.value || ""} data-testid="input-3pl-notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={mutation.isPending} data-testid="button-submit-3pl-quote">
            {mutation.isPending ? (
              <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Submitting...</>
            ) : (
              <><Send className="w-4 h-4 mr-1.5" />Submit Quote Request</>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default function ThreePLService() {
  return (
    <div className="flex flex-col">
      <SEO
        title="UK & USA 3PL & Fulfilment Services - E-Commerce Logistics Solutions | E-TYCONS"
        description="End-to-end 3PL and fulfilment services for UK & USA e-commerce sellers. Warehousing, pick & pack, shipping, returns management, and multi-channel fulfilment for eBay, Amazon, TikTok Shop & Shopify."
      />

      <section className="relative border-b overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="3PL Warehouse" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60 dark:from-background/98 dark:via-background/90 dark:to-background/70" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 relative">
          <Link href="/services">
            <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground" data-testid="button-back-services">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              All Services
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Warehouse className="w-7 h-7 text-primary" />
            </div>
            <div>
              <Badge variant="outline" className="mb-1">Fulfilment & Logistics</Badge>
              <p className="text-sm text-muted-foreground">Trusted by 50+ UK & USA e-commerce brands</p>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight max-w-3xl" data-testid="text-service-title">
            UK & USA 3PL & E-Commerce{" "}
            <span className="text-primary">Fulfilment Services</span>
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
            From warehouse to doorstep — we handle your entire fulfilment operation so you can focus on selling. 
            Expert 3PL consulting, warehousing, pick & pack, shipping, and returns management across the UK, USA, Europe, and Australia.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#quote-form">
              <Button size="lg" data-testid="button-service-cta">
                Get a Free Fulfilment Quote
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <a href="https://wa.me/923367997447" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" data-testid="button-whatsapp-hero">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "50+", label: "Brands Served" },
              { value: "500K+", label: "Orders Fulfilled" },
              { value: "99.8%", label: "Accuracy Rate" },
              { value: "24hr", label: "Dispatch Time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-lg bg-background/60 backdrop-blur-sm border" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <Badge variant="outline" className="mb-3">About Our 3PL Service</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why E-Commerce Brands Choose Our 3PL</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    As your e-commerce business scales beyond 100+ orders per month, managing warehousing and fulfilment 
                    in-house becomes a bottleneck. Storage costs rise, shipping errors increase, and time spent packing orders 
                    takes away from growing your business.
                  </p>
                  <p>
                    Our UK & USA 3PL service solves this completely. We either connect you with the perfect fulfilment partner from 
                    our vetted network of warehouses in the UK and USA, or manage the entire fulfilment process end-to-end. From receiving 
                    your inventory to picking, packing, shipping, and handling returns — we take care of everything.
                  </p>
                  <p>
                    Whether you sell on eBay, Amazon, TikTok Shop, Shopify, or all of them, our multi-channel fulfilment 
                    integrations ensure every order from every platform is processed accurately and dispatched the same day.
                  </p>
                </div>
                <div className="mt-6 rounded-xl overflow-hidden border shadow-sm">
                  <img src={packingImg} alt="Order fulfilment and packing process" className="w-full h-48 sm:h-56 object-cover" data-testid="img-packing" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Package, title: "Pick & Pack", desc: "Accurate order picking and professional packaging" },
                  { icon: Truck, title: "Same-Day Dispatch", desc: "Orders placed by 2pm dispatched same day" },
                  { icon: Globe, title: "International Shipping", desc: "Ship to UK, US, EU & Australia" },
                  { icon: RefreshCw, title: "Returns Handling", desc: "Full returns processing and restocking" },
                ].map((item) => (
                  <Card key={item.title} className="p-4 overflow-visible" data-testid={`card-overview-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <item.icon className="w-6 h-6 text-primary mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">Complete Solutions</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Our 3PL & Fulfilment Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to outsource your e-commerce logistics, from storage to last-mile delivery.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Warehouse,
                title: "Warehousing & Storage",
                description: "Secure, climate-controlled warehouse space across strategic UK and USA locations. Flexible storage solutions from pallet racking to shelving, with real-time inventory visibility through our warehouse management system.",
                highlights: ["Secure facilities with CCTV", "Climate-controlled options", "Real-time stock levels", "Flexible storage terms"],
              },
              {
                icon: PackageCheck,
                title: "Pick, Pack & Dispatch",
                description: "Accurate and efficient order fulfilment with same-day dispatch for orders received by 2pm. Custom packaging options, branded inserts, and quality checks on every order.",
                highlights: ["99.8% accuracy rate", "Same-day dispatch", "Custom branded packaging", "Quality control checks"],
              },
              {
                icon: Truck,
                title: "Shipping & Delivery",
                description: "Competitive shipping rates negotiated with all major UK, USA and international carriers. Real-time tracking, multiple delivery speed options, and automated customer notifications.",
                highlights: ["Royal Mail, DPD, Hermes, DHL", "Next-day & economy options", "Real-time tracking", "Automated notifications"],
              },
              {
                icon: RefreshCw,
                title: "Returns Management",
                description: "Hassle-free returns processing that keeps your customers happy and gets products back into sellable stock quickly. Inspection, grading, restocking, and reporting included.",
                highlights: ["Pre-paid return labels", "Quality inspection", "Fast restocking", "Returns analytics"],
              },
              {
                icon: LayoutGrid,
                title: "Multi-Channel Fulfilment",
                description: "Seamless integration with eBay, Amazon FBM, TikTok Shop, Shopify, WooCommerce, and more. All orders from all channels processed from a single warehouse.",
                highlights: ["eBay & Amazon integration", "TikTok Shop fulfilment", "Shopify & WooCommerce", "Centralised inventory"],
              },
              {
                icon: Globe,
                title: "International Fulfilment",
                description: "Expand globally with our international shipping solutions. We handle customs documentation, duties calculation, and local carrier selection for US, EU, and Australian markets.",
                highlights: ["Customs documentation", "Duty & tax calculation", "Local carrier networks", "Cross-border compliance"],
              },
              {
                icon: BarChart3,
                title: "Inventory Management",
                description: "Real-time inventory tracking across all channels with automated reorder alerts, stock forecasting, and detailed reporting. Never oversell or run out of stock again.",
                highlights: ["Real-time stock sync", "Low stock alerts", "Demand forecasting", "Stock reports"],
              },
              {
                icon: Settings,
                title: "Kitting & Assembly",
                description: "Bundle products, create gift sets, or assemble multi-component items in our warehouse. Perfect for subscription boxes, promotional bundles, and product kits.",
                highlights: ["Product bundling", "Subscription box assembly", "Gift wrapping", "Custom inserts"],
              },
              {
                icon: ShieldCheck,
                title: "3PL Consulting",
                description: "Not sure if 3PL is right for you? Our logistics consultants will audit your current operations, calculate potential savings, and help you find the perfect fulfilment partner.",
                highlights: ["Free logistics audit", "Cost-benefit analysis", "Provider shortlisting", "Negotiation support"],
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                {...stagger}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6 h-full overflow-visible" data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg pt-1.5">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">How It Works</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Your Fulfilment Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From first contact to fully outsourced fulfilment — here's how we get you set up.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: HeadphonesIcon,
                title: "Free Consultation",
                description: "We discuss your products, order volumes, current challenges, and growth plans to understand exactly what you need from a 3PL partner.",
              },
              {
                step: "02",
                icon: BarChart3,
                title: "Logistics Audit & Quote",
                description: "We audit your current fulfilment costs and operations, then provide a detailed quote showing how much you'll save with our 3PL service.",
              },
              {
                step: "03",
                icon: Box,
                title: "Onboarding & Integration",
                description: "We receive your inventory, set up channel integrations, configure shipping rules, and run test orders to ensure everything works perfectly.",
              },
              {
                step: "04",
                icon: Zap,
                title: "Live Fulfilment & Growth",
                description: "Orders start flowing automatically. We pick, pack, and ship while you monitor everything in real-time. Regular reviews ensure we scale with you.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                {...stagger}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-bold text-primary/10 mb-3">{step.step}</div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-5 h-5 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">Platforms We Support</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Multi-Channel Fulfilment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We integrate with all major e-commerce platforms to fulfil orders from every sales channel in one place.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "eBay", desc: "UK, US, EU & AU" },
              { name: "Amazon FBM", desc: "Merchant Fulfilled" },
              { name: "TikTok Shop", desc: "UK & USA Fulfilment" },
              { name: "Shopify", desc: "Direct Integration" },
              { name: "WooCommerce", desc: "Plugin Support" },
              { name: "Etsy", desc: "Handmade & Vintage" },
            ].map((platform) => (
              <Card key={platform.name} className="p-4 text-center overflow-visible" data-testid={`card-platform-${platform.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <h3 className="font-semibold text-sm">{platform.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{platform.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">Shipping Partners</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Carrier Network</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We work with all major UK, USA and international carriers to get your products delivered quickly and cost-effectively.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 overflow-visible">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">UK & USA Carriers</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Royal Mail", "DPD", "Hermes/Evri", "DHL Parcel UK", "Yodel", "UPS", "USPS", "FedEx"].map((carrier) => (
                  <div key={carrier} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                    {carrier}
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 overflow-visible">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">International Carriers</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["DHL Express", "FedEx", "UPS International", "Royal Mail International", "DPD International", "TNT"].map((carrier) => (
                  <div key={carrier} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                    {carrier}
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="mt-8 rounded-xl overflow-hidden border shadow-sm">
            <img src={shippingImg} alt="Distribution center with delivery trucks" className="w-full h-48 sm:h-64 object-cover" data-testid="img-shipping" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <Badge variant="outline" className="mb-3">Why Choose Us</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Benefits of Our 3PL Service</h2>
                <ul className="space-y-4">
                  {[
                    { icon: TrendingUp, text: "Reduce fulfilment costs by 15-30% compared to in-house operations" },
                    { icon: Clock, text: "Same-day dispatch for orders placed before 2pm" },
                    { icon: Star, text: "99.8% order accuracy rate — fewer complaints, better reviews" },
                    { icon: Globe, text: "Ship internationally to EU & Australia from UK & USA warehouses" },
                    { icon: BarChart3, text: "Real-time inventory and order tracking dashboard" },
                    { icon: Users, text: "Dedicated account manager for personalised support" },
                    { icon: RefreshCw, text: "Hassle-free returns processing and restocking" },
                    { icon: Zap, text: "Scale from 100 to 10,000+ orders/month without hiring staff" },
                  ].map((benefit) => (
                    <li key={benefit.text} className="flex items-start gap-3">
                      <benefit.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Badge variant="outline" className="mb-3">Markets We Serve</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">Global Fulfilment</h2>
                <div className="space-y-4">
                  {[
                    { market: "United Kingdom", desc: "Next-day and 2-day delivery across England, Scotland, Wales & Northern Ireland" },
                    { market: "United States", desc: "Cost-effective transatlantic shipping with 5-7 day delivery to all 50 states" },
                    { market: "Europe", desc: "EU fulfilment covering Germany, France, Italy, Spain, Netherlands and more" },
                    { market: "Australia", desc: "International shipping to Australia with tracked delivery options" },
                  ].map((m) => (
                    <Card key={m.market} className="p-4 overflow-visible" data-testid={`card-market-${m.market.toLowerCase().replace(/\s+/g, "-")}`}>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-semibold">{m.market}</h3>
                          <p className="text-sm text-muted-foreground">{m.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 rounded-xl overflow-hidden border shadow-sm">
                  <img src={dashboardImg} alt="Warehouse management dashboard" className="w-full h-48 object-cover" data-testid="img-dashboard" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">Who We Help</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ideal For These Businesses</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our 3PL service is designed for e-commerce businesses at every stage of growth.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Growing Sellers",
                desc: "Doing 100-500 orders/month and running out of space at home or in a small unit. Ready to scale without the overhead.",
                volume: "100-500 orders/mo",
              },
              {
                title: "Multi-Channel Sellers",
                desc: "Selling on eBay, Amazon, TikTok Shop and your own website. Need all channels fulfilled from one location.",
                volume: "500-2,000 orders/mo",
              },
              {
                title: "Scaling Brands",
                desc: "Established brands processing high volumes. Need a reliable 3PL partner that can handle growth and peak periods.",
                volume: "2,000-10,000 orders/mo",
              },
              {
                title: "International Sellers",
                desc: "UK & USA-based sellers shipping globally. Need warehouses in both markets with international carrier relationships and customs expertise.",
                volume: "Any volume",
              },
            ].map((type) => (
              <Card key={type.title} className="p-6 overflow-visible" data-testid={`card-business-${type.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge variant="secondary" className="mb-3">{type.volume}</Badge>
                <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{type.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" id="quote-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3">Get a Quote</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Request a 3PL Quote</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Tell us about your business and we'll send you a personalised fulfilment quote.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <ThreePLQuoteForm />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-5 overflow-visible" data-testid="card-what-to-expect">
                <h3 className="font-semibold mb-3">What to Expect</h3>
                <ul className="space-y-2">
                  {[
                    "Personalised quote within 24 hours",
                    "No long-term contracts required",
                    "Transparent pricing — no hidden fees",
                    "Free warehouse tour available",
                    "Dedicated account manager",
                    "Trial period before full commitment",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5 bg-primary text-primary-foreground overflow-visible" data-testid="card-whatsapp-3pl">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Prefer WhatsApp?</h3>
                    <p className="text-sm text-primary-foreground/80 mt-0.5">
                      Chat with us directly for a quick quote.
                    </p>
                    <a href="https://wa.me/923367997447" target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="sm" className="mt-3" data-testid="button-whatsapp-3pl-quote">
                        Open WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn}>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">FAQ</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about our 3PL and fulfilment services.
              </p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                question: "What is a 3PL and how does it work?",
                answer: "A third-party logistics provider (3PL) handles your warehousing, order picking, packing, and shipping on your behalf. You send your stock to our warehouse, and when a customer places an order on any of your sales channels, we automatically pick, pack, and dispatch it — usually the same day.",
              },
              {
                question: "When should I consider using a 3PL?",
                answer: "If you're processing more than 100 orders per month, running out of space, spending too much time on packing, or struggling with shipping errors — it's time for a 3PL. We typically save sellers 15-30% on fulfilment costs while freeing up 20+ hours per week.",
              },
              {
                question: "How much does your 3PL service cost?",
                answer: "Pricing depends on your storage volume, order quantity, product size/weight, and shipping destinations. We offer competitive per-order rates with no long-term contracts. Book a free consultation and we'll provide a detailed quote based on your specific needs.",
              },
              {
                question: "Can you handle multi-channel orders?",
                answer: "Yes, we integrate with eBay, Amazon, TikTok Shop, Shopify, WooCommerce, Etsy, and more. All orders from all channels are processed from a single warehouse with centralised inventory management — no overselling.",
              },
              {
                question: "Do you offer branded packaging?",
                answer: "Absolutely. We can use your branded boxes, tissue paper, stickers, thank-you cards, and custom inserts. We also offer plain packaging if preferred. Branded unboxing experiences help build customer loyalty and encourage repeat purchases.",
              },
              {
                question: "How do you handle returns?",
                answer: "We process returns at our warehouse, inspect items, grade their condition, and restock sellable products. You get detailed returns reports showing reasons, frequencies, and product-level analytics to help reduce future returns.",
              },
              {
                question: "What happens during peak seasons?",
                answer: "We scale our operations to handle peak demand during Black Friday, Christmas, and other high-volume periods. We recommend sending additional stock 2-3 weeks before peak to ensure smooth fulfilment during the busiest times.",
              },
              {
                question: "Can I visit the warehouse?",
                answer: "Yes, we encourage warehouse visits so you can see exactly how your products are stored and orders are processed. We can arrange a tour as part of your onboarding process or at any time during our partnership.",
              },
            ].map((item) => (
              <Card key={item.question} className="p-6 overflow-visible" data-testid={`card-faq-${item.question.toLowerCase().slice(0, 20).replace(/\s+/g, "-")}`}>
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
            Ready to Outsource Your Fulfilment?
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-lg mx-auto">
            Book a free consultation and get a personalised 3PL quote. No obligation, no long-term contracts — just expert logistics advice.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" data-testid="button-service-bottom-cta">
                Get Your Free Quote
              </Button>
            </a>
            <a href="https://wa.me/923367997447" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/10 text-primary-foreground border-white/30"
                data-testid="button-whatsapp-bottom"
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
