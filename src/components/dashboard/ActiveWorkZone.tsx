import { motion } from "framer-motion";
import { FileText, Lightbulb, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkItem {
  id: string;
  type: "idea" | "challenge" | "project" | "resume";
  title: string;
  status: string;
  lastTouched: string;
  actionLabel: string;
  actionTime: string;
}

const workItems: WorkItem[] = [
  {
    id: "1",
    type: "idea",
    title: "AI-powered Campus Navigation",
    status: "Clarifying problem statement",
    lastTouched: "2 hours ago",
    actionLabel: "Continue",
    actionTime: "3 min",
  },
  {
    id: "2",
    type: "challenge",
    title: "Mahindra EV Charging Optimization",
    status: "Submitted to Mahindra",
    lastTouched: "Yesterday",
    actionLabel: "Refine",
    actionTime: "5 min",
  },
  {
    id: "3",
    type: "project",
    title: "Final Year: Distributed Cache System",
    status: "Literature review phase",
    lastTouched: "3 days ago",
    actionLabel: "Continue",
    actionTime: "10 min",
  },
  {
    id: "4",
    type: "resume",
    title: "Technical Resume - SDE Roles",
    status: "Missing project descriptions",
    lastTouched: "1 week ago",
    actionLabel: "Refine",
    actionTime: "8 min",
  },
];

const typeIcons = {
  idea: Lightbulb,
  challenge: Briefcase,
  project: GraduationCap,
  resume: FileText,
};

export function ActiveWorkZone() {
  return (
    <section className="w-full">
      <div className="mb-4">
        <h2 className="font-display text-xl font-semibold text-foreground">
          My Ongoing Work
        </h2>
        <p className="text-sm text-muted-foreground">
          Your active ideas, challenges, and projects
        </p>
      </div>
      
      <div className="grid gap-3">
        {workItems.map((item, index) => {
          const Icon = typeIcons[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center justify-between rounded-xl bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.status}</p>
                  <p className="text-xs text-muted-foreground/70">
                    Last touched {item.lastTouched}
                  </p>
                </div>
              </div>
              
              <Button
                variant="secondary"
                size="sm"
                className="shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
              >
                {item.actionLabel} ({item.actionTime})
              </Button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
