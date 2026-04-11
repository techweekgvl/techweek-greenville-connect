import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

const perks = [
  "A full event itinerary will be shared in advance",
  "Flexible scheduling\u2014select the days and time slots that fit your availability",
  "Opportunities to network with professionals across tech, business, and media",
  "Hands-on experience working behind the scenes of a growing regional event",
];

const Volunteer = () => {
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
      const res = await fetch("https://formspree.io/f/xwvwgkyl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Thanks for your interest! We'll follow up with next steps.");
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
    <section id="volunteer" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Volunteer with <span className="gradient-text">Tech Week</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-2xl mx-auto">
            Tech Week Greenville is a 6-day experience taking place September 21–26, 2026, bringing together founders, professionals, students, and creatives through panels, networking events, a pitch competition, and community activations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground font-body mb-6">
              We are currently looking for motivated and reliable volunteers to help bring this year's event to life. Volunteers will play an important role across various events throughout the week, assisting with operations, guest experience, check-in, and overall event execution.
            </p>

            <h3 className="text-lg font-semibold font-display mb-4">What to Expect</h3>
            <ul className="space-y-3 mb-6">
              {perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground font-body">
                  <Heart className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground font-body text-sm">
              Whether you're looking to gain experience, meet new people, or be part of something impactful in the Greenville community, we'd love to have you involved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold font-display mb-2">Express Interest</h3>
              <p className="text-sm text-muted-foreground font-body mb-6">
                Submit your information below and our team will follow up with next steps.
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
                  <p className="text-lg font-display font-semibold">You're in!</p>
                  <p className="text-sm text-muted-foreground font-body">We'll be in touch with next steps.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    name="phone"
                    type="tel"
                    placeholder="Phone number (optional)"
                    className="bg-secondary border-border h-12 font-body"
                  />
                  <Input
                    name="availability"
                    placeholder="Preferred days/times (optional)"
                    className="bg-secondary border-border h-12 font-body"
                  />
                  <Textarea
                    name="skills"
                    placeholder="Skills or experience you'd like to contribute (optional)"
                    className="bg-secondary border-border font-body min-h-[80px]"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full h-12 font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Volunteer Now <ArrowRight className="w-4 h-4 ml-1" /></>}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
