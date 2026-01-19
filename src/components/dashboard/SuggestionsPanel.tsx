import { motion } from "framer-motion";
import { 
  Lightbulb, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  GitBranch, 
  Award,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  impact: string;
  marginalGain: number;
  action: string;
  actionLink?: string;
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    icon: Target,
    title: "Complete Mahindra AI Challenge",
    description: "You're 80% done with your submission. Finishing it could boost your score.",
    impact: "+35 Innovation Score",
    marginalGain: 35,
    action: "Resume Challenge",
  },
  {
    id: "2",
    icon: GitBranch,
    title: "Link GitHub Repository",
    description: "Connect your recent ML project to showcase your technical skills.",
    impact: "+18 Innovation Score",
    marginalGain: 18,
    action: "Link Repository",
  },
  {
    id: "3",
    icon: Award,
    title: "Upload AWS Certification",
    description: "Adding your AWS Cloud Practitioner cert increases industry readiness.",
    impact: "+8% Readiness",
    marginalGain: 8,
    action: "Upload Certificate",
  },
  {
    id: "4",
    icon: CheckCircle,
    title: "Request Project Validation",
    description: "Your campus navigation project is ready for industry validation.",
    impact: "+25 Innovation Score",
    marginalGain: 25,
    action: "Request Validation",
  },
];

export function SuggestionsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-card p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">
            Next Best Actions
          </h3>
          <p className="text-xs text-muted-foreground">
            Personalized recommendations to boost your score
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.01 }}
              className="group rounded-lg border border-border bg-accent/30 p-4 transition-all hover:border-primary/30 hover:bg-accent/50"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {suggestion.title}
                    </h4>
                    <div className="flex items-center gap-1 shrink-0 text-success">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs font-semibold">{suggestion.impact}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {suggestion.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-success"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(suggestion.marginalGain * 2.5, 100)}%` }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        Impact
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-primary hover:text-primary/80 hover:bg-primary/10 gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {suggestion.action}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Tips */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">
              You're on track for Top 10%!
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Completing 2 more actions could move you up 12 ranks by next week.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
