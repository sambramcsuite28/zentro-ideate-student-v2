import { useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Lightbulb, Briefcase, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WorkItem {
  id: string;
  type: "idea" | "challenge" | "project" | "resume";
  title: string;
  status: string;
  statusVariant: "default" | "secondary" | "outline";
  lastTouched: string;
  industryLinked?: string;
}

const workItems: WorkItem[] = [
  {
    id: "1",
    type: "idea",
    title: "AI-powered Campus Navigation",
    status: "Clarifying",
    statusVariant: "secondary",
    lastTouched: "Reviewed 2 hours ago",
  },
  {
    id: "2",
    type: "challenge",
    title: "Mahindra EV Charging Optimization",
    status: "Submitted",
    statusVariant: "default",
    lastTouched: "Reviewed yesterday",
    industryLinked: "Mahindra",
  },
  {
    id: "3",
    type: "project",
    title: "Final Year: Distributed Cache System",
    status: "In Progress",
    statusVariant: "secondary",
    lastTouched: "Reviewed 3 days ago",
  },
  {
    id: "4",
    type: "resume",
    title: "Technical Resume - SDE Roles",
    status: "Needs Review",
    statusVariant: "outline",
    lastTouched: "Reviewed 1 week ago",
  },
  {
    id: "5",
    type: "idea",
    title: "Smart Waste Management System",
    status: "Clarifying",
    statusVariant: "secondary",
    lastTouched: "Reviewed 2 days ago",
    industryLinked: "Municipal Corp",
  },
];

const typeIcons = {
  idea: Lightbulb,
  challenge: Briefcase,
  project: GraduationCap,
  resume: FileText,
};

export function ActiveWorkZone() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            My Ongoing Work
          </h2>
          <p className="text-sm text-muted-foreground">
            Your active ideas, challenges, and projects
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Horizontal Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {workItems.map((item, index) => {
          const Icon = typeIcons[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex w-[280px] shrink-0 flex-col justify-between rounded-xl bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <Badge variant={item.statusVariant} className="text-xs">
                    {item.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-medium leading-tight text-foreground line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.lastTouched}
                  </p>
                </div>
                {item.industryLinked && (
                  <Badge variant="outline" className="text-xs">
                    {item.industryLinked}
                  </Badge>
                )}
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="mt-4 w-full opacity-80 transition-opacity group-hover:opacity-100"
              >
                Continue
              </Button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
