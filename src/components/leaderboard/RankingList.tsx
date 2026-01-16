import { motion } from "framer-motion";
import { ChevronUp, CheckCircle, Brain, GitBranch } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  badges: {
    type: "validated" | "mentored" | "fyp" | "github";
    label: string;
  }[];
  weeklyGain?: number;
  isCurrentUser?: boolean;
}

const entries: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Anjali R.",
    score: 912,
    badges: [
      { type: "validated", label: "Industry-Validated" },
      { type: "mentored", label: "Mentored" },
    ],
    weeklyGain: 12,
  },
  {
    rank: 2,
    name: "Arjun M.",
    score: 878,
    badges: [
      { type: "fyp", label: "Final-Year Project" },
      { type: "github", label: "GitHub Linked" },
    ],
    weeklyGain: 24,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Pratyush S.",
    score: 865,
    badges: [
      { type: "validated", label: "3 Certs" },
    ],
    weeklyGain: 8,
  },
  {
    rank: 4,
    name: "Sneha K.",
    score: 842,
    badges: [
      { type: "mentored", label: "Mentored" },
    ],
  },
  {
    rank: 5,
    name: "Vikram T.",
    score: 821,
    badges: [
      { type: "github", label: "GitHub Linked" },
    ],
    weeklyGain: 15,
  },
  {
    rank: 6,
    name: "Priya D.",
    score: 798,
    badges: [
      { type: "fyp", label: "Final-Year Project" },
    ],
  },
];

const badgeIcons = {
  validated: CheckCircle,
  mentored: Brain,
  fyp: GitBranch,
  github: GitBranch,
};

const badgeColors = {
  validated: "bg-success/10 text-success",
  mentored: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  fyp: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  github: "bg-accent text-accent-foreground",
};

const RankingList = () => {
  return (
    <div className="rounded-xl bg-card shadow-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">
            Campus Rankings
          </h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
              All Years
            </button>
            <button className="px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
              Final-years
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center justify-between p-4 transition-colors ${
              entry.isCurrentUser 
                ? "bg-primary/5 border-l-2 border-l-primary" 
                : "hover:bg-secondary/50"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="w-10 text-center">
                <span className={`font-display font-bold ${
                  entry.rank <= 3 
                    ? "text-primary" 
                    : "text-muted-foreground"
                }`}>
                  #{entry.rank}
                </span>
              </div>

              {/* Name & Badges */}
              <div>
                <div className="flex items-center gap-2">
                  <p className={`font-medium ${
                    entry.isCurrentUser ? "text-primary" : "text-foreground"
                  }`}>
                    {entry.name}
                  </p>
                  {entry.isCurrentUser && (
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      You
                    </span>
                  )}
                </div>
                <div className="flex gap-1 mt-1">
                  {entry.badges.map((badge, i) => {
                    const Icon = badgeIcons[badge.type];
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full ${badgeColors[badge.type]}`}
                      >
                        <Icon className="h-2.5 w-2.5" />
                        {badge.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Score & Change */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-display font-semibold text-foreground">
                  {entry.score}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Innovation Score
                </p>
              </div>
              {entry.weeklyGain && (
                <div className="flex items-center gap-1 text-success">
                  <ChevronUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+{entry.weeklyGain}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RankingList;
