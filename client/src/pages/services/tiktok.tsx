import { TrendingUp } from "lucide-react";
import { ServiceDetailPage, type ServicePageData } from "@/pages/service-detail";

const data: ServicePageData = {
  slug: "tiktok",
  icon: TrendingUp,
  title: "TikTok Shop UK Management",
  tagline: "Social Commerce",
  seoTitle: "TikTok Shop Management - Social Commerce Experts",
  seoDescription: "Expert TikTok Shop UK management. Shop setup, content strategy, creator partnerships, affiliate programmes, and live shopping events to maximise social commerce sales.",
  heroDescription: "Launch and grow your TikTok Shop presence with expert social commerce strategies. From shop setup to live shopping events, we help you tap into one of the fastest-growing sales channels in the UK.",
  overview: "TikTok Shop is revolutionising how consumers discover and buy products. Our management service helps brands and sellers capitalise on this opportunity with end-to-end support covering shop setup, product catalogue management, content strategy, and creator collaborations. We combine social media expertise with e-commerce know-how to drive real sales through engaging content.",
  features: [
    { title: "Shop Setup & Product Catalogue", description: "Complete TikTok Shop setup including branding, product listings with engaging descriptions, and catalogue organisation for maximum discoverability." },
    { title: "Content Strategy", description: "Data-driven content calendars with trend-aligned video concepts designed to showcase your products and drive conversions." },
    { title: "Creator Partnerships", description: "Identify, recruit, and manage creator collaborations and influencer partnerships to amplify your brand reach and generate authentic product endorsements." },
    { title: "Order Fulfillment Management", description: "Streamlined order processing, dispatch coordination, and delivery tracking to ensure customers receive orders promptly." },
    { title: "Affiliate Programme Management", description: "Set up and manage your TikTok Shop affiliate programme, including commission structures and affiliate recruitment strategies." },
    { title: "Live Shopping Events", description: "Plan and execute live shopping broadcasts including product selection, host coordination, and promotion strategy for maximum engagement." },
  ],
  benefits: [
    "Access one of the UK's fastest-growing sales channels",
    "Reach younger demographics (18-34) who prefer social shopping",
    "Drive sales through authentic, engaging video content",
    "Build brand awareness alongside direct sales",
    "Leverage creator networks for organic product promotion",
    "Stay ahead of competitors still relying on traditional channels",
  ],
  markets: ["United Kingdom"],
  process: [
    { step: "01", title: "Shop Setup", description: "We set up your TikTok Shop account, verify your business, and create an optimised product catalogue ready for sales." },
    { step: "02", title: "Content Plan", description: "We develop a content strategy aligned with trending formats and your brand voice to maximise product visibility." },
    { step: "03", title: "Creator Outreach", description: "We identify and partner with relevant creators and affiliates to promote your products to their engaged audiences." },
    { step: "04", title: "Optimise & Grow", description: "Continuous performance analysis, content refinement, and scaling strategies to increase sales month over month." },
  ],
  faq: [
    { question: "Is TikTok Shop available outside the UK?", answer: "TikTok Shop is expanding globally. We currently focus on the UK market where it is fully established, and can advise on expansion as new markets open." },
    { question: "Do I need existing TikTok followers?", answer: "No, you don't need an existing following. We use paid promotions, creator partnerships, and affiliate networks to generate sales from day one." },
    { question: "How do you handle returns and refunds?", answer: "We manage the full returns process in line with TikTok Shop policies, ensuring quick resolution for customers while protecting your margins." },
    { question: "What types of products work best on TikTok Shop?", answer: "Products with visual appeal, trending items, beauty, fashion, homeware, and gadgets tend to perform exceptionally well. We can assess your product range suitability." },
  ],
};

export default function TiktokService() {
  return <ServiceDetailPage data={data} />;
}
