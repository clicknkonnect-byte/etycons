import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import HowItWorks from "@/pages/how-it-works";
import Contact from "@/pages/contact";
import EbayService from "@/pages/services/ebay";
import TiktokService from "@/pages/services/tiktok";
import AmazonService from "@/pages/services/amazon";
import ShopifyService from "@/pages/services/shopify";
import ProductResearchService from "@/pages/services/product-research";
import ComplianceService from "@/pages/services/compliance";
import ThreePLService from "@/pages/services/3pl";
import SourcingFreightService from "@/pages/services/sourcing-freight";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import { Chatbot } from "@/components/chatbot";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/ebay" component={EbayService} />
      <Route path="/services/tiktok" component={TiktokService} />
      <Route path="/services/amazon" component={AmazonService} />
      <Route path="/services/shopify" component={ShopifyService} />
      <Route path="/services/product-research" component={ProductResearchService} />
      <Route path="/services/compliance" component={ComplianceService} />
      <Route path="/services/3pl" component={ThreePLService} />
      <Route path="/services/sourcing-freight" component={SourcingFreightService} />
      <Route path="/about" component={About} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <ScrollToTop />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
              <Chatbot />
            </div>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
