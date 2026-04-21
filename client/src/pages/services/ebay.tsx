import { ShoppingBag } from "lucide-react";
import { ServiceDetailPage, type ServicePageData } from "@/pages/service-detail";

const data: ServicePageData = {
  slug: "ebay",
  icon: ShoppingBag,
  title: "eBay Account Management",
  tagline: "Marketplace Experts",
  seoTitle: "eBay Account Management - Expert Store Management",
  seoDescription: "Professional eBay account management for UK, US, European, and Australian sellers. Listing optimization, pricing strategy, customer service, and performance analytics.",
  heroDescription: "Complete eBay store management tailored for UK, US, European, and Australian markets. We handle everything from listing creation to customer service so you can focus on growing your business.",
  overview: "Our eBay account management service covers every aspect of running a successful eBay store. Whether you're an established seller looking to scale or just starting out, our team of marketplace experts will optimise your listings, manage your customer interactions, and implement strategies to boost your sales and maintain top-rated seller status across multiple markets.",
  features: [
    { title: "Listing Creation & Optimization", description: "Professional product listings with keyword-optimised titles, compelling descriptions, and high-converting images that stand out in search results." },
    { title: "Pricing Strategy", description: "Competitive pricing analysis and dynamic repricing strategies to maximise profit margins while maintaining sales velocity." },
    { title: "Customer Service Management", description: "Prompt, professional customer communication handling enquiries, returns, and disputes to maintain positive feedback scores." },
    { title: "Performance Analytics", description: "Detailed monthly reports on sales performance, traffic sources, conversion rates, and actionable recommendations." },
    { title: "Multi-Currency Support", description: "Listings optimised for international buyers with proper currency conversion, shipping options, and localised descriptions." },
    { title: "Cross-Border Compliance", description: "Navigate customs, import duties, and marketplace regulations to sell confidently across UK, US, EU, and Australian markets." },
  ],
  benefits: [
    "Increase your eBay sales by up to 40% with optimised listings",
    "Maintain Top Rated Seller status consistently",
    "Save 20+ hours per week on store management tasks",
    "Reduce customer complaint rates with proactive service",
    "Expand into new international markets with confidence",
    "Data-driven decisions backed by detailed analytics",
  ],
  markets: ["United Kingdom", "United States", "Europe", "Australia"],
  process: [
    { step: "01", title: "Account Audit", description: "We review your current eBay account, listings, and performance metrics to identify quick wins and growth opportunities." },
    { step: "02", title: "Strategy Plan", description: "We develop a customised management plan covering listing optimization, pricing, and growth targets for your store." },
    { step: "03", title: "Implementation", description: "Our team takes over day-to-day management, optimising listings and handling all customer interactions." },
    { step: "04", title: "Monitor & Scale", description: "Ongoing performance monitoring with regular reporting and strategy adjustments to keep growing your sales." },
  ],
  faq: [
    { question: "Do I keep control of my eBay account?", answer: "Absolutely. You retain full ownership and access to your account at all times. We work alongside you with agreed-upon access levels." },
    { question: "Which eBay markets do you support?", answer: "We manage stores on eBay UK, eBay US, eBay Germany, eBay France, eBay Italy, eBay Spain, and eBay Australia." },
    { question: "How quickly will I see results?", answer: "Most clients see measurable improvements within the first 30 days, with significant sales increases typically visible by month three." },
    { question: "Can you help with eBay account suspensions?", answer: "Yes, we offer appeal and reinstatement support as part of our compliance service, and proactively prevent suspensions through monitoring." },
  ],
};

export default function EbayService() {
  return <ServiceDetailPage data={data} />;
}
