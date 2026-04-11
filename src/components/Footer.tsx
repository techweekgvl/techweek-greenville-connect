import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-display font-bold text-lg gradient-text mb-1">Tech Week Greenville</h3>
          <p className="text-sm text-muted-foreground font-body">September 21st – 26th, 2026 • Greenville, SC</p>
        </div>

        <div className="flex items-center gap-4">
<a href="https://www.instagram.com/techweekgreenville/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="mailto:ndennis@techweekgreenville.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground font-body">
          © 2026 Tech Week Greenville. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
