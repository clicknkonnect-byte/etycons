import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import logoImg from "@assets/Etycons_logo_1770420927255.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services/3pl", label: "3PL" },
  { href: "/services/sourcing-freight", label: "Sourcing & Freight" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] bg-background/80 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" data-testid="link-home-logo">
            <img src={logoImg} alt="E-Tycons" className="h-28 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-sm font-medium ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://wa.me/923367997447"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-whatsapp-header"
            >
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                WhatsApp
              </Button>
            </a>
            <a href="https://calendly.com/imaliakbar512/30min" target="_blank" rel="noopener noreferrer">
              <Button size="sm" data-testid="button-book-consultation-header">
                Book Consultation
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-1" data-testid="nav-mobile">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm font-medium ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t">
              <a
                href="https://wa.me/923367997447"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  WhatsApp Us
                </Button>
              </a>
              <a
                href="https://calendly.com/imaliakbar512/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full" onClick={() => setMobileOpen(false)}>
                  Book Consultation
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
