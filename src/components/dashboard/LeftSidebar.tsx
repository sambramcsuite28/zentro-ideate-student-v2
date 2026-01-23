import { motion } from "framer-motion";
import { Eye, User, TrendingUp, Users, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const peerRank = 14;
const totalPeers = 50;

interface Viewer {
  name: string;
  role: string;
  timestamp: string;
}

const viewers: Viewer[] = [
  {
    name: "Dr. Sharma",
    role: "Innovation Cell",
    timestamp: "2 days ago",
  },
  {
    name: "Mahindra Reviewer",
    role: "Challenge Evaluator",
    timestamp: "1 week ago",
  },
  {
    name: "Prof. Verma",
    role: "Faculty Mentor",
    timestamp: "3 days ago",
  },
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

        {/* Peer Standing - Compact */}
        <div className="border-t border-border/50 px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Peer Standing</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Vertical Bar */}
            <div className="relative h-14 w-4 rounded-sm bg-secondary overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${((totalPeers - peerRank + 1) / totalPeers) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-0 w-full bg-primary rounded-t-sm"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Rank #{peerRank}</p>
              <p className="text-[10px] text-muted-foreground">of {totalPeers} peers</p>
              <p className="text-[10px] text-success flex items-center gap-0.5">
                <ChevronUp className="h-2.5 w-2.5" />
                3 spots this week
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Eyes On Your Work - Key Productivity Element */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Eyes on Your Work</h3>
        </div>
        
        {/* Project Views */}
        <div className="space-y-2 mb-4">
          {eyesOnProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
            >
              <span className="text-xs text-foreground truncate flex-1 pr-2">{project.title}</span>
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
        
        <div className="pt-3 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground mb-2">Who viewed your work</p>
          <div className="space-y-2">
            {viewers.map((viewer, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
                  <User className="h-3 w-3 text-secondary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {viewer.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {viewer.role}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground/70 shrink-0">
                  {viewer.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-[10px] text-primary font-medium mt-3 text-center">
          105 total views this week
        </p>
      </motion.div>
    </div>
  );
}
