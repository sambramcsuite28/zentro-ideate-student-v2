import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Search, Code, FileText, User, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RepoItem {
  id: string;
  title: string;
  author: string;
  year: number;
  type: "project" | "paper" | "snippet";
  abstract: string;
  tags: string[];
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
  },
  {
    id: "2",
    title: "Blockchain-based Academic Credential Verification",
    author: "Neha Gupta",
    year: 2024,
    type: "paper",
    abstract: "Decentralized verification system reducing fraud by 95% in pilot study",
    tags: ["Blockchain", "Smart Contracts", "Security"],
  },
  {
    id: "3",
    title: "Efficient LRU Cache Implementation in Rust",
    author: "Aditya Singh",
    year: 2023,
    type: "snippet",
    abstract: "Thread-safe LRU cache with O(1) operations and minimal memory overhead",
    tags: ["Rust", "Data Structures", "Performance"],
  },
  {
    id: "4",
    title: "Mental Health Chatbot using GPT Fine-tuning",
    author: "Priya Sharma",
    year: 2024,
    type: "project",
    abstract: "Empathetic conversational agent trained on counseling transcripts",
    tags: ["NLP", "Mental Health", "LLM"],
  },
  {
    id: "5",
    title: "Low-latency Video Streaming Protocol",
    author: "Rohit Kumar",
    year: 2023,
    type: "paper",
    abstract: "Novel protocol achieving sub-100ms latency for live streaming applications",
    tags: ["Networking", "Video", "Protocol Design"],
  },
];

const typeIcons = {
  project: Code,
  paper: FileText,
  snippet: Code,
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
        <div className="grid gap-4 md:grid-cols-2">
          {repoItems.map((item, index) => {
            const TypeIcon = typeIcons[item.type];
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-xl bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <TypeIcon className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {item.type}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-foreground mb-2 leading-snug">
                  {item.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.abstract}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {item.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.year}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="px-2 py-0.5 text-xs text-muted-foreground">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Build on this
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
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
