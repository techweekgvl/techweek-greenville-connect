import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("name") || !formData.get("email")) {
      toast.error("Please fill in name and email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xpqovzbz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("You're on the list! We'll be in touch.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-24 px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            Join the <span className="gradient-text">Movement</span>
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Be the first to know about events, speakers, and more.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <p className="text-lg font-display font-semibold">You're registered!</p>
              <p className="text-sm text-muted-foreground font-body">We'll send updates to your inbox.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <Input
                name="name"
                placeholder="Your name *"
                className="bg-secondary border-border h-12 font-body"
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="your@email.com *"
                className="bg-secondary border-border h-12 font-body"
                required
              />
              <Input
                name="company"
                placeholder="Company or organization (optional)"
                className="bg-secondary border-border h-12 font-body"
              />
              <Input
                name="role"
                placeholder="Your role (optional)"
                className="bg-secondary border-border h-12 font-body"
              />
              <Input
                name="referral"
                placeholder="How did you hear about us? (optional)"
                className="bg-secondary border-border h-12 font-body"
              />
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full h-12 font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Register Now <ArrowRight className="w-4 h-4 ml-1" /></>}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
