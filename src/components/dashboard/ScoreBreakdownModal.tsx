import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, GitBranch, Award, MessageSquare, Target, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ScoreBreakdownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const scoreComponents = [
  { name: "Validated Projects", score: 85, max: 100, weight: 25, icon: CheckCircle, color: "bg-primary" },
  { name: "Challenge Participation", score: 72, max: 100, weight: 20, icon: Target, color: "bg-warning" },
  { name: "Technical Certifications", score: 65, max: 100, weight: 15, icon: Award, color: "bg-info" },
  { name: "Industry Feedback", score: 78, max: 100, weight: 20, icon: MessageSquare, color: "bg-success" },
  { name: "GitHub Activity", score: 90, max: 100, weight: 20, icon: GitBranch, color: "bg-purple-500" },
];

const historicalData = [
  { week: "W1", innovation: 720, readiness: 65 },
  { week: "W2", innovation: 745, readiness: 68 },
  { week: "W3", innovation: 780, readiness: 72 },
  { week: "W4", innovation: 810, readiness: 75 },
  { week: "W5", innovation: 845, readiness: 78 },
  { week: "W6", innovation: 878, readiness: 82 },
];

export function ScoreBreakdownModal({ open, onOpenChange }: ScoreBreakdownModalProps) {
  const totalScore = scoreComponents.reduce(
    (acc, comp) => acc + (comp.score * comp.weight) / 100,
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            Score Breakdown
            <span className="text-sm font-normal text-muted-foreground">
              Last updated: Today
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
              <span className="text-xs font-medium text-muted-foreground">Innovation Score</span>
              <p className="font-display text-2xl font-bold text-foreground">878</p>
              <div className="flex items-center gap-1 mt-1 text-success">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">+24 this week</span>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-success/10 to-success/5 p-4 border border-success/20">
              <span className="text-xs font-medium text-muted-foreground">Industry Readiness</span>
              <p className="font-display text-2xl font-bold text-foreground">82%</p>
              <div className="flex items-center gap-1 mt-1 text-success">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">+4% this month</span>
              </div>
            </div>
          </div>

          {/* Component Breakdown */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Score Components
            </h4>
            <div className="space-y-4">
              {scoreComponents.map((component, index) => {
                const Icon = component.icon;
                return (
                  <motion.div
                    key={component.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${component.color}/10`}>
                          <Icon className={`h-4 w-4 text-foreground`} />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {component.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({component.weight}% weight)
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {component.score}/{component.max}
                      </span>
                    </div>
                    <Progress value={component.score} className="h-2" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Historical Trend */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Historical Trend (Last 6 Weeks)
            </h4>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    domain={[600, 1000]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="innovation"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 0 }}
                    name="Innovation Score"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="readiness"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 0 }}
                    name="Readiness %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Innovation Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Industry Readiness</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
