import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import {
  Mail,
  MessageCircle,
  MapPin,
  Globe,
  Clock,
  Send,
  CheckCircle,
  Loader2,
  Calendar,
} from "lucide-react";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { useState } from "react";

const serviceOptions = [
  "eBay Account Management",
  "TikTok Shop Management",
  "Amazon Seller Support",
  "Shopify Store Setup",
  "Product Research",
  "Compliance & Account Health",
  "UK & USA 3PL Consulting",
  "Product Sourcing & Freight",
  "Multiple Services",
  "Other",
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "info@etycons.com",
    sub: "We respond within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "+92 336 7997447",
    sub: "Quick responses during business hours",
    href: "https://wa.me/923367997447",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "United Kingdom",
    sub: "Serving UK, USA, EU & Australia",
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon - Fri: 9am - 6pm GMT",
    sub: "Flexible scheduling available",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent",
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

  function onSubmit(data: InsertContact) {
    mutation.mutate(data);
  }

  return (
    <div className="flex flex-col">
      <SEO
        title="Contact Us - Get a Free Consultation"
        description="Contact Etycons for expert e-commerce management services. Book a free consultation for eBay, TikTok Shop, Amazon, and Shopify support. WhatsApp and email available."
      />
      <section className="bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Badge variant="outline" className="mb-3">Contact Us</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Let's <span className="text-primary">Talk</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl text-base sm:text-lg leading-relaxed">
            Whether you're ready to get started or just exploring options, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              {submitted ? (
                <Card className="p-8 sm:p-10 text-center" data-testid="card-success">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Your message has been received. Our team will review your enquiry and get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} data-testid="button-send-another">
                    Send Another Message
                  </Button>
                </Card>
              ) : (
                <Card className="p-6 sm:p-8" data-testid="card-contact-form">
                  <h2 className="text-xl font-bold mb-1">Send Us a Message</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill in the form below and we'll be in touch shortly.
                  </p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Smith" {...field} data-testid="input-name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+44 7000 000000" {...field} value={field.value || ""} data-testid="input-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Business Ltd" {...field} value={field.value || ""} data-testid="input-company" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service of Interest</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceOptions.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your business and what you need help with..."
                                className="resize-none"
                                rows={5}
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto"
                        disabled={mutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {mutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-1.5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </Card>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map((info) => (
                <Card key={info.title} className="p-5" data-testid={`card-contact-${info.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{info.title}</h3>
                        <p className="text-sm mt-0.5">{info.detail}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{info.sub}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{info.title}</h3>
                        <p className="text-sm mt-0.5">{info.detail}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{info.sub}</p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}

              <Card className="p-5 bg-card border-primary/20" data-testid="card-calendly-cta">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Book a Free Consultation</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Schedule a 30-minute call at a time that suits you.
                    </p>
                    <a
                      href="https://calendly.com/imaliakbar512/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="mt-3"
                        data-testid="button-calendly-contact"
                      >
                        <Calendar className="w-4 h-4 mr-1.5" />
                        Book Meeting
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-primary text-primary-foreground" data-testid="card-whatsapp-cta">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Prefer WhatsApp?</h3>
                    <p className="text-sm text-primary-foreground/80 mt-0.5">
                      Chat with us directly for quick responses.
                    </p>
                    <a
                      href="https://wa.me/923367997447"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mt-3"
                        data-testid="button-whatsapp-contact"
                      >
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
    </div>
  );
}
