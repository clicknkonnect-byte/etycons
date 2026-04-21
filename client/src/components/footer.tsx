import { Link } from "wouter";
import { MessageCircle, Mail, MapPin, Globe, Calendar } from "lucide-react";
import { SiFacebook, SiLinkedin, SiInstagram } from "react-icons/si";
import logoImg from "@assets/Etycons_logo_1770420927255.png";

const serviceLinks = [
  { href: "/services/ebay", label: "eBay Account Management" },
  { href: "/services/tiktok", label: "TikTok Shop Management" },
  { href: "/services/amazon", label: "Amazon Seller Support" },
  { href: "/services/shopify", label: "Shopify Store Setup" },
  { href: "/services/product-research", label: "Product Research" },
  { href: "/services/compliance", label: "Compliance & Account Health" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <img src={logoImg} alt="E-Tycons" className="h-24 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Your trusted e-commerce and digital operations partner. Helping sellers scale across eBay, TikTok Shop, Amazon, and Shopify worldwide.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://web.facebook.com/etycons/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">info@etycons.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">WhatsApp Available</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">United Kingdom</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Serving UK, USA, EU & AU</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a
                  href="https://calendly.com/imaliakbar512/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-calendly-footer"
                >
                  Book a Free Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Etycons. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            E-Commerce & Digital Operations Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
