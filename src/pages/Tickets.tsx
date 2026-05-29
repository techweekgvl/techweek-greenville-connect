import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, AlertCircle } from "lucide-react";
import posthog from "posthog-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TICKET_TIERS, type TicketTier } from "@/lib/tickets";

const TicketCard = ({ tier }: { tier: TicketTier }) => {
  const handleBuy = () => {
    posthog.capture("ticket_selected", { tier: tier.id, price: tier.price });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col h-full ${
        tier.highlighted ? "ring-2 ring-primary/60 shadow-[0_0_40px_hsl(var(--primary)/0.25)]" : ""
      }`}
    >
      <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      {tier.highlighted && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-[10px] uppercase tracking-wider text-primary font-display font-semibold">
          <Sparkles className="w-3 h-3" />
          Best Value
        </span>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xl sm:text-2xl font-bold font-display mb-1 gradient-text">
          {tier.name}
        </h3>
        <p className="text-sm text-muted-foreground font-body mb-4">{tier.tagline}</p>

        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-4xl sm:text-5xl font-bold font-display text-foreground">${tier.price}</span>
          <span className="text-sm text-muted-foreground font-body">one-time</span>
        </div>

        <ul className="space-y-2 mb-5 flex-1">
          {tier.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {tier.disclaimer && (
          <div className="mb-5 flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 font-body">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{tier.disclaimer}</span>
          </div>
        )}

        <a
          href={tier.paymentLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleBuy}
          className="block"
        >
          <Button
            size="lg"
            className={`w-full font-display font-semibold transition-shadow ${
              tier.highlighted
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)]"
                : "bg-primary/90 text-primary-foreground hover:bg-primary"
            }`}
          >
            Buy {tier.name}
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

const Tickets = () => {
  useEffect(() => {
    posthog.capture("tickets_page_viewed");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, hsl(var(--primary)) 0px, transparent 1px, transparent 80px)`,
        }} />
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border border-primary/30 bg-primary/10 text-primary font-body">
              Sept 20 – 26, 2026 • Greenville, SC
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4">
              Early Bird <span className="gradient-text">Tickets</span>
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Pick the pass that fits your week. All purchases include access to the events listed, food & beverages on event days, and your credential pickup.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto mb-10 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-center text-sm font-body text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="font-semibold text-primary">Sunday, Sept 20 is free.</span>{" "}
            The Opening Mixer at Yee-Haw Brewing is open to all — no ticket required.
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TICKET_TIERS.map((tier) => (
              <TicketCard key={tier.id} tier={tier} />
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground font-body mt-8">
            Secure checkout powered by Stripe. Confirmation emails sent immediately after purchase.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tickets;
