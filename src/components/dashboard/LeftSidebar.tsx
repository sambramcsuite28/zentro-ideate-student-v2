import { motion } from "framer-motion";
import { TrendingUp, Award, Users, Zap, Target, Briefcase, ArrowRight, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const innovationScore = 878;
const industryReadinessScore = 82;
const peerRank = 14;
const totalPeers = 50;
const weeklyGain = 24;

export function LeftSidebar() {
  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card overflow-hidden shadow-card"
      >
        {/* Banner */}
        <div className="h-16 bg-gradient-to-r from-primary/20 to-primary/5" />
        
        {/* Profile Info */}
        <div className="px-4 pb-4 -mt-8">
          <Avatar className="h-14 w-14 border-4 border-card">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">A</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-foreground mt-2">Arjun Kumar</h3>
          <p className="text-xs text-muted-foreground">Computer Science • 3rd Year</p>
          <p className="text-xs text-muted-foreground">VIT University, Vellore</p>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-border/50 px-4 py-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Profile views</span>
            <span className="font-semibold text-primary">142</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-muted-foreground">Project impressions</span>
            <span className="font-semibold text-primary">89</span>
          </div>
        </div>
      </motion.div>

      {/* Innovation Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <span className="text-xs text-muted-foreground">Innovation Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-foreground">{innovationScore}</span>
              <span className="text-xs text-success flex items-center gap-0.5">
                <ChevronUp className="h-3 w-3" />
                +{weeklyGain}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground flex items-center justify-between">
          <span>Rank #{peerRank} of {totalPeers}</span>
          <span className="text-primary">Top {Math.round((peerRank / totalPeers) * 100)}%</span>
        </div>
      </motion.div>

      {/* Industry Readiness */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Award className="h-4 w-4 text-success" />
          </div>
          <div className="flex-1">
            <span className="text-xs text-muted-foreground">Industry Readiness</span>
            <span className="text-xl font-bold text-foreground block">{industryReadinessScore}%</span>
          </div>
        </div>
        <Progress value={industryReadinessScore} className="h-1.5" />
        <p className="text-xs text-muted-foreground mt-2">+8% from last month</p>
      </motion.div>

      {/* Peer Standing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Peer Standing</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Vertical Bar */}
          <div className="relative h-20 w-6 rounded-md bg-secondary overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${((totalPeers - peerRank + 1) / totalPeers) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-0 w-full bg-primary rounded-t-sm"
            />
            <div 
              className="absolute left-0 right-0 h-0.5 bg-primary-foreground"
              style={{ bottom: `${((totalPeers - peerRank + 1) / totalPeers) * 100}%` }}
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">Rank #{peerRank}</p>
            <p className="text-xs text-muted-foreground">of {totalPeers} peers</p>
            <p className="text-xs text-success mt-1">↑ 3 spots this week</p>
          </div>
        </div>
      </motion.div>

      {/* Recommended Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recommended</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
            <span className="font-bold text-accent-foreground">M</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">AI in Manufacturing</p>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              1 match this week
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-between text-primary hover:bg-primary/5">
          Explore Now
          <ArrowRight className="h-3 w-3" />
        </Button>
      </motion.div>
    </div>
  );
}