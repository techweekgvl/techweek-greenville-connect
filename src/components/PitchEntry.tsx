import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const PitchEntry = () => {
  const [state, handleSubmit] = useForm("mnjwgnoe");

  return (
    <section id="pitch" className="py-24 px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-primary/5 blur-[120px]" />
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
            Pitch <span className="gradient-text">Competition</span>
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Submit your idea for a chance to win the Tech Innovation Grant.
          </p>

          {state.succeeded ? (
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
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    name="firstName"
                    placeholder="First name *"
                    className="bg-secondary border-border h-12 font-body"
                    required
                  />
                  <ValidationError field="firstName" errors={state.errors} className="text-xs text-destructive mt-1" />
                </div>
                <div>
                  <Input
                    name="lastName"
                    placeholder="Last name *"
                    className="bg-secondary border-border h-12 font-body"
                    required
                  />
                  <ValidationError field="lastName" errors={state.errors} className="text-xs text-destructive mt-1" />
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
                <ValidationError field="email" errors={state.errors} className="text-xs text-destructive mt-1" />
              </div>
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone number *"
                  className="bg-secondary border-border h-12 font-body"
                  required
                />
                <ValidationError field="phone" errors={state.errors} className="text-xs text-destructive mt-1" />
              </div>
              <div>
                <Textarea
                  name="idea"
                  placeholder="Describe your idea *"
                  className="bg-secondary border-border font-body min-h-[120px]"
                  required
                />
                <ValidationError field="idea" errors={state.errors} className="text-xs text-destructive mt-1" />
              </div>
              <div>
                <Input
                  name="website"
                  type="url"
                  placeholder="Website (optional)"
                  className="bg-secondary border-border h-12 font-body"
                />
                <ValidationError field="website" errors={state.errors} className="text-xs text-destructive mt-1" />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={state.submitting}
                className="w-full h-12 font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                {state.submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Entry <ArrowRight className="w-4 h-4 ml-1" /></>}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PitchEntry;
