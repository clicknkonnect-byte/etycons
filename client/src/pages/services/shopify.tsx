import { Globe } from "lucide-react";
import { ServiceDetailPage, type ServicePageData } from "@/pages/service-detail";

const data: ServicePageData = {
  slug: "shopify",
  icon: Globe,
  title: "Shopify Store Setup",
  tagline: "D2C Specialists",
  seoTitle: "Shopify Store Setup - Custom E-Commerce Development",
  seoDescription: "Professional Shopify store setup and development. Custom themes, product migration, payment integration, SEO optimization, and multi-market capabilities for global selling.",
  heroDescription: "Custom Shopify stores designed for conversion with multi-market capabilities. We build beautiful, fast online stores that turn visitors into customers and scale with your business.",
  overview: "Your Shopify store is the hub of your direct-to-consumer business. Our setup service goes beyond basic installation -- we create fully customised, conversion-optimised stores that reflect your brand and deliver exceptional shopping experiences. From theme development to payment integration and multi-language support, we handle every detail so your store is ready to sell from day one.",
  features: [
    { title: "Custom Theme Development", description: "Bespoke Shopify theme design and development that aligns with your brand identity, optimised for speed, mobile responsiveness, and conversions." },
    { title: "Product Migration", description: "Seamless migration of your product catalogue from other platforms including images, descriptions, variants, and inventory levels with zero downtime." },
    { title: "Payment Gateway Integration", description: "Setup and configuration of Shopify Payments, PayPal, Stripe, and region-specific payment methods to maximise checkout completion rates." },
    { title: "SEO & Speed Optimization", description: "Technical SEO setup including meta tags, structured data, sitemap configuration, and page speed optimization for better search rankings." },
    { title: "Multi-Language & Currency", description: "Configure your store for international selling with multiple languages, automatic currency conversion, and localised shipping options." },
    { title: "App Integration & Automation", description: "Install and configure essential Shopify apps for email marketing, reviews, analytics, and order management with workflow automation." },
  ],
  benefits: [
    "Launch your online store faster with expert setup",
    "Higher conversion rates with a professionally designed store",
    "Sell internationally with multi-language and currency support",
    "Improved search rankings with proper SEO configuration",
    "Reduce manual work with app integrations and automation",
    "Ongoing support and maintenance after launch",
  ],
  markets: ["United Kingdom", "United States", "Europe", "Australia"],
  process: [
    { step: "01", title: "Discovery", description: "We discuss your brand, products, target audience, and business goals to plan the perfect store." },
    { step: "02", title: "Design & Build", description: "Custom theme design, product catalogue setup, payment integration, and app configuration tailored to your needs." },
    { step: "03", title: "Test & Launch", description: "Thorough testing across devices and browsers, followed by a smooth launch with all systems ready." },
    { step: "04", title: "Support & Grow", description: "Post-launch support, performance monitoring, and ongoing optimization to keep your store growing." },
  ],
  faq: [
    { question: "How long does a Shopify store setup take?", answer: "A standard setup takes 2-4 weeks depending on complexity. Custom theme development may extend this to 4-6 weeks." },
    { question: "Can you migrate my store from another platform?", answer: "Yes, we handle migrations from WooCommerce, Magento, BigCommerce, and other platforms including products, customers, and order history." },
    { question: "Do you offer ongoing Shopify support?", answer: "Yes, we offer monthly maintenance and support packages covering updates, troubleshooting, content updates, and new feature implementation." },
    { question: "Which Shopify plan do you recommend?", answer: "We recommend the right plan based on your business size and needs. We'll advise on the most cost-effective option during our consultation." },
  ],
};

export default function ShopifyService() {
  return <ServiceDetailPage data={data} />;
}
