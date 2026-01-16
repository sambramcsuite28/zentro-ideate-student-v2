import { motion } from "framer-motion";
import { Trophy, CheckCircle2, Award, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Metric {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  total?: number;
  subtext: string;
  badges?: string[];
}

const metrics: Metric[] = [
  {
    icon: Trophy,
    label: "Industry Challenges",
    value: 4,
    total: 7,
    subtext: "Participated in hiring-facing work",
  },
  {
    icon: CheckCircle2,
    label: "Validated Projects",
    value: 3,
    subtext: "Passed reviews & feedback",
    badges: ["Industry", "Mentor"],
  },
  {
    icon: Award,
    label: "Technical Certifications",
    value: 3,
    subtext: "AWS, Deloitte, Oracle",
  },
  {
    icon: Users,
    label: "Evaluator Feedback",
    value: 5,
    subtext: "R.P., D.S., M.K.",
  },
];

const MetricsPanel = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-card p-5 shadow-card group cursor-default"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <metric.icon className="h-5 w-5 text-accent-foreground" />
            </div>
            {metric.badges && (
              <div className="flex gap-1">
                {metric.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-success/10 text-success"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            
            <div className="flex items-baseline gap-1">
              <motion.span
                className="text-2xl font-display font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {metric.value}
              </motion.span>
              {metric.total && (
                <span className="text-sm text-muted-foreground">
                  / {metric.total}
                </span>
              )}
            </div>

            {metric.total && (
              <Progress 
                value={(metric.value / metric.total) * 100} 
                className="h-1.5"
              />
            )}

            <p className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
              {metric.subtext}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsPanel;
