import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Code, FileText, Star, GitFork, User, Calendar, 
  ExternalLink, Github, Bookmark, Share2, Copy, Award, ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const repoData = {
  id: "1",
  title: "Real-time Object Detection for Autonomous Drones",
  author: "Vikram Patel",
  authorId: "other-user",
  year: 2024,
  type: "project" as const,
  abstract: "YOLO-based detection system optimized for edge deployment on DJI drones. This project implements a real-time object detection system specifically designed for autonomous drone navigation, with optimizations for low-power edge computing devices.",
  tags: ["Computer Vision", "Edge ML", "Python", "YOLO", "TensorRT"],
  stars: 45,
  forks: 12,
  techStack: ["Python", "PyTorch", "TensorRT", "OpenCV", "DJI SDK"],
  githubUrl: "https://github.com/user/drone-detection",
  demoUrl: "https://demo.example.com",
  hasValidation: true,
  endorsements: [
    { name: "Dr. Sharma", role: "Faculty Advisor", comment: "Excellent implementation with practical applications" },
  ],
  relatedItems: [
    { id: "r1", title: "Edge ML Optimization Techniques", type: "snippet" },
    { id: "r2", title: "Drone Navigation Paper", type: "paper" },
  ],
  attachments: [
    { name: "Research Paper.pdf", size: "2.4 MB" },
    { name: "Demo Video.mp4", size: "45 MB" },
  ],
};

const typeConfig = {
  project: { icon: Code, label: "Project", color: "bg-primary/10 text-primary border-primary/20" },
  paper: { icon: FileText, label: "Paper", color: "bg-accent text-accent-foreground border-accent" },
  snippet: { icon: Code, label: "Snippet", color: "bg-secondary text-secondary-foreground border-secondary" },
};

const RepoDetail = () => {
  const { repoId } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const typeInfo = typeConfig[repoData.type];
  const TypeIcon = typeInfo.icon;

  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2"
          onClick={() => navigate("/repo")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Repository
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
                <Badge variant="outline" className={`${typeInfo.color} font-medium`}>
                  <TypeIcon className="h-3 w-3 mr-1" />
                  {typeInfo.label}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {repoData.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {repoData.forks}
                  </span>
                </div>
              </div>

              <h1 className="font-display text-2xl font-bold text-foreground mb-4">
                {repoData.title}
              </h1>

              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {repoData.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {repoData.year}
                </span>
                {repoData.hasValidation && (
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    ✓ Faculty Validated
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {repoData.githubUrl && (
                  <Button asChild>
                    <a href={repoData.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                )}
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Fork / Build on this
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? "text-primary border-primary" : ""}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-primary" : ""}`} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Abstract */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-card border border-border/50 p-6"
            >
              <h2 className="font-medium text-foreground mb-4">Abstract</h2>
              <p className="text-muted-foreground leading-relaxed">
                {repoData.abstract}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl bg-card border border-border/50 p-6"
            >
              <h2 className="font-medium text-foreground mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {repoData.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1.5">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-card border border-border/50 p-6"
            >
              <h2 className="font-medium text-foreground mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {repoData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Endorsements */}
            {repoData.endorsements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl bg-card border border-border/50 p-6"
              >
                <h2 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Endorsements
                </h2>
                <div className="space-y-4">
                  {repoData.endorsements.map((endorsement, index) => (
                    <div key={index} className="p-4 bg-success/5 border border-success/20 rounded-xl">
                      <p className="text-muted-foreground mb-2">"{endorsement.comment}"</p>
                      <p className="text-sm font-medium text-foreground">
                        {endorsement.name} <span className="text-muted-foreground font-normal">• {endorsement.role}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-card border border-border/50 p-6"
            >
              <h3 className="font-medium text-foreground mb-4">Links</h3>
              <div className="space-y-3">
                {repoData.githubUrl && (
                  <a 
                    href={repoData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Repository
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                )}
                {repoData.demoUrl && (
                  <a 
                    href={repoData.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Attachments */}
            {repoData.attachments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl bg-card border border-border/50 p-6"
              >
                <h3 className="font-medium text-foreground mb-4">Attachments</h3>
                <div className="space-y-2">
                  {repoData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <span className="text-sm text-foreground">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Items */}
            {repoData.relatedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-card border border-border/50 p-6"
              >
                <h3 className="font-medium text-foreground mb-4">Related Items</h3>
                <div className="space-y-3">
                  {repoData.relatedItems.map((item) => (
                    <div 
                      key={item.id}
                      className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/repo/${item.id}`)}
                    >
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RepoDetail;
