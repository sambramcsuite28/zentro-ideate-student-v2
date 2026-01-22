import { motion } from "framer-motion";
import { Users, Target, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Peer Standing Data
const peerRanking = {
  rank: 28,
  total: 100,
  position: 14, // actual position out of 50 students
  totalStudents: 50,
};

export function ProgressPulse() {
  const percentile = peerRanking.rank;
  
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
            {/* Vertical Bar Ranking */}
            <div className="relative flex h-16 w-8 flex-col justify-end rounded-md bg-secondary overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${100 - percentile}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full bg-primary rounded-t-sm"
              />
              {/* Position marker */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary-foreground shadow-sm"
                style={{ bottom: `${100 - percentile}%` }}
              />
            </div>
            {/* Ranking labels */}
            <div className="flex flex-col justify-between h-16 text-[10px] text-muted-foreground">
              <span>Top</span>
              <span>Bottom</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold text-foreground">
                Rank #{peerRanking.position}
              </p>
              <p className="text-xs text-muted-foreground">
                Top {percentile}% of {peerRanking.totalStudents} peers
              </p>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-[10px] text-primary font-medium">↑ 3 spots this week</span>
              </div>
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
