import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, TrendingUp, Target, GitBranch, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Suggestion {
  id: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  description: string;
  impact: string;
  marginalGain: number;
  action: string;
  actionLink?: string;
}
const suggestions: Suggestion[] = [{
  id: "1",
  icon: Target,
  title: "Complete Mahindra AI Challenge",
  description: "You're 80% done with your submission. Finishing it could boost your score.",
  impact: "+35 Innovation Score",
  marginalGain: 35,
  action: "Resume Challenge"
}, {
  id: "2",
  icon: GitBranch,
  title: "Link GitHub Repository",
  description: "Connect your recent ML project to showcase your technical skills.",
  impact: "+18 Innovation Score",
  marginalGain: 18,
  action: "Link Repository"
}, {
  id: "3",
  icon: Award,
  title: "Upload AWS Certification",
  description: "Adding your AWS Cloud Practitioner cert increases industry readiness.",
  impact: "+8% Readiness",
  marginalGain: 8,
  action: "Upload Certificate"
}, {
  id: "4",
  icon: CheckCircle,
  title: "Request Project Validation",
  description: "Your campus navigation project is ready for industry validation.",
  impact: "+25 Innovation Score",
  marginalGain: 25,
  action: "Request Validation"
}];
export function SuggestionsPanel() {
  return;
}