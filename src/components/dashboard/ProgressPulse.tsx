import { TrendingUp, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressFact {
  icon: React.ReactNode;
  text: string;
  emphasis?: string;
}

const progressFacts: ProgressFact[] = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    text: "You're in the",
    emphasis: "top 28% of active peers",
  },
  {
    icon: <Target className="h-5 w-5" />,
    text: "You've submitted",
    emphasis: "2 of 4 Proof-of-Work-ready challenges",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    text: "1 challenge this week matches your interest —",
    emphasis: "not joined yet",
  },
];

export function ProgressPulse() {
  return (
    <section className="w-full">
      <div className="grid gap-4 md:grid-cols-3">
        {progressFacts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-card"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              {fact.icon}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {fact.text}{" "}
              <span className="font-medium text-foreground">{fact.emphasis}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
