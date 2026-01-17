import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, CheckCircle, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface MyChallenge {
  id: string;
  title: string;
  host: string;
  status: "In Progress" | "Submitted" | "Evaluated";
  progress?: number;
  deadline?: string;
  feedback?: string;
  lastActivity?: string;
}

const myChallenges: MyChallenge[] = [
  {
    id: "1",
    title: "EV Charging Network Optimization",
    host: "Mahindra",
    status: "In Progress",
    progress: 65,
    deadline: "15 days left",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    title: "Sustainable Supply Chain Tracker",
    host: "Infosys",
    status: "In Progress",
    progress: 30,
    deadline: "22 days left",
    lastActivity: "1 day ago",
  },
  {
    id: "3",
    title: "Rural Banking Accessibility",
    host: "HDFC Bank",
    status: "Submitted",
    lastActivity: "3 days ago",
  },
  {
    id: "4",
    title: "Predictive Healthcare Analytics",
    host: "Apollo Hospitals",
    status: "Evaluated",
    feedback: "Strong technical approach. Consider adding more user research.",
  },
];

const statusConfig = {
  "In Progress": { icon: Clock, color: "text-primary", bgColor: "bg-primary/10" },
  "Submitted": { icon: CheckCircle, color: "text-info", bgColor: "bg-info/10" },
  "Evaluated": { icon: MessageSquare, color: "text-success", bgColor: "bg-success/10" },
};

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const ExpandablePanel = ({ title, icon, count, children, defaultOpen = false }: PanelProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-foreground">{title}</span>
          <Badge variant="secondary" className="text-xs">{count}</Badge>
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MyChallengesPanel = () => {
  const navigate = useNavigate();
  
  const inProgress = myChallenges.filter(c => c.status === "In Progress");
  const submitted = myChallenges.filter(c => c.status === "Submitted");
  const evaluated = myChallenges.filter(c => c.status === "Evaluated");

  const renderChallengeCard = (challenge: MyChallenge) => {
    const config = statusConfig[challenge.status];
    const Icon = config.icon;

    return (
      <motion.div
        key={challenge.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/20 transition-all"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate mb-1">
              {challenge.title}
            </h4>
            <p className="text-sm text-muted-foreground">{challenge.host}</p>
            
            {challenge.progress !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">{challenge.progress}%</span>
                </div>
                <Progress value={challenge.progress} className="h-1.5" />
              </div>
            )}

            {challenge.feedback && (
              <p className="mt-3 text-xs text-muted-foreground bg-success/5 border border-success/20 rounded-lg p-2">
                💬 {challenge.feedback}
              </p>
            )}

            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              {challenge.deadline && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {challenge.deadline}
                </span>
              )}
              {challenge.lastActivity && (
                <span>Last updated: {challenge.lastActivity}</span>
              )}
            </div>
          </div>

          <Button 
            size="sm" 
            variant={challenge.status === "In Progress" ? "default" : "outline"}
            className="shrink-0"
            onClick={() => navigate(`/challenges/${challenge.id}`)}
          >
            {challenge.status === "In Progress" && "Resume"}
            {challenge.status === "Submitted" && "View"}
            {challenge.status === "Evaluated" && "Feedback"}
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-2xl font-bold text-primary">{myChallenges.length}</p>
          <p className="text-xs text-muted-foreground">Total Submissions</p>
        </div>
        <div className="p-4 rounded-xl bg-success/5 border border-success/20">
          <p className="text-2xl font-bold text-success">{evaluated.length}</p>
          <p className="text-xs text-muted-foreground">Feedbacks Received</p>
        </div>
        <div className="p-4 rounded-xl bg-info/5 border border-info/20">
          <p className="text-2xl font-bold text-info">{submitted.length}</p>
          <p className="text-xs text-muted-foreground">Awaiting Review</p>
        </div>
      </div>

      <ExpandablePanel 
        title="In Progress" 
        icon={<Clock className="h-5 w-5 text-primary" />}
        count={inProgress.length}
        defaultOpen={true}
      >
        {inProgress.map(renderChallengeCard)}
      </ExpandablePanel>

      <ExpandablePanel 
        title="Submitted" 
        icon={<CheckCircle className="h-5 w-5 text-info" />}
        count={submitted.length}
      >
        {submitted.map(renderChallengeCard)}
      </ExpandablePanel>

      <ExpandablePanel 
        title="Evaluated / Feedback Received" 
        icon={<MessageSquare className="h-5 w-5 text-success" />}
        count={evaluated.length}
      >
        {evaluated.map(renderChallengeCard)}
      </ExpandablePanel>
    </div>
  );
};
