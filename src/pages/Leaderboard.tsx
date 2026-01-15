import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  score: number;
  change: "up" | "down" | "same";
  isCurrentUser?: boolean;
}

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Sharma", college: "IIT Delhi", score: 892, change: "same" },
  { rank: 2, name: "Rahul Kumar", college: "BITS Pilani", score: 856, change: "up" },
  { rank: 3, name: "Ananya Patel", college: "IIT Bombay", score: 834, change: "up" },
  { rank: 4, name: "Vikram Singh", college: "NIT Trichy", score: 798, change: "down" },
  { rank: 5, name: "Sneha Reddy", college: "IIIT Hyderabad", score: 776, change: "same" },
  { rank: 28, name: "Arjun Mehta", college: "VIT Vellore", score: 542, change: "up", isCurrentUser: true },
];

const Leaderboard = () => {
  const currentUser = leaderboard.find((e) => e.isCurrentUser);
  const topEntries = leaderboard.filter((e) => !e.isCurrentUser);

  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Non-gamified benchmarking against peers nationwide
          </p>
        </div>

        {/* Your Position Card */}
        {currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-xl bg-primary p-6 text-primary-foreground"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-display font-bold">
                    #{currentUser.rank}
                  </p>
                  <p className="text-sm opacity-80">Your Rank</p>
                </div>
                <div className="h-12 w-px bg-primary-foreground/20" />
                <div>
                  <p className="font-display font-semibold text-lg">
                    {currentUser.name}
                  </p>
                  <p className="text-sm opacity-80">{currentUser.college}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-display font-bold">
                  {currentUser.score}
                </p>
                <p className="text-sm opacity-80">Innovation Score</p>
              </div>
            </div>

            {/* Improvement Suggestion */}
            <div className="mt-6 rounded-lg bg-primary-foreground/10 p-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">To reach Top 10%</p>
                  <p className="text-sm opacity-80">
                    Complete a mentored project or win an industry challenge
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: "Active Students", value: "12,847" },
            { icon: TrendingUp, label: "Your Percentile", value: "72nd" },
            { icon: Target, label: "Points to Top 100", value: "256" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <stat.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-display font-semibold text-foreground">
              Top Performers
            </h2>
          </div>
          <div className="divide-y">
            {topEntries.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center">
                    <span className="font-display font-bold text-muted-foreground">
                      {entry.rank}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.college}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display font-semibold text-foreground">
                    {entry.score}
                  </span>
                  {entry.change === "up" && (
                    <ChevronUp className="h-4 w-4 text-success" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
