import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Building2, Clock, Users, Award, CheckCircle, 
  Upload, Github, Video, FileText, Lightbulb, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const challengeData = {
  id: "1",
  title: "EV Charging Network Optimization",
  host: "Mahindra",
  intent: "Design an AI-based algorithm to optimize charging station placement in urban areas, considering traffic patterns, grid capacity, and user accessibility.",
  domain: "AI/ML",
  status: "Open" as const,
  deadline: "15 days left",
  reward: "PPI + ₹50,000",
  participants: 234,
  requirements: [
    "Algorithm must handle real-time traffic data",
    "Support for multiple charging station types",
    "Cost optimization considering grid infrastructure",
    "Scalability to 100+ stations"
  ],
  milestones: [
    { id: 1, title: "Problem Understanding", completed: true },
    { id: 2, title: "Data Collection", completed: true },
    { id: 3, title: "Algorithm Design", completed: false },
    { id: 4, title: "Prototype Implementation", completed: false },
    { id: 5, title: "Testing & Validation", completed: false },
  ]
};

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [overview, setOverview] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [submissionProgress, setSubmissionProgress] = useState(40);

  const completedMilestones = challengeData.milestones.filter(m => m.completed).length;
  const totalMilestones = challengeData.milestones.length;

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2"
          onClick={() => navigate("/challenges")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Challenges
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-card border border-border/50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  {challengeData.status}
                </Badge>
                <Badge variant="secondary">{challengeData.domain}</Badge>
              </div>

              <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                {challengeData.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{challengeData.host}</p>
                  <p className="text-sm text-primary font-medium flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {challengeData.reward}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full">
                  <Clock className="h-4 w-4" />
                  {challengeData.deadline}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full">
                  <Users className="h-4 w-4" />
                  {challengeData.participants} participants
                </span>
              </div>
            </motion.div>

            {/* Collapsible Sections */}
            <Accordion type="multiple" defaultValue={["brief", "submission"]} className="space-y-4">
              {/* Problem Brief */}
              <AccordionItem value="brief" className="rounded-2xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">Problem Brief</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground mb-4">
                    {challengeData.intent}
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Requirements / Milestones */}
              <AccordionItem value="requirements" className="rounded-2xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">Requirements & Milestones</span>
                    <Badge variant="secondary" className="ml-2">
                      {completedMilestones}/{totalMilestones}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <h4 className="font-medium text-foreground mb-3">Requirements</h4>
                  <ul className="space-y-2 mb-6">
                    {challengeData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-medium text-foreground mb-3">Milestones</h4>
                  <div className="space-y-3">
                    {challengeData.milestones.map((milestone) => (
                      <div 
                        key={milestone.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          milestone.completed 
                            ? 'bg-success/5 border-success/20' 
                            : 'bg-secondary/30 border-border/30'
                        }`}
                      >
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          milestone.completed ? 'bg-success text-white' : 'bg-muted'
                        }`}>
                          {milestone.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-medium">{milestone.id}</span>
                          )}
                        </div>
                        <span className={milestone.completed ? 'text-foreground' : 'text-muted-foreground'}>
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Submission Form */}
              <AccordionItem value="submission" className="rounded-2xl bg-card border border-border/50 px-6">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <span className="font-medium">Submission</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 space-y-6">
                  {/* Section 1: Overview */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Overview (Short Answer)
                    </label>
                    <Textarea
                      placeholder="Describe your approach in 2-3 sentences..."
                      value={overview}
                      onChange={(e) => setOverview(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Section 2: GitHub / Prototype */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Github className="h-4 w-4 inline mr-1" />
                      GitHub Repository
                    </label>
                    <Input
                      placeholder="https://github.com/username/repo"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                    />
                  </div>

                  {/* Section 3: Video Pitch */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Video className="h-4 w-4 inline mr-1" />
                      Video Pitch (Optional)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop or click to upload (max 5 min)
                      </p>
                    </div>
                  </div>

                  {/* Attach Existing Idea */}
                  <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Attach Existing Idea</p>
                      <p className="text-xs text-muted-foreground">Link a forum idea to this submission</p>
                    </div>
                    <Button variant="outline" size="sm">Browse Ideas</Button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Save className="h-4 w-4" />
                      Draft auto-saved
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Submit</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Checklist */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-card border border-border/50 p-6"
            >
              <h3 className="font-medium text-foreground mb-4">Submission Checklist</h3>
              
              <div className="space-y-3 mb-4">
                {[
                  { label: "Overview completed", done: overview.length > 20 },
                  { label: "GitHub linked", done: githubLink.length > 10 },
                  { label: "Video pitch", done: false },
                  { label: "Terms accepted", done: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      item.done ? 'bg-success text-white' : 'bg-muted'
                    }`}>
                      {item.done && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <span className={`text-sm ${item.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="text-foreground font-medium">{submissionProgress}%</span>
                </div>
                <Progress value={submissionProgress} className="h-2" />
              </div>

              <p className="text-xs text-primary mt-4">
                ✨ Your submission is {submissionProgress}% complete
              </p>
            </motion.div>

            {/* AI Encouragement */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-primary/5 border border-primary/20 p-6"
            >
              <p className="text-sm text-foreground">
                💡 <strong>Tip:</strong> Students who include a video pitch are 2x more likely to receive feedback!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeDetail;
