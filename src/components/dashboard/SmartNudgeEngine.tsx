import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Compass, Award, GitBranch, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  id: string;
  icon: React.ReactNode;
  text: string;
  action?: string;
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    icon: <Compass className="h-4 w-4" />,
    text: "Students in your percentile are exploring these 2 challenges",
    action: "View challenges",
  },
  {
    id: "2",
    icon: <Award className="h-4 w-4" />,
    text: "You're missing industry validation — try this bounty",
    action: "Explore bounty",
  },
  {
    id: "3",
    icon: <GitBranch className="h-4 w-4" />,
    text: "No GitHub proof attached — connect your repository",
    action: "Connect GitHub",
  },
];

export function SmartNudgeEngine() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-3 flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            Smart Suggestions
          </h2>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-lg bg-accent/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{suggestion.icon}</div>
                    <p className="text-sm text-foreground">{suggestion.text}</p>
                  </div>
                  {suggestion.action && (
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      {suggestion.action}
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
