import { Shield } from "lucide-react";
import { ServiceDetailPage, type ServicePageData } from "@/pages/service-detail";

const data: ServicePageData = {
  slug: "compliance",
  icon: Shield,
  title: "Compliance & Account Health",
  tagline: "Account Protection",
  seoTitle: "Compliance & Account Health - Protect Your Seller Accounts",
  seoDescription: "Proactive compliance monitoring and account health management for eBay, Amazon, and TikTok Shop sellers. Suspension prevention, appeals, and regulatory compliance across UK, US, EU, and AU.",
  heroDescription: "Protect your seller accounts with proactive compliance and health monitoring. One suspension can cost thousands in lost revenue -- we make sure that doesn't happen.",
  overview: "Marketplace account suspensions and policy violations can devastate your business overnight. Our compliance and account health service provides ongoing monitoring, proactive issue resolution, and expert guidance to keep your seller accounts in perfect standing. We stay on top of ever-changing marketplace policies so you don't have to, and if problems do arise, our experienced team handles appeals and reinstatement swiftly.",
  features: [
    { title: "Policy Compliance Audits", description: "Regular audits of your listings, practices, and account settings against current marketplace policies to identify and fix potential violations." },
    { title: "Suspension Prevention", description: "Proactive monitoring of account health metrics, performance indicators, and policy updates to prevent suspensions before they happen." },
    { title: "Appeal & Reinstatement", description: "Expert appeal writing and case management for suspended or restricted accounts, with a strong track record of successful reinstatements." },
    { title: "IP & Brand Protection", description: "Monitor for counterfeit listings, unauthorised sellers, and intellectual property infringements that could harm your brand or trigger policy issues." },
    { title: "Regulatory Compliance", description: "Guidance on product safety regulations, labelling requirements, and legal obligations across UK, EU, US, and Australian markets." },
    { title: "Performance Optimization", description: "Improve key account health metrics including defect rate, late shipment rate, and customer satisfaction scores to maintain top seller status." },
  ],
  benefits: [
    "Prevent costly account suspensions and restrictions",
    "Maintain top seller status across all marketplaces",
    "Stay compliant with changing policies automatically",
    "Protect your brand from counterfeit and IP issues",
    "Quick resolution if account issues do arise",
    "Peace of mind knowing your accounts are monitored 24/7",
  ],
  markets: ["United Kingdom", "United States", "Europe", "Australia"],
  process: [
    { step: "01", title: "Health Check", description: "Comprehensive audit of your account health, compliance status, and risk areas across all your marketplace accounts." },
    { step: "02", title: "Risk Mitigation", description: "Address any existing compliance issues, update practices, and implement monitoring systems to prevent future problems." },
    { step: "03", title: "Ongoing Monitoring", description: "Continuous automated and manual monitoring of account health metrics, policy changes, and potential violation triggers." },
    { step: "04", title: "Rapid Response", description: "If issues arise, our team responds immediately with corrective action plans, appeals, and direct communication with marketplace support." },
  ],
  faq: [
    { question: "My account is already suspended. Can you help?", answer: "Yes, we specialise in account reinstatement. We'll review your case, identify the root cause, and craft a compelling Plan of Action to get your account restored." },
    { question: "Which marketplaces do you cover?", answer: "We cover eBay, Amazon, TikTok Shop, and other major marketplaces. Our team stays current with policy updates across all platforms." },
    { question: "How do you monitor my account health?", answer: "We use a combination of automated tools and manual review to track key performance metrics, policy compliance, and marketplace communications daily." },
    { question: "Can you guarantee my account won't be suspended?", answer: "While no one can guarantee immunity from all issues, our proactive approach dramatically reduces risk and ensures rapid resolution if problems occur." },
  ],
};

export default function ComplianceService() {
  return <ServiceDetailPage data={data} />;
}
