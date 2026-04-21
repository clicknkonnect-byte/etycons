import { Package } from "lucide-react";
import { ServiceDetailPage, type ServicePageData } from "@/pages/service-detail";

const data: ServicePageData = {
  slug: "amazon",
  icon: Package,
  title: "Amazon Seller Support",
  tagline: "FBA & FBM Experts",
  seoTitle: "Amazon Seller Support - FBA & FBM Account Management",
  seoDescription: "Professional Amazon seller support covering FBA and FBM management, PPC campaigns, Brand Registry, A+ Content, and inventory planning across UK, US, and European markets.",
  heroDescription: "Navigate Amazon's complex ecosystem with dedicated seller account management. From FBA logistics to PPC advertising, we help you compete and win on the world's largest marketplace.",
  overview: "Amazon is a powerful sales channel but its complexity can be overwhelming. Our Amazon seller support service provides the expertise you need to thrive. We manage your product listings, advertising campaigns, inventory planning, and account health to ensure consistent growth. Whether you use FBA, FBM, or both, we tailor our approach to maximise your profitability across all Amazon marketplaces.",
  features: [
    { title: "FBA & FBM Management", description: "Expert management of your fulfilment strategy, whether using Fulfilled by Amazon, Fulfilled by Merchant, or a hybrid approach optimised for cost and speed." },
    { title: "Product Listing Optimization", description: "SEO-optimised product titles, bullet points, descriptions, and backend keywords to maximise your organic search visibility on Amazon." },
    { title: "PPC Campaign Management", description: "Strategic Sponsored Products, Sponsored Brands, and Sponsored Display campaigns managed to deliver the best return on ad spend." },
    { title: "Brand Registry & A+ Content", description: "Full Brand Registry setup and enhanced A+ Content creation with rich media, comparison charts, and brand storytelling to boost conversion rates." },
    { title: "Inventory Planning", description: "Demand forecasting, restock alerts, and inventory management to prevent stockouts and minimise long-term storage fees." },
    { title: "Account Health Monitoring", description: "Proactive monitoring of account metrics, policy compliance, and performance notifications to prevent suspensions and maintain good standing." },
  ],
  benefits: [
    "Increase product visibility with optimised listings and PPC",
    "Reduce advertising costs while improving sales volume",
    "Prevent costly stockouts with smart inventory planning",
    "Protect your brand with proper Brand Registry setup",
    "Maintain Account Health with proactive compliance monitoring",
    "Scale across Amazon UK, US, DE, FR, IT, ES, and more",
  ],
  markets: ["United Kingdom", "United States", "Europe", "Australia"],
  process: [
    { step: "01", title: "Account Review", description: "Comprehensive audit of your Amazon account including listings, advertising, inventory, and account health metrics." },
    { step: "02", title: "Growth Strategy", description: "Custom strategy covering listing optimization, PPC budget allocation, inventory planning, and market expansion opportunities." },
    { step: "03", title: "Launch & Optimise", description: "Implement optimised listings, launch targeted PPC campaigns, and set up inventory management workflows." },
    { step: "04", title: "Scale & Report", description: "Continuous optimization with monthly performance reports, strategy refinements, and new market expansion as targets are met." },
  ],
  faq: [
    { question: "Should I use FBA or FBM?", answer: "It depends on your products, margins, and volume. We analyse your specific situation and recommend the optimal fulfilment strategy, often a hybrid approach works best." },
    { question: "How much should I budget for Amazon PPC?", answer: "We recommend starting with a budget you're comfortable with and scaling based on results. We focus on ACOS (Advertising Cost of Sale) targets that make sense for your margins." },
    { question: "Can you help with Amazon account suspension?", answer: "Yes, we provide appeal support and reinstatement services. More importantly, our proactive monitoring helps prevent suspensions before they happen." },
    { question: "Do you manage Amazon advertising only?", answer: "We offer both full account management and advertising-only packages. We can tailor our service to your specific needs." },
  ],
};

export default function AmazonService() {
  return <ServiceDetailPage data={data} />;
}
