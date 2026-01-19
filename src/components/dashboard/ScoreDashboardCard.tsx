import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, Users, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { ScoreBreakdownModal } from "./ScoreBreakdownModal";
const radarData = [{
  subject: "Projects",
  score: 85,
  fullMark: 100
}, {
  subject: "Challenges",
  score: 72,
  fullMark: 100
}, {
  subject: "Certs",
  score: 65,
  fullMark: 100
}, {
  subject: "Feedback",
  score: 78,
  fullMark: 100
}, {
  subject: "GitHub",
  score: 90,
  fullMark: 100
}];
const innovationScore = 878;
const industryReadinessScore = 82;
const peerPercentile = 85;
export function ScoreDashboardCard() {
  const [showBreakdown, setShowBreakdown] = useState(false);
  return <>
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="bg-card p-6 shadow-card rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-foreground">
            Your Score Dashboard
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setShowBreakdown(true)} className="text-primary hover:text-primary/80 gap-1">
            View Details
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Score Cards */}
          <div className="space-y-4">
            {/* Innovation Score */}
            <motion.div whileHover={{
            scale: 1.02
          }} className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Innovation Score
                    </span>
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {innovationScore}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs font-medium">+24 this week</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">Rank</span>
                  <span className="font-display text-xl font-bold text-primary">#28</span>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
            </motion.div>

            {/* Industry Readiness Score */}
            <motion.div whileHover={{
            scale: 1.02
          }} className="relative overflow-hidden rounded-lg bg-gradient-to-br from-success/10 to-success/5 p-4 border border-success/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-success" />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Industry Readiness
                    </span>
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {industryReadinessScore}%
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full bg-success" initial={{
                    width: 0
                  }} animate={{
                    width: `${industryReadinessScore}%`
                  }} transition={{
                    delay: 0.3,
                    duration: 0.8
                  }} />
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-success/5 rounded-full blur-2xl" />
            </motion.div>

            {/* Peer Percentile */}
            <motion.div whileHover={{
            scale: 1.02
          }} className="rounded-lg bg-accent/50 p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Peer Percentile
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-xl font-bold text-foreground">
                      Top {100 - peerPercentile}%
                    </span>
                    <span className="text-xs text-muted-foreground">of campus</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Radar Chart */}
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground mb-2 text-center">
              Component Breakdown
            </span>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 11
                }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10
                }} />
                  <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>

      <ScoreBreakdownModal open={showBreakdown} onOpenChange={setShowBreakdown} />
    </>;
}