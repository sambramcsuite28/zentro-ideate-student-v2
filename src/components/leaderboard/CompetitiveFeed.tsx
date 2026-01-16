import { motion } from "framer-motion";
import { 
  Github, 
  Trophy, 
  Briefcase, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedItem {
  id: string;
  type: "peer" | "challenge" | "opportunity";
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  timestamp: string;
}

const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "peer",
    message: "A peer in your percentile just linked their GitHub — +18 score",
    action: {
      label: "Link GitHub",
      onClick: () => {},
    },
    timestamp: "2h ago",
  },
  {
    id: "2",
    type: "challenge",
    message: "2 classmates joined the Mahindra AI Challenge — you haven't",
    action: {
      label: "Join Challenge",
      onClick: () => {},
    },
    timestamp: "5h ago",
  },
  {
    id: "3",
    type: "opportunity",
    message: "Students who validated 2+ projects got shortlisted by Deloitte",
    timestamp: "1d ago",
  },
  {
    id: "4",
    type: "peer",
    message: "Top 10% students completed 3 industry challenges on average",
    timestamp: "2d ago",
  },
];

const typeStyles = {
  peer: {
    icon: Github,
    dot: "bg-success",
  },
  challenge: {
    icon: Trophy,
    dot: "bg-warning",
  },
  opportunity: {
    icon: Briefcase,
    dot: "bg-primary",
  },
};

const CompetitiveFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl bg-card p-5 shadow-card"
    >
      <h3 className="font-display font-semibold text-foreground mb-4">
        Your Competitive Feed
      </h3>

      <div className="space-y-3">
        {feedItems.map((item, index) => {
          const { icon: Icon, dot } = typeStyles[item.type];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${dot} shrink-0 mt-2`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed">
                  {item.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.timestamp}
                </p>
              </div>

              {item.action && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="shrink-0 text-xs h-7 gap-1"
                >
                  {item.action.label}
                  <ArrowRight className="h-3 w-3" />
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CompetitiveFeed;
