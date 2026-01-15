import { motion } from "framer-motion";
import { Users, Target, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Peer Standing Card Data
const peerData = [
  { name: "You", value: 28 },
  { name: "Others", value: 72 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))"];

export function ProgressPulse() {
  return (
    <section className="w-full">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Peer Standing Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="flex flex-col rounded-xl bg-card p-5 shadow-card"
          style={{ maxHeight: "160px" }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Peer Standing
            </span>
          </div>
          <div className="flex flex-1 items-center gap-4">
            <div className="h-16 w-16 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={peerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={18}
                    outerRadius={28}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {peerData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-foreground">
                Top 28%
              </p>
              <p className="text-xs text-muted-foreground">
                Compared to department peers
              </p>
            </div>
          </div>
        </motion.div>

        {/* Challenge Momentum Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col rounded-xl bg-card p-5 shadow-card"
          style={{ maxHeight: "160px" }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Challenge Momentum
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-foreground">
                2 of 4
              </span>
              <span className="text-xs text-muted-foreground">submitted</span>
            </div>
            {/* Progress bar with milestone markers */}
            <div className="relative">
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: "50%" }}
                />
              </div>
              {/* Milestone dots */}
              <div className="absolute -top-0.5 left-0 flex w-full justify-between px-0">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-full border-2 border-card ${
                      i < 2 ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Proof-ready challenges completed
            </p>
          </div>
        </motion.div>

        {/* Recommended Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col rounded-xl bg-card p-5 shadow-card"
          style={{ maxHeight: "160px" }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Recommended Challenge
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <span className="text-xs font-bold">M</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  AI in Manufacturing
                </p>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  1 match this week
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-fit gap-1 px-0 text-primary hover:bg-transparent hover:text-primary/80"
            >
              Explore Now
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
