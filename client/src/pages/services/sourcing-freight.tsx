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
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  Globe,
  Search,
  ShieldCheck,
  Handshake,
  Truck,
  Plane,
  Ship,
  Zap,
  FileCheck,
  Package,
  Send,
  Loader2,
  Layers,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@assets/sourcing-hero.png";
import inspectionImg from "@assets/sourcing-inspection.png";
import seaFreightImg from "@assets/sourcing-seafreight.png";

const sourcingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone/WhatsApp number"),
  company: z.string().optional(),
  sourcingCountry: z.string().min(1, "Please select a sourcing country"),
  productDescription: z.string().min(2, "Please describe the product"),
  targetPrice: z.string().optional(),
  estimatedQuantity: z.string().min(1, "Please enter estimated quantity"),
  qualityStandards: z.string().optional(),
  destinationCountry: z.string().min(1, "Please select a destination"),
  timeline: z.string().optional(),
  notes: z.string().optional(),
});

type SourcingFormData = z.infer<typeof sourcingSchema>;

function SourcingForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SourcingFormData>({
    resolver: zodResolver(sourcingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      sourcingCountry: "",
      productDescription: "",
      targetPrice: "",
      estimatedQuantity: "",
      qualityStandards: "",
      destinationCountry: "",
      timeline: "",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SourcingFormData) => {
      const message = [
        `--- Sourcing Requirements ---`,
        `Product: ${data.productDescription}`,
        `Sourcing From: ${data.sourcingCountry}`,
        `Destination: ${data.destinationCountry}`,
        `Estimated Quantity: ${data.estimatedQuantity}`,
        data.targetPrice ? `Target Price per Unit: ${data.targetPrice}` : null,
        data.qualityStandards ? `Quality Standards / Certifications: ${data.qualityStandards}` : null,
        data.timeline ? `Required Timeline: ${data.timeline}` : null,
        data.notes ? `\nNotes: ${data.notes}` : null,
      ].filter(Boolean).join("\n");

      const res = await apiRequest("POST", "/api/contact", {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company || "",
        service: "Product Sourcing Quote",
        message,
      });
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Sourcing Request Submitted",
        description: "We'll get back to you within 24 hours.",
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
      <Card className="p-8 text-center overflow-visible" data-testid="card-sourcing-success">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Sourcing Request Received!</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Our sourcing team will review your requirements and get back to you within 24 hours.
        </p>
        <Button onClick={() => setSubmitted(false)} data-testid="button-submit-another-sourcing">
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 overflow-visible" data-testid="card-sourcing-form">
      <h2 className="text-xl font-bold mb-1">Sourcing Quotation</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Tell us what product you need sourced. We'll find the best suppliers for you.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl><Input placeholder="John Smith" {...field} data-testid="input-sourcing-name" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl><Input type="email" placeholder="john@example.com" {...field} data-testid="input-sourcing-email" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp / Phone *</FormLabel>
                <FormControl><Input placeholder="+44 7000 000000" {...field} data-testid="input-sourcing-phone" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl><Input placeholder="Your Business Ltd" {...field} value={field.value || ""} data-testid="input-sourcing-company" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <hr className="border-border" />

          <FormField control={form.control} name="productDescription" render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description *</FormLabel>
              <FormControl><Textarea placeholder="Describe the product you need sourced — type, material, size, colour, any specifications..." className="resize-none" rows={3} {...field} data-testid="input-sourcing-product" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField control={form.control} name="sourcingCountry" render={({ field }) => (
              <FormItem>
                <FormLabel>Sourcing From *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-sourcing-country-src"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="destinationCountry" render={({ field }) => (
              <FormItem>
                <FormLabel>Deliver To *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger data-testid="select-destination-src"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="UAE">UAE</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="estimatedQuantity" render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Quantity *</FormLabel>
                <FormControl><Input placeholder="e.g. 500 units" {...field} data-testid="input-sourcing-qty" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField control={form.control} name="targetPrice" render={({ field }) => (
              <FormItem>
                <FormLabel>Target Price / Unit</FormLabel>
                <FormControl><Input placeholder="e.g. $2.50" {...field} value={field.value || ""} data-testid="input-sourcing-price" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="qualityStandards" render={({ field }) => (
              <FormItem>
                <FormLabel>Quality / Certifications</FormLabel>
                <FormControl><Input placeholder="e.g. CE, FDA, ISO..." {...field} value={field.value || ""} data-testid="input-sourcing-quality" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="timeline" render={({ field }) => (
              <FormItem>
                <FormLabel>Required Timeline</FormLabel>
                <FormControl><Input placeholder="e.g. 4 weeks" {...field} value={field.value || ""} data-testid="input-sourcing-timeline" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem>
              <FormLabel>Notes / Product Link / Images</FormLabel>
              <FormControl>
                <Textarea placeholder="Product links, image URLs, reference samples, special requirements..." className="resize-none" rows={3} {...field} value={field.value || ""} data-testid="input-sourcing-notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={mutation.isPending} data-testid="button-submit-sourcing">
            {mutation.isPending ? (
              <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Submitting...</>
            ) : (
              <><Send className="w-4 h-4 mr-1.5" />Submit Sourcing Request</>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

const quoteSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone/WhatsApp number"),
  company: z.string().optional(),
  productDescription: z.string().min(2, "Please describe the product"),
  hsCode: z.string().optional(),
  goodsValue: z.string().optional(),
  material: z.string().optional(),
  totalWeight: z.string().min(1, "Please enter total weight"),
  cbm: z.string().optional(),
  noOfCartons: z.string().optional(),
  weightPerCarton: z.string().optional(),
  cartonSize: z.string().optional(),
  pickupAddress: z.string().min(2, "Please enter pickup address"),
  dropOffAddress: z.string().min(2, "Please enter drop off address"),
  pickupDate: z.string().optional(),
  shippingMethod: z.string().min(1, "Please select a shipping method"),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

function QuoteForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      productDescription: "",
      hsCode: "",
      goodsValue: "",
      material: "",
      totalWeight: "",
      cbm: "",
      noOfCartons: "",
      weightPerCarton: "",
      cartonSize: "",
      pickupAddress: "",
      dropOffAddress: "",
      pickupDate: "",
      shippingMethod: "",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const message = [
        `--- Packing Details ---`,
        `Product Description: ${data.productDescription}`,
        data.hsCode ? `H.S. Code: ${data.hsCode}` : null,
        data.goodsValue ? `Value of Goods ($): ${data.goodsValue}` : null,
        data.material ? `Material: ${data.material}` : null,
        `Total Weight (Kgs): ${data.totalWeight}`,
        data.cbm ? `CBM: ${data.cbm}` : null,
        data.noOfCartons ? `No. of Cartons: ${data.noOfCartons}` : null,
        data.weightPerCarton ? `Weight per Carton (Kgs): ${data.weightPerCarton}` : null,
        data.cartonSize ? `Carton Size (CM): ${data.cartonSize}` : null,
        ``,
        `--- Shipping Details ---`,
        `Pickup Address: ${data.pickupAddress}`,
        `Drop Off Address: ${data.dropOffAddress}`,
        data.pickupDate ? `Inventory Pickup Date: ${data.pickupDate}` : null,
        `Preferred Shipping: ${data.shippingMethod}`,
        data.notes ? `\nNotes: ${data.notes}` : null,
      ].filter(Boolean).join("\n");

      const res = await apiRequest("POST", "/api/contact", {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company || "",
        service: "Freight Quote Request",
        message,
      });
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you within 24 hours.",
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
      <Card className="p-8 text-center overflow-visible" data-testid="card-quote-success">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quote Request Received!</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Our team will review your requirements and send you a quote within 24 hours.
        </p>
        <Button onClick={() => setSubmitted(false)} data-testid="button-submit-another-quote">
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 overflow-visible" data-testid="card-quote-form">
      <h2 className="text-xl font-bold mb-1">Freight Quote Request</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Fill in the form below so we can provide you with our best offer.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contact Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl><Input placeholder="John Smith" {...field} data-testid="input-quote-name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl><Input type="email" placeholder="john@example.com" {...field} data-testid="input-quote-email" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp / Phone *</FormLabel>
                  <FormControl><Input placeholder="+44 7000 000000" {...field} data-testid="input-quote-phone" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl><Input placeholder="Your Business Ltd" {...field} value={field.value || ""} data-testid="input-quote-company" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <hr className="border-border" />

          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Packing Details</p>
            <div className="space-y-4">
              <FormField control={form.control} name="productDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description *</FormLabel>
                  <FormControl><Input placeholder="e.g. Cotton T-shirts, LED lights..." {...field} data-testid="input-quote-product" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField control={form.control} name="hsCode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>H.S. Code</FormLabel>
                    <FormControl><Input placeholder="e.g. 6109.10" {...field} value={field.value || ""} data-testid="input-quote-hscode" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="goodsValue" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value of Goods ($)</FormLabel>
                    <FormControl><Input placeholder="e.g. 5000" {...field} value={field.value || ""} data-testid="input-quote-value" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="material" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <FormControl><Input placeholder="e.g. Cotton, Plastic..." {...field} value={field.value || ""} data-testid="input-quote-material" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="totalWeight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Weight (Kgs) *</FormLabel>
                    <FormControl><Input placeholder="e.g. 500" {...field} data-testid="input-quote-weight" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cbm" render={({ field }) => (
                  <FormItem>
                    <FormLabel>CBM (Cubic Metres)</FormLabel>
                    <FormControl><Input placeholder="e.g. 2.5" {...field} value={field.value || ""} data-testid="input-quote-cbm" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField control={form.control} name="noOfCartons" render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. of Cartons</FormLabel>
                    <FormControl><Input placeholder="e.g. 50" {...field} value={field.value || ""} data-testid="input-quote-cartons" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="weightPerCarton" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight / Carton (Kgs)</FormLabel>
                    <FormControl><Input placeholder="e.g. 10" {...field} value={field.value || ""} data-testid="input-quote-carton-weight" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cartonSize" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carton Size (CM)</FormLabel>
                    <FormControl><Input placeholder="e.g. 60x40x30" {...field} value={field.value || ""} data-testid="input-quote-carton-size" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
          </div>

          <hr className="border-border" />

          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Shipping Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="pickupAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address *</FormLabel>
                  <FormControl><Input placeholder="Factory/warehouse address" {...field} data-testid="input-quote-pickup" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dropOffAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop Off Address *</FormLabel>
                  <FormControl><Input placeholder="Delivery address" {...field} data-testid="input-quote-dropoff" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField control={form.control} name="pickupDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Inventory Pickup Date</FormLabel>
                  <FormControl><Input type="date" {...field} value={field.value || ""} data-testid="input-quote-date" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="shippingMethod" render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Method *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger data-testid="select-shipping-method"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Air Freight">Air Freight</SelectItem>
                      <SelectItem value="Sea Freight">Sea Freight</SelectItem>
                      <SelectItem value="Express/Courier">Express / Courier</SelectItem>
                      <SelectItem value="Not Sure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <FormField control={form.control} name="notes" render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes / Product Link</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional details, product images link, special requirements..." className="resize-none" rows={3} {...field} value={field.value || ""} data-testid="input-quote-notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={mutation.isPending} data-testid="button-submit-quote">
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

export default function SourcingFreightService() {
  const [quoteTab, setQuoteTab] = useState<"sourcing" | "freight">("sourcing");
  return (
    <div className="flex flex-col">
      <SEO
        title="Product Sourcing & Freight from Pakistan & China | E-TYCONS"
        description="Source verified suppliers from Pakistan and China. Air, sea, and express freight to UK, USA, Europe, Australia, UAE and worldwide."
      />

      <section className="relative border-b overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="International shipping port" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60 dark:from-background/98 dark:via-background/90 dark:to-background/70" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative">
          <Link href="/services">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground" data-testid="button-back-services">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              All Services
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="outline">Sourcing & Logistics</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" data-testid="text-page-title">
            Sourcing & Freight Solutions from China & Pakistan
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
            We source verified suppliers and ship to UK, USA, Europe, Australia, UAE — and anywhere worldwide.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#quote-form">
              <Button size="lg" data-testid="button-request-quote-hero">
                Request a Quote
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </a>
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" data-testid="button-book-call-hero">
                Book a Call
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-3">What We Offer</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Product Sourcing", desc: "Find verified suppliers from Pakistan and China for your products. We shortlist, compare, and recommend the best options." },
              { icon: ShieldCheck, title: "Supplier Verification & QC", desc: "We verify suppliers and conduct quality checks before shipment to make sure you get what you ordered." },
              { icon: Handshake, title: "Price Negotiation & Sampling", desc: "We negotiate the best prices and manage the sampling process so you can approve before placing bulk orders." },
              { icon: Truck, title: "Freight: Air, Sea & Express", desc: "Air freight for speed, sea freight for value, or express courier for small orders. We find the best option for you." },
              { icon: FileCheck, title: "Customs & Documentation", desc: "All paperwork handled — commercial invoices, packing lists, certificates of origin, and customs declarations." },
              { icon: Layers, title: "Consolidation", desc: "We consolidate orders from multiple suppliers into one shipment — reducing freight costs, simplifying customs, and speeding up delivery." },
              { icon: Package, title: "Door-to-Door Delivery", desc: "DDP (duties included) or DDU (you clear customs). Full tracking from origin to your door." },
            ].map((s) => (
              <Card key={s.title} className="p-6 overflow-visible" data-testid={`card-service-${s.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <s.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-3">Step by Step</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Share Requirements", desc: "Tell us what you need — product type, quantity, quality standards, and budget." },
              { step: "02", title: "Supplier Shortlisting", desc: "We find 3-5 verified suppliers and send you a comparison with pricing." },
              { step: "03", title: "Sampling & Negotiation", desc: "We arrange samples and negotiate the best terms on your behalf." },
              { step: "04", title: "Quality Checks", desc: "Pre-shipment inspection to make sure products meet your specifications." },
              { step: "05", title: "Freight & Documentation", desc: "We book freight, prepare customs paperwork, and arrange insurance." },
              { step: "06", title: "Delivery & Tracking", desc: "Your shipment is dispatched with full tracking until it arrives." },
            ].map((s) => (
              <div key={s.step}>
                <div className="text-4xl font-bold text-primary/15 mb-2">{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl overflow-hidden border shadow-sm">
            <img src={inspectionImg} alt="Product quality inspection" className="w-full h-48 sm:h-64 object-cover" data-testid="img-inspection" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Badge variant="outline" className="mb-3">Shipping Options</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Freight Methods</h2>
              <div className="space-y-4">
                {[
                  { icon: Plane, title: "Air Freight", time: "3-8 days", desc: "Best for urgent or lightweight shipments" },
                  { icon: Ship, title: "Sea Freight", time: "15-40 days", desc: "Most cost-effective for large/heavy cargo" },
                  { icon: Zap, title: "Express Courier", time: "3-5 days", desc: "Door-to-door for small parcels and samples" },
                ].map((m) => (
                  <Card key={m.title} className="p-4 overflow-visible" data-testid={`card-freight-${m.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="flex items-start gap-3">
                      <m.icon className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{m.title}</h3>
                          <Badge variant="secondary" className="text-xs">{m.time}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Badge variant="outline" className="mb-3">Global Reach</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Where We Ship</h2>
              <div className="grid grid-cols-2 gap-3">
                {["United Kingdom", "United States", "Europe", "Australia", "UAE", "Worldwide"].map((dest) => (
                  <Card key={dest} className="p-4 text-center overflow-visible" data-testid={`card-destination-${dest.toLowerCase().replace(/\s+/g, "-")}`}>
                    <span className="font-medium text-sm">{dest}</span>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Timelines and costs depend on weight, volume, route, and incoterms (DDP/DDU).
              </p>
              <div className="mt-6 rounded-xl overflow-hidden border shadow-sm">
                <img src={seaFreightImg} alt="Cargo ship with shipping containers" className="w-full h-44 object-cover" data-testid="img-seafreight" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-card" id="quote-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3">Get a Quote</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Request a Quotation</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Choose the type of quote you need below.
            </p>
            <div className="inline-flex rounded-lg border bg-muted p-1 gap-1">
              <Button
                variant={quoteTab === "sourcing" ? "default" : "ghost"}
                size="sm"
                onClick={() => setQuoteTab("sourcing")}
                data-testid="tab-sourcing"
              >
                <Search className="w-4 h-4 mr-1.5" />
                Sourcing Quotation
              </Button>
              <Button
                variant={quoteTab === "freight" ? "default" : "ghost"}
                size="sm"
                onClick={() => setQuoteTab("freight")}
                data-testid="tab-freight"
              >
                <Truck className="w-4 h-4 mr-1.5" />
                Freight Quotation
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              {quoteTab === "sourcing" ? <SourcingForm /> : <QuoteForm />}
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-5 overflow-visible" data-testid="card-why-us">
                <h3 className="font-semibold mb-3">Why Work With Us</h3>
                <ul className="space-y-2">
                  {[
                    "Established supplier networks in Pakistan & China",
                    "Transparent pricing — no hidden fees",
                    "Fast communication and regular updates",
                    "Quality checks before every shipment",
                    "All customs documentation handled",
                    "No minimum order for freight bookings",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-5 bg-primary text-primary-foreground overflow-visible" data-testid="card-whatsapp-quote">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Prefer WhatsApp?</h3>
                    <p className="text-sm text-primary-foreground/80 mt-0.5">
                      Send us your product details for a quick quote.
                    </p>
                    <a href="https://wa.me/923367997447" target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" size="sm" className="mt-3" data-testid="button-whatsapp-quote">
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

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-3">FAQ</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {[
              { q: "Can you source from both Pakistan and China?", a: "Yes. Pakistan is strong for textiles, leather, surgical instruments, and sports goods. China covers electronics, homeware, packaging, and more. We source from one or both." },
              { q: "Do you verify suppliers?", a: "Every supplier goes through our checks — business licences, factory capability, production capacity, and export history." },
              { q: "Do you handle samples?", a: "Yes. We arrange samples, ship them to you for approval, and handle any modifications before bulk production." },
              { q: "What freight method is cheapest?", a: "Sea freight for large/heavy shipments. For small orders under 100 kg, express courier can sometimes be cheaper. We always compare and recommend." },
              { q: "What documents are needed for shipping?", a: "Commercial invoice, packing list, certificate of origin, and bill of lading or airway bill. We prepare everything for you." },
              { q: "Can you do door-to-door delivery?", a: "Yes — DDP (we handle customs and duties) or DDU (you clear customs yourself). Both with full tracking." },
              { q: "Do you ship to UAE, Europe, and Australia?", a: "Yes, all of these plus UK, USA, and worldwide. UAE is one of our fastest routes at 3-5 days by air." },
              { q: "What affects the shipping cost?", a: "Weight, volume, route, incoterms (DDP/DDU), customs duties, and the type of goods. We provide detailed breakdowns." },
            ].map((item) => (
              <Card key={item.q} className="p-6 overflow-visible">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            Ready to Source & Ship?
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-lg mx-auto">
            Get a free quote — no obligation, no hidden fees.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#quote-form">
              <Button size="lg" variant="secondary" data-testid="button-request-quote-bottom">
                Request a Quote
              </Button>
            </a>
            <a href="https://wa.me/923367997447" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="backdrop-blur-md bg-white/10 text-primary-foreground border-white/30" data-testid="button-whatsapp-bottom">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-4 bg-muted/50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground text-center">
            We provide logistics coordination and documentation support. Customs duties/taxes depend on destination country rules unless agreed under DDP.
          </p>
        </div>
      </section>
    </div>
  );
}
