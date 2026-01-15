import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  GitBranch, 
  FileCheck, 
  ExternalLink, 
  Download, 
  Lightbulb,
  CheckCircle,
  Circle,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineItem {
  id: string;
  type: "idea" | "prototype" | "validation" | "certification";
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
  linkedArtifact?: {
    type: "github" | "leetcode" | "certificate";
    url: string;
    label: string;
  };
}

const timeline: TimelineItem[] = [
  {
    id: "1",
    type: "idea",
    title: "AI Campus Navigation System",
    description: "Initial concept for indoor positioning using WiFi fingerprinting",
    date: "Jan 2025",
    status: "completed",
    linkedArtifact: {
      type: "github",
      url: "#",
      label: "View Repository",
    },
  },
  {
    id: "2",
    type: "prototype",
    title: "WiFi Signal Mapping MVP",
    description: "Functional prototype mapping 3 buildings on campus",
    date: "Feb 2025",
    status: "completed",
    linkedArtifact: {
      type: "github",
      url: "#",
      label: "Demo Branch",
    },
  },
  {
    id: "3",
    type: "validation",
    title: "User Testing with 50 Students",
    description: "Collected feedback, achieved 78% accuracy on navigation",
    date: "Mar 2025",
    status: "in-progress",
  },
  {
    id: "4",
    type: "certification",
    title: "AWS Cloud Practitioner",
    description: "Cloud infrastructure certification",
    date: "Dec 2024",
    status: "completed",
    linkedArtifact: {
      type: "certificate",
      url: "#",
      label: "View Certificate",
    },
  },
  {
    id: "5",
    type: "idea",
    title: "Distributed Cache System",
    description: "Final year project - Building a Redis-like distributed cache",
    date: "Nov 2024",
    status: "in-progress",
    linkedArtifact: {
      type: "github",
      url: "#",
      label: "View Repository",
    },
  },
];

const typeIcons = {
  idea: Lightbulb,
  prototype: GitBranch,
  validation: FileCheck,
  certification: Award,
};

const statusIcons = {
  completed: CheckCircle,
  "in-progress": Circle,
  pending: Circle,
};

const ProofOfWork = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Proof-of-Work
            </h1>
            <p className="text-muted-foreground">
              Your real-world technical journey, documented
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CIT
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Ideas Started", value: 8 },
            { label: "Prototypes Built", value: 4 },
            { label: "Validations Complete", value: 2 },
            { label: "Certifications", value: 3 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-card p-4 shadow-card"
            >
              <p className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {timeline.map((item, index) => {
              const TypeIcon = typeIcons[item.type];
              const StatusIcon = statusIcons[item.status];
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex gap-6 pl-12"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card border">
                    <TypeIcon className="h-4 w-4 text-primary" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 rounded-xl bg-card p-5 shadow-card">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusIcon
                            className={`h-4 w-4 ${
                              item.status === "completed"
                                ? "text-success fill-success"
                                : item.status === "in-progress"
                                ? "text-warning"
                                : "text-muted-foreground"
                            }`}
                          />
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">
                            {item.type}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          {item.date}
                        </p>
                      </div>

                      {item.linkedArtifact && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 shrink-0"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {item.linkedArtifact.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProofOfWork;
