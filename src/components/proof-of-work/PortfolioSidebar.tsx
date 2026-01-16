import { motion } from "framer-motion";
import { 
  Github, 
  Award, 
  FolderOpen, 
  BarChart3, 
  ExternalLink,
  Download,
  Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PortfolioItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subtext: string;
  linkable?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    icon: Github,
    label: "GitHub Linked",
    value: "Synced 2d ago",
    subtext: "3 pinned repos",
    linkable: true,
  },
  {
    icon: Award,
    label: "Certifications",
    value: "3 uploaded",
    subtext: "Deloitte, Oracle, AWS",
  },
  {
    icon: FolderOpen,
    label: "Projects Public",
    value: "5 total",
    subtext: "2 with validation",
  },
  {
    icon: BarChart3,
    label: "Industry Score",
    value: "78% Ready",
    subtext: "Based on last 90 days",
  },
];

const PortfolioSidebar = () => {
  return (
    <div className="space-y-4">
      {/* Portfolio Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-xl bg-card p-5 shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-foreground">
            Portfolio Snapshot
          </h3>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
            <Pencil className="h-3 w-3" />
            Edit Links
          </Button>
        </div>

        <div className="space-y-4">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 group"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                <item.icon className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  {item.linkable && (
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {item.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Score Progress */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">
              Industry Readiness
            </span>
            <span className="text-xs font-semibold text-primary">78%</span>
          </div>
          <Progress value={78} className="h-2" />
          <p className="mt-2 text-[10px] text-muted-foreground">
            ↑ Complete 1 mentored project to reach 85%
          </p>
        </div>
      </motion.div>

      {/* Export CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-primary p-4 shadow-card"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-primary-foreground">
              Export Portfolio
            </p>
            <p className="text-xs text-primary-foreground/70">
              Generate Certified Idea Trajectory
            </p>
          </div>
          <Button 
            size="sm" 
            variant="secondary"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            CIT
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioSidebar;
