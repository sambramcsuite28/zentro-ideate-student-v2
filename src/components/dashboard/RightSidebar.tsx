import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, TrendingUp, Target, GitBranch, Award, CheckCircle, Trophy, Eye, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  impact: string;
  action: string;
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    icon: Target,
    title: "Complete Mahindra AI Challenge",
    impact: "+35 pts",
    action: "Resume",
  },
  {
    id: "2",
    icon: GitBranch,
    title: "Link GitHub Repository",
    impact: "+18 pts",
    action: "Link",
  },
  {
    id: "3",
    icon: Award,
    title: "Upload AWS Certification",
    impact: "+8% Readiness",
    action: "Upload",
  },
  {
    id: "4",
    icon: CheckCircle,
    title: "Request Project Validation",
    impact: "+25 pts",
    action: "Request",
  },
];

interface TrendingTopic {
  id: string;
  title: string;
  posts: number;
}

const trendingTopics: TrendingTopic[] = [
  { id: "1", title: "System Design Interview", posts: 234 },
  { id: "2", title: "LLM Fine-tuning", posts: 189 },
  { id: "3", title: "Edge Computing", posts: 156 },
  { id: "4", title: "Resume Tips", posts: 142 },
  { id: "5", title: "Hackathon Prep", posts: 128 },
];

interface EyesOnProject {
  id: string;
  title: string;
  views: number;
  trend: "up" | "down" | "stable";
}

const eyesOnProjects: EyesOnProject[] = [
  { id: "1", title: "Drone Detection System", views: 45, trend: "up" },
  { id: "2", title: "LRU Cache in Rust", views: 32, trend: "up" },
  { id: "3", title: "Mental Health Chatbot", views: 28, trend: "stable" },
];

export function RightSidebar() {
  return (
    <div className="space-y-4">
      {/* Next Best Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Next Best Actions</h3>
        </div>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors group cursor-pointer"
            >
              <div className="h-7 w-7 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
                <suggestion.icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{suggestion.title}</p>
                <span className="text-[10px] text-success">{suggestion.impact}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {suggestion.action}
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 p-2 rounded-lg bg-accent/30 border border-accent">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-medium text-foreground">Tip:</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Complete top 2 actions to move up 5 spots!
          </p>
        </div>
      </motion.div>

      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-semibold text-foreground">Trending Topics</h3>
        </div>
        <div className="space-y-2">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.id}
              className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0 hover:bg-accent/30 -mx-1 px-1 rounded cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-4">{index + 1}.</span>
                <span className="text-xs font-medium text-foreground">{topic.title}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{topic.posts} posts</span>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-2 text-xs text-primary">
          Show more
        </Button>
      </motion.div>

      {/* Eyes On Your Work */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Eyes on Your Work</h3>
        </div>
        <div className="space-y-2">
          {eyesOnProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between py-1.5"
            >
              <span className="text-xs text-foreground truncate flex-1">{project.title}</span>
              <div className="flex items-center gap-1 shrink-0">
                <Eye className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">{project.views}</span>
                {project.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-success" />
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          Total views this week: 105
        </p>
      </motion.div>

      {/* Leaderboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <h3 className="text-sm font-semibold text-foreground">Leaderboard</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <span className="text-xs font-bold text-yellow-600">1</span>
            <span className="text-xs font-medium text-foreground flex-1">Vikram P.</span>
            <span className="text-xs text-muted-foreground">1,245</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <span className="text-xs font-bold text-muted-foreground">2</span>
            <span className="text-xs font-medium text-foreground flex-1">Priya S.</span>
            <span className="text-xs text-muted-foreground">1,189</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <span className="text-xs font-bold text-muted-foreground">3</span>
            <span className="text-xs font-medium text-foreground flex-1">Aditya K.</span>
            <span className="text-xs text-muted-foreground">1,156</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
            <span className="text-xs font-bold text-primary">14</span>
            <span className="text-xs font-medium text-primary flex-1">You</span>
            <span className="text-xs text-primary">878</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-2 text-xs text-primary gap-1">
          View Full Leaderboard
          <ArrowRight className="h-3 w-3" />
        </Button>
      </motion.div>
    </div>
  );
}