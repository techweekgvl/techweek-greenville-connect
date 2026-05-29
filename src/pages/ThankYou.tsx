import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Calendar, ArrowLeft } from "lucide-react";
import posthog from "posthog-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    posthog.capture("ticket_purchase_completed", {
      session_id: sessionId ?? "unknown",
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 relative overflow-hidden flex items-center justify-center">
        {/* Decorative background */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-primary/15 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10 max-w-2xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-8 sm:p-12 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-3">
                You're <span className="gradient-text">in.</span>
              </h1>
              <p className="text-lg text-muted-foreground font-body mb-8">
                Thanks for your support — your ticket to Tech Week Greenville is confirmed.
              </p>

              <div className="space-y-3 text-left mb-8 max-w-md mx-auto">
                <div className="flex items-start gap-3 text-sm font-body">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    A receipt is on its way to your inbox. Hang onto it — you'll need it at credential pickup.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm font-body">
                  <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Tech Week runs Sept 20 – 26, 2026 in Greenville, SC. We'll send credential pickup details closer to the date.
                  </span>
                </div>
              </div>

              <Link to="/">
                <Button
                  size="lg"
                  className="font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)] transition-shadow"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to home
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
