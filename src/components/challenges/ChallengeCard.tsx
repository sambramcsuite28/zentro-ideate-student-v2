import { motion } from "framer-motion";
import { Clock, Users, Award, ChevronRight, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface Challenge {
  id: string;
  title: string;
  host: string;
  hostLogo?: string;
  intent: string;
  domain: string;
  status: "Open" | "In Progress" | "Submitted" | "Evaluated";
  deadline?: string;
  reward?: string;
  participants: number;
  progress?: number;
}

const statusColors: Record<string, string> = {
  "Open": "bg-success/10 text-success border-success/30",
  "In Progress": "bg-primary/10 text-primary border-primary/30",
  "Submitted": "bg-info/10 text-info border-info/30",
  "Evaluated": "bg-muted text-muted-foreground border-border",
};

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  showProgress?: boolean;
}

export const ChallengeCard = ({ challenge, index, showProgress = false }: ChallengeCardProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
    >
      {/* Status Badge - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="outline" className={statusColors[challenge.status]}>
          {challenge.status}
        </Badge>
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="font-display font-semibold text-lg text-foreground mb-3 pr-24 leading-snug">
          {challenge.title}
        </h3>

        {/* Host with Logo */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">{challenge.host}</p>
            {challenge.reward && (
              <p className="text-sm text-primary font-medium flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                {challenge.reward}
              </p>
            )}
          </div>
        </div>

        {/* Intent/Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {challenge.intent}
        </p>

        {/* Progress Bar (for My Challenges) */}
        {showProgress && challenge.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Submission Progress</span>
              <span className="text-foreground font-medium">{challenge.progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
          {challenge.deadline && (
            <span className="flex items-center gap-1.5 px-2 py-1 bg-secondary/50 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              {challenge.deadline}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {challenge.participants} joined
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {challenge.domain}
          </Badge>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto p-4 pt-0">
        <Button 
          variant="ghost" 
          className="w-full justify-between group-hover:bg-primary/5"
          onClick={() => navigate(`/challenges/${challenge.id}`)}
        >
          View Details
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};
