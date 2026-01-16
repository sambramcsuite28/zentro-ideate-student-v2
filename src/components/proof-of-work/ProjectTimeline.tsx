import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ExternalLink, 
  Github, 
  FileCheck,
  MessageSquare,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Stage {
  name: string;
  date: string;
  completed: boolean;
}

interface Project {
  id: string;
  title: string;
  stages: Stage[];
  description: string;
  links: {
    github?: string;
    certificate?: string;
    feedback?: string;
  };
  lastUpdate: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "AI Campus Navigation",
    stages: [
      { name: "Idea", date: "Jan 2025", completed: true },
      { name: "Prototype", date: "Feb 2025", completed: true },
      { name: "Validation", date: "Mar 2025", completed: true },
      { name: "Outcome", date: "-", completed: false },
    ],
    description: "Indoor positioning system using WiFi fingerprinting for campus buildings. Achieved 78% accuracy with 50 student testers.",
    links: {
      github: "#",
      feedback: "#",
    },
    lastUpdate: "2 days ago",
  },
  {
    id: "2",
    title: "Distributed Cache System",
    stages: [
      { name: "Idea", date: "Nov 2024", completed: true },
      { name: "Prototype", date: "Dec 2024", completed: true },
      { name: "Validation", date: "-", completed: false },
      { name: "Outcome", date: "-", completed: false },
    ],
    description: "Redis-like distributed cache implementation for final year project. Focus on consistency and partition tolerance.",
    links: {
      github: "#",
    },
    lastUpdate: "1 week ago",
  },
  {
    id: "3",
    title: "Smart Waste Management",
    stages: [
      { name: "Idea", date: "Oct 2024", completed: true },
      { name: "Prototype", date: "-", completed: false },
      { name: "Validation", date: "-", completed: false },
      { name: "Outcome", date: "-", completed: false },
    ],
    description: "IoT-based waste bin monitoring system with ML-powered fill prediction.",
    links: {},
    lastUpdate: "3 weeks ago",
  },
];

const ProjectTimeline = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="space-y-6">
        <h2 className="font-display font-semibold text-lg text-foreground">
          Project Journey
        </h2>

        <div className="space-y-4">
          {projects.map((project, index) => {
            const completedStages = project.stages.filter(s => s.completed).length;
            const progress = (completedStages / project.stages.length) * 100;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                onClick={() => setSelectedProject(project)}
                className="rounded-xl bg-card p-5 shadow-card cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Updated {project.lastUpdate}
                  </span>
                </div>

                {/* Stage Progress Bar */}
                <div className="relative">
                  {/* Background Line */}
                  <div className="absolute top-3 left-0 right-0 h-0.5 bg-border" />
                  
                  {/* Progress Line */}
                  <motion.div 
                    className="absolute top-3 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                  />

                  {/* Stage Nodes */}
                  <div className="relative flex justify-between">
                    {project.stages.map((stage, stageIndex) => (
                      <motion.div
                        key={stage.name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.15 + stageIndex * 0.1 }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            stage.completed
                              ? "bg-primary border-primary"
                              : "bg-card border-border"
                          }`}
                        >
                          {stage.completed && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="mt-2 text-xs font-medium text-foreground">
                          {stage.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {stage.date}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Details Sheet */}
      <Sheet open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <SheetContent>
          {selectedProject && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">
                  {selectedProject.title}
                </SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <p className="text-sm text-muted-foreground">
                  {selectedProject.description}
                </p>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-foreground uppercase tracking-wide">
                    Progress
                  </p>
                  <div className="space-y-2">
                    {selectedProject.stages.map((stage) => (
                      <div
                        key={stage.name}
                        className="flex items-center justify-between py-2 border-b border-border/50"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              stage.completed ? "bg-success" : "bg-border"
                            }`}
                          />
                          <span className="text-sm text-foreground">
                            {stage.name}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {stage.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-medium text-foreground uppercase tracking-wide">
                    Links & Artifacts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.links.github && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <Github className="h-4 w-4" />
                        GitHub
                      </Button>
                    )}
                    {selectedProject.links.certificate && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileCheck className="h-4 w-4" />
                        Certificate
                      </Button>
                    )}
                    {selectedProject.links.feedback && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Feedback
                      </Button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last updated {selectedProject.lastUpdate}
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProjectTimeline;
