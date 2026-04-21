import { BarChart3 } from "lucide-react";
import { ServiceDetailPage, type ServicePageData } from "@/pages/service-detail";

const data: ServicePageData = {
  slug: "research",
  icon: BarChart3,
  title: "Product Research",
  tagline: "Data-Driven Insights",
  seoTitle: "Product Research - Find Profitable E-Commerce Opportunities",
  seoDescription: "Data-driven product research for eBay, Amazon, TikTok Shop, and Shopify sellers. Market analysis, competitor research, profit calculations, and supplier sourcing guidance.",
  heroDescription: "Data-driven product research to find profitable opportunities across all marketplaces. Make confident sourcing decisions backed by real market data and expert analysis.",
  overview: "Choosing the right products to sell is the foundation of a successful e-commerce business. Our product research service combines advanced market analysis tools with experienced marketplace knowledge to identify high-demand, profitable opportunities. We analyse competition levels, profit margins, seasonal trends, and supplier options to give you a clear picture of which products will deliver the best return on your investment.",
  features: [
    { title: "Market Trend Analysis", description: "Identify emerging product trends across eBay, Amazon, and TikTok Shop using real-time sales data and search volume analytics." },
    { title: "Competitor Research", description: "Deep analysis of top sellers in your category including pricing strategies, listing techniques, review patterns, and market share estimates." },
    { title: "Profit Margin Calculations", description: "Detailed cost breakdowns including product cost, shipping, marketplace fees, advertising, and returns to calculate true net profit margins." },
    { title: "Supplier Sourcing Guidance", description: "Recommendations for reliable suppliers with competitive pricing, quality assurance guidance, and sample ordering best practices." },
    { title: "Seasonal Demand Forecasting", description: "Predict demand fluctuations throughout the year to plan inventory purchases and capitalise on peak selling periods." },
    { title: "Niche Viability Assessment", description: "Comprehensive evaluation of niche market potential including market size, competition intensity, barrier to entry, and growth trajectory." },
  ],
  benefits: [
    "Reduce the risk of investing in unprofitable products",
    "Identify high-margin opportunities your competitors missed",
    "Make data-backed sourcing decisions, not guesses",
    "Understand true profitability after all fees and costs",
    "Stay ahead of trends with market intelligence",
    "Save weeks of research time with expert analysis",
  ],
  markets: ["United Kingdom", "United States", "Europe", "Australia"],
  process: [
    { step: "01", title: "Brief & Goals", description: "We discuss your budget, interests, and business goals to define the scope and criteria for product research." },
    { step: "02", title: "Data Analysis", description: "Deep market research using professional tools to identify products matching your criteria with strong demand and manageable competition." },
    { step: "03", title: "Report Delivery", description: "A comprehensive research report with product recommendations, profit projections, supplier suggestions, and launch strategy." },
    { step: "04", title: "Launch Support", description: "Guidance on sourcing, listing creation, and initial marketing to help you successfully launch your chosen products." },
  ],
  faq: [
    { question: "What marketplaces do you research?", answer: "We research opportunities across eBay, Amazon, TikTok Shop, and Shopify/D2C markets in the UK, US, Europe, and Australia." },
    { question: "How many product recommendations will I receive?", answer: "A standard research package includes 5-10 detailed product recommendations with full analysis. Custom packages are available for more extensive research." },
    { question: "Can you help with private label products?", answer: "Yes, we research both arbitrage/wholesale opportunities and private label product ideas, including branding and differentiation strategies." },
    { question: "How current is the data you use?", answer: "We use real-time marketplace data and tools like Terapeak, Helium 10, and Jungle Scout to ensure our analysis reflects current market conditions." },
  ],
};

export default function ProductResearchService() {
  return <ServiceDetailPage data={data} />;
}
