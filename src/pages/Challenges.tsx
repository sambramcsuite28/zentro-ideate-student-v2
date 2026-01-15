import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Briefcase, Clock, Users, Award, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Challenge {
  id: string;
  title: string;
  host: string;
  intent: string;
  domain: string;
  status: "Open" | "Submitted" | "Evaluated";
  deadline?: string;
  reward?: string;
  participants: number;
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "EV Charging Network Optimization",
    host: "Mahindra",
    intent: "Design an algorithm to optimize charging station placement in urban areas",
    domain: "AI/ML",
    status: "Open",
    deadline: "15 days left",
    reward: "PPI + ₹50,000",
    participants: 234,
  },
  {
    id: "2",
    title: "Sustainable Supply Chain Tracker",
    host: "Infosys",
    intent: "Build a blockchain-based solution for tracking carbon footprint",
    domain: "Climate",
    status: "Submitted",
    reward: "Internship",
    participants: 156,
  },
  {
    id: "3",
    title: "Rural Banking Accessibility",
    host: "HDFC Bank",
    intent: "Create an offline-first mobile banking experience",
    domain: "Fintech",
    status: "Open",
    deadline: "8 days left",
    reward: "₹1,00,000",
    participants: 89,
  },
  {
    id: "4",
    title: "Predictive Healthcare Analytics",
    host: "Apollo Hospitals",
    intent: "Develop models for early disease detection from patient data",
    domain: "Healthcare",
    status: "Evaluated",
    reward: "Research Grant",
    participants: 312,
  },
];

const domains = ["All", "AI/ML", "Fintech", "Climate", "Healthcare", "Blockchain"];

const statusColors: Record<string, string> = {
  Open: "bg-success/10 text-success border-success/20",
  Submitted: "bg-info/10 text-info border-info/20",
  Evaluated: "bg-muted text-muted-foreground border-border",
};

const Challenges = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Challenges
            </h1>
            <p className="text-muted-foreground">
              Curated problem statements from industry and research
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Domain Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {domains.map((domain, index) => (
            <Button
              key={domain}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {domain}
            </Button>
          ))}
        </div>

        {/* Challenges List */}
        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-xl bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Title and Host */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display font-semibold text-foreground">
                        {challenge.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={statusColors[challenge.status]}
                      >
                        {challenge.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-primary font-medium">
                      {challenge.host}
                    </p>
                  </div>

                  {/* Intent */}
                  <p className="text-sm text-muted-foreground">
                    {challenge.intent}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" />
                      {challenge.domain}
                    </span>
                    {challenge.deadline && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {challenge.deadline}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {challenge.participants} participants
                    </span>
                    {challenge.reward && (
                      <span className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5" />
                        {challenge.reward}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Challenges;
