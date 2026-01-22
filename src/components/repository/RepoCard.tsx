import { motion } from "framer-motion";
import { Code, FileText, Star, GitFork, User, Calendar, Bookmark, Share2, ExternalLink, ArrowRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface RepoItem {
  id: string;
  title: string;
  author: string;
  authorId?: string;
  year: number;
  type: "project" | "paper" | "snippet";
  abstract: string;
  tags: string[];
  stars?: number;
  forks?: number;
  isOwner?: boolean;
  isPinned?: boolean;
  hasValidation?: boolean;
  githubUrl?: string;
}

const typeConfig = {
  project: { icon: Code, label: "Project", color: "bg-primary/10 text-primary border-primary/20" },
  paper: { icon: FileText, label: "Paper", color: "bg-accent text-accent-foreground border-accent" },
  snippet: { icon: Code, label: "Snippet", color: "bg-secondary text-secondary-foreground border-secondary" },
};

interface RepoCardProps {
  item: RepoItem;
  index: number;
  onBookmark?: (id: string) => void;
  onShare?: (id: string) => void;
  onCollaborate?: () => void;
}

export const RepoCard = ({ item, index, onBookmark, onShare, onCollaborate }: RepoCardProps) => {
  const navigate = useNavigate();
  const typeInfo = typeConfig[item.type];
  const TypeIcon = typeInfo.icon;

  const CURRENT_USER_ID = "current-user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
    >
      {/* Top Actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 bg-card/80 backdrop-blur-sm"
          onClick={() => onBookmark?.(item.id)}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 bg-card/80 backdrop-blur-sm"
          onClick={() => onShare?.(item.id)}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Pinned Indicator */}
      {item.isPinned && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
            📌 Pinned
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Type Badge */}
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className={`${typeInfo.color} font-medium`}>
            <TypeIcon className="h-3 w-3 mr-1" />
            {typeInfo.label}
          </Badge>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {item.stars !== undefined && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" />
                {item.stars}
              </span>
            )}
            {item.forks !== undefined && (
              <span className="flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" />
                {item.forks}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Abstract */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {item.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2.5 py-1 text-xs rounded-full bg-secondary text-muted-foreground">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        {/* Author & Year + Badges */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {item.authorId === CURRENT_USER_ID ? (
                <span className="text-primary font-medium">You</span>
              ) : (
                item.author
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {item.year}
            </span>
          </div>
          {item.authorId === CURRENT_USER_ID && (
            <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
              Authored by you
            </Badge>
          )}
          {item.hasValidation && item.authorId !== CURRENT_USER_ID && (
            <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
              ✓ Validated
            </Badge>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto p-4 pt-0 flex gap-2">
        <Button 
          variant="ghost" 
          className="flex-1 justify-between group-hover:bg-primary/5"
          onClick={() => navigate(`/repo/${item.id}`)}
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        {/* Collaborate button - only show for non-owned items */}
        {item.authorId !== CURRENT_USER_ID && onCollaborate && (
          <Button 
            variant="outline" 
            size="icon"
            onClick={onCollaborate}
            title="Request to collaborate"
          >
            <Users className="h-4 w-4" />
          </Button>
        )}
        {item.githubUrl && (
          <Button variant="outline" size="icon" asChild>
            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
};
