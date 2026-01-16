import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Search, Code, FileText, User, Calendar, ArrowRight, Star, GitFork, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface RepoItem {
  id: string;
  title: string;
  author: string;
  year: number;
  type: "project" | "paper" | "snippet";
  abstract: string;
  tags: string[];
  stars?: number;
  forks?: number;
}

const repoItems: RepoItem[] = [
  {
    id: "1",
    title: "Real-time Object Detection for Autonomous Drones",
    author: "Vikram Patel",
    year: 2024,
    type: "project",
    abstract: "YOLO-based detection system optimized for edge deployment on DJI drones",
    tags: ["Computer Vision", "Edge ML", "Python"],
    stars: 45,
    forks: 12,
  },
  {
    id: "2",
    title: "Blockchain-based Academic Credential Verification",
    author: "Neha Gupta",
    year: 2024,
    type: "paper",
    abstract: "Decentralized verification system reducing fraud by 95% in pilot study",
    tags: ["Blockchain", "Smart Contracts", "Security"],
    stars: 32,
    forks: 8,
  },
  {
    id: "3",
    title: "Efficient LRU Cache Implementation in Rust",
    author: "Aditya Singh",
    year: 2023,
    type: "snippet",
    abstract: "Thread-safe LRU cache with O(1) operations and minimal memory overhead",
    tags: ["Rust", "Data Structures", "Performance"],
    stars: 89,
    forks: 23,
  },
  {
    id: "4",
    title: "Mental Health Chatbot using GPT Fine-tuning",
    author: "Priya Sharma",
    year: 2024,
    type: "project",
    abstract: "Empathetic conversational agent trained on counseling transcripts",
    tags: ["NLP", "Mental Health", "LLM"],
    stars: 67,
    forks: 15,
  },
  {
    id: "5",
    title: "Low-latency Video Streaming Protocol",
    author: "Rohit Kumar",
    year: 2023,
    type: "paper",
    abstract: "Novel protocol achieving sub-100ms latency for live streaming applications",
    tags: ["Networking", "Video", "Protocol Design"],
    stars: 28,
    forks: 6,
  },
];

const typeConfig = {
  project: { icon: Code, label: "Project", color: "bg-primary/10 text-primary" },
  paper: { icon: FileText, label: "Paper", color: "bg-accent text-accent-foreground" },
  snippet: { icon: Code, label: "Snippet", color: "bg-secondary text-secondary-foreground" },
};

const Repository = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Repository
          </h1>
          <p className="text-muted-foreground">
            Searchable archive of senior projects, papers, and code snippets
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, papers, code..."
            className="pl-10"
          />
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          {["All", "Projects", "Papers", "Snippets"].map((tab, index) => (
            <Button
              key={tab}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Repository Items */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repoItems.map((item, index) => {
            const typeInfo = typeConfig[item.type];
            const TypeIcon = typeInfo.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
              >
                {/* Top Gradient Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/60" />
                
                <div className="flex flex-col flex-1 p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Badge className={`${typeInfo.color} font-medium`}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {typeInfo.label}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {item.stars && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          {item.stars}
                        </span>
                      )}
                      {item.forks && (
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
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {item.abstract}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card via-card to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1.5">
                      Build on this
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Repository;
