import { Zap } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">InflectiveX</span>
            </div>
            <p className="text-muted-foreground">
              Empowering Innovation Through Technology
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Get In Touch</h4>
            <p className="text-muted-foreground mb-2">
              hello@inflectivex.com
            </p>
            <p className="text-muted-foreground">
              Colombo, Sri Lanka
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} InflectiveX. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Made in Sri Lanka with <span className="text-primary">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
