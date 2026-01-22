import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, TrendingUp, Target, GitBranch, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Suggestion {
  id: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  description: string;
  impact: string;
  marginalGain: number;
  action: string;
  actionLink?: string;
}
const suggestions: Suggestion[] = [{
  id: "1",
  icon: Target,
  title: "Complete Mahindra AI Challenge",
  description: "You're 80% done with your submission. Finishing it could boost your score.",
  impact: "+35 Innovation Score",
  marginalGain: 35,
  action: "Resume Challenge"
}, {
  id: "2",
  icon: GitBranch,
  title: "Link GitHub Repository",
  description: "Connect your recent ML project to showcase your technical skills.",
  impact: "+18 Innovation Score",
  marginalGain: 18,
  action: "Link Repository"
}, {
  id: "3",
  icon: Award,
  title: "Upload AWS Certification",
  description: "Adding your AWS Cloud Practitioner cert increases industry readiness.",
  impact: "+8% Readiness",
  marginalGain: 8,
  action: "Upload Certificate"
}, {
  id: "4",
  icon: CheckCircle,
  title: "Request Project Validation",
  description: "Your campus navigation project is ready for industry validation.",
  impact: "+25 Innovation Score",
  marginalGain: 25,
  action: "Request Validation"
}];
export function SuggestionsPanel() {
  return (
    <div className="rounded-xl bg-card p-4 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Next Best Actions</h3>
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group rounded-lg border border-border bg-background p-3 hover:border-primary/50 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <suggestion.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{suggestion.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs font-medium text-green-600">{suggestion.impact}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-primary hover:bg-primary/10 gap-1"
                  >
                    {suggestion.action}
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg bg-accent/30 border border-accent">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">Progress Tip</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Completing your top 2 actions this week could move you up 5 spots in the leaderboard.
        </p>
      </div>
    </div>
  );
}