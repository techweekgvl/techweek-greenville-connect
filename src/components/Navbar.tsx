import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Speakers", href: "#speakers" },
  { label: "Sponsors", href: "#sponsors" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const hash = location.hash;
    if (!hash) return;
    // Give the homepage a tick to mount its sections before scrolling.
    const t = setTimeout(() => {
      if (hash === "#opportunities") {
        const volunteer = document.querySelector("#volunteer");
        const register = document.querySelector("#register");
        if (volunteer && register) {
          const midpoint = (volunteer.getBoundingClientRect().top + register.getBoundingClientRect().top) / 2 + window.scrollY;
          window.scrollTo({ top: midpoint, behavior: "smooth" });
          return;
        }
      }
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  const scrollTo = (href: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    if (href === "#opportunities") {
      const volunteer = document.querySelector("#volunteer");
      const register = document.querySelector("#register");
      if (volunteer && register) {
        const midpoint = (volunteer.getBoundingClientRect().top + register.getBoundingClientRect().top) / 2 + window.scrollY;
        window.scrollTo({ top: midpoint, behavior: "smooth" });
        return;
      }
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Gradient line at top */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <motion.button
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/twg-logo.png" alt="Tech Week Greenville" className="h-20" />
        </motion.button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="relative text-sm font-display tracking-wide uppercase text-muted-foreground hover:text-white transition-colors py-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              whileHover="hover"
            >
              {l.label}
              <motion.span
                className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              className="font-display bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-shadow"
              onClick={() => scrollTo("#opportunities")}
            >
              Opportunities
            </Button>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="block w-full text-left text-sm font-body text-muted-foreground hover:text-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.button>
            ))}
            <Button
              size="sm"
              className="w-full font-display bg-primary text-primary-foreground"
              onClick={() => scrollTo("#opportunities")}
            >
              Opportunities
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
