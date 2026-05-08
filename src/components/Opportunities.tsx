import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Opportunities = () => {
  const [pitchState, handlePitchSubmit] = useForm("mnjwgnoe");

  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const handleRegSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("name") || !formData.get("email")) {
      toast.error("Please fill in name and email.");
      return;
    }

    setRegLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xpqovzbz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setRegSubmitted(true);
        toast.success("You're on the list! We'll be in touch.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <section id="register" className="pt-8 pb-24 px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pitch Competition Entry — Left */}
          <motion.div
            className="glass-card rounded-2xl p-8 md:p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Pitch <span className="gradient-text">Competition</span>
            </h2>
            <p className="text-muted-foreground font-body mb-8 text-sm">
              Submit your idea for a chance to win the Tech Innovation Grant.
            </p>

            {pitchState.succeeded ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3 py-6"
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-7 h-7 text-primary" />
                </div>
                <p className="text-lg font-display font-semibold">Entry submitted!</p>
                <p className="text-sm text-muted-foreground font-body">We'll review your submission and follow up soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handlePitchSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="firstName"
                      placeholder="First name *"
                      className="bg-secondary border-border h-12 font-body"
                      required
                    />
                    <ValidationError field="firstName" errors={pitchState.errors} className="text-xs text-destructive mt-1" />
                  </div>
                  <div>
                    <Input
                      name="lastName"
                      placeholder="Last name *"
                      className="bg-secondary border-border h-12 font-body"
                      required
                    />
                    <ValidationError field="lastName" errors={pitchState.errors} className="text-xs text-destructive mt-1" />
                  </div>
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com *"
                    className="bg-secondary border-border h-12 font-body"
                    required
                  />
                  <ValidationError field="email" errors={pitchState.errors} className="text-xs text-destructive mt-1" />
                </div>
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone number *"
                    className="bg-secondary border-border h-12 font-body"
                    required
                  />
                  <ValidationError field="phone" errors={pitchState.errors} className="text-xs text-destructive mt-1" />
                </div>
                <div>
                  <Textarea
                    name="idea"
                    placeholder="Describe your idea *"
                    className="bg-secondary border-border font-body min-h-[120px]"
                    required
                  />
                  <ValidationError field="idea" errors={pitchState.errors} className="text-xs text-destructive mt-1" />
                </div>
                <div>
                  <Input
                    name="website"
                    type="url"
                    placeholder="Website (optional)"
                    className="bg-secondary border-border h-12 font-body"
                  />
                  <ValidationError field="website" errors={pitchState.errors} className="text-xs text-destructive mt-1" />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={pitchState.submitting}
                  className="w-full h-12 font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                >
                  {pitchState.submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Entry <ArrowRight className="w-4 h-4 ml-1" /></>}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Join the Movement — Right */}
          <motion.div
            className="glass-card rounded-2xl p-8 md:p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
              Join the <span className="gradient-text">Movement</span>
            </h2>
            <p className="text-muted-foreground font-body mb-8 text-sm">
              Be the first to know about events, speakers, and more.
            </p>

            {regSubmitted ? (
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
              <form onSubmit={handleRegSubmit} className="space-y-4 text-left">
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
                  disabled={regLoading}
                  className="w-full h-12 font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                >
                  {regLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Register Now <ArrowRight className="w-4 h-4 ml-1" /></>}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
