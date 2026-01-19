import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, CheckCircle, Brain, GitBranch, TrendingUp, Award, Target, MessageSquare } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";

type ScoreType = "innovation" | "readiness";

interface ScoreBreakdown {
  projects: number;
  challenges: number;
  certifications: number;
  feedback: number;
  github: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  innovationScore: number;
  readinessScore: number;
  breakdown: ScoreBreakdown;
  badges: {
    type: "validated" | "mentored" | "fyp" | "github";
    label: string;
  }[];
  weeklyGain?: number;
  weeklyGainReadiness?: number;
  isCurrentUser?: boolean;
}

const entries: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Anjali R.",
    innovationScore: 912,
    readinessScore: 94,
    breakdown: { projects: 95, challenges: 88, certifications: 92, feedback: 85, github: 90 },
    badges: [
      { type: "validated", label: "Industry-Validated" },
      { type: "mentored", label: "Mentored" },
    ],
    weeklyGain: 12,
    weeklyGainReadiness: 2,
  },
  {
    rank: 2,
    name: "Arjun M.",
    innovationScore: 878,
    readinessScore: 82,
    breakdown: { projects: 85, challenges: 72, certifications: 65, feedback: 78, github: 90 },
    badges: [
      { type: "fyp", label: "Final-Year Project" },
      { type: "github", label: "GitHub Linked" },
    ],
    weeklyGain: 24,
    weeklyGainReadiness: 4,
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Pratyush S.",
    innovationScore: 865,
    readinessScore: 79,
    breakdown: { projects: 80, challenges: 85, certifications: 88, feedback: 70, github: 72 },
    badges: [
      { type: "validated", label: "3 Certs" },
    ],
    weeklyGain: 8,
    weeklyGainReadiness: 1,
  },
  {
    rank: 4,
    name: "Sneha K.",
    innovationScore: 842,
    readinessScore: 75,
    breakdown: { projects: 75, challenges: 70, certifications: 80, feedback: 82, github: 68 },
    badges: [
      { type: "mentored", label: "Mentored" },
    ],
  },
  {
    rank: 5,
    name: "Vikram T.",
    innovationScore: 821,
    readinessScore: 71,
    breakdown: { projects: 72, challenges: 68, certifications: 60, feedback: 65, github: 88 },
    badges: [
      { type: "github", label: "GitHub Linked" },
    ],
    weeklyGain: 15,
    weeklyGainReadiness: 3,
  },
  {
    rank: 6,
    name: "Priya D.",
    innovationScore: 798,
    readinessScore: 68,
    breakdown: { projects: 70, challenges: 65, certifications: 55, feedback: 72, github: 78 },
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

const breakdownLabels = [
  { key: "projects", label: "Projects", icon: CheckCircle },
  { key: "challenges", label: "Challenges", icon: Target },
  { key: "certifications", label: "Certifications", icon: Award },
  { key: "feedback", label: "Feedback", icon: MessageSquare },
  { key: "github", label: "GitHub", icon: GitBranch },
];

const RankingList = () => {
  const [scoreType, setScoreType] = useState<ScoreType>("innovation");
  const [yearFilter, setYearFilter] = useState<"all" | "final">("all");

  const getScore = (entry: LeaderboardEntry) => {
    return scoreType === "innovation" ? entry.innovationScore : entry.readinessScore;
  };

  const getWeeklyGain = (entry: LeaderboardEntry) => {
    return scoreType === "innovation" ? entry.weeklyGain : entry.weeklyGainReadiness;
  };

  const sortedEntries = [...entries].sort((a, b) => getScore(b) - getScore(a));

  return (
    <div className="rounded-xl bg-card shadow-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-display font-semibold text-foreground">
            Campus Rankings
          </h3>
          <div className="flex flex-wrap gap-2">
            {/* Score Type Toggle */}
            <div className="flex rounded-lg bg-muted p-1">
              <button
                onClick={() => setScoreType("innovation")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  scoreType === "innovation"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Innovation
              </button>
              <button
                onClick={() => setScoreType("readiness")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  scoreType === "readiness"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Readiness
              </button>
            </div>
            {/* Year Filter */}
            <div className="flex gap-1">
              <button
                onClick={() => setYearFilter("all")}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  yearFilter === "all"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                All Years
              </button>
              <button
                onClick={() => setYearFilter("final")}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  yearFilter === "final"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                Final-years
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        <AnimatePresence mode="popLayout">
          {sortedEntries.map((entry, index) => {
            const weeklyGain = getWeeklyGain(entry);
            return (
              <motion.div
                key={entry.name}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: index * 0.03 }}
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
                      index < 3 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    }`}>
                      #{index + 1}
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
                    <div className="flex gap-1 mt-1 flex-wrap">
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

                {/* Score & Change with Hover Breakdown */}
                <div className="flex items-center gap-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="text-right cursor-pointer">
                        <p className="font-display font-semibold text-foreground">
                          {scoreType === "innovation" ? getScore(entry) : `${getScore(entry)}%`}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {scoreType === "innovation" ? "Innovation Score" : "Readiness Score"}
                        </p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 p-4" align="end">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            Score Breakdown
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {entry.name}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {breakdownLabels.map((item) => {
                            const Icon = item.icon;
                            const value = entry.breakdown[item.key as keyof ScoreBreakdown];
                            return (
                              <div key={item.key} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <Icon className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-foreground">{item.label}</span>
                                  </div>
                                  <span className="text-xs font-medium text-foreground">{value}%</span>
                                </div>
                                <Progress value={value} className="h-1.5" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  
                  {weeklyGain && weeklyGain > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-success/10"
                    >
                      <ChevronUp className="h-3 w-3 text-success" />
                      <span className="text-xs font-medium text-success">
                        +{weeklyGain}{scoreType === "readiness" ? "%" : ""}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RankingList;
