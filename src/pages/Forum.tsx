import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { MessageSquare, Tag, Clock, Lightbulb, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ForumThread {
  id: string;
  title: string;
  context: string;
  author: string;
  tags: string[];
  replies: number;
  lastActivity: string;
  isInUserTopics?: boolean;
}

const threads: ForumThread[] = [
  {
    id: "1",
    title: "Best approach for implementing real-time collaboration?",
    context: "Building a shared whiteboard feature for my FYP",
    author: "Rahul M.",
    tags: ["WebSockets", "FYP"],
    replies: 12,
    lastActivity: "2 hours ago",
    isInUserTopics: true,
  },
  {
    id: "2",
    title: "Resources for learning system design from scratch",
    context: "Preparing for product-based company interviews",
    author: "Priya S.",
    tags: ["System Design", "Interview"],
    replies: 24,
    lastActivity: "5 hours ago",
    isInUserTopics: true,
  },
  {
    id: "3",
    title: "Deploying ML models on edge devices - experiences?",
    context: "Trying TensorFlow Lite vs ONNX for Raspberry Pi",
    author: "Aditya K.",
    tags: ["ML", "Edge Computing"],
    replies: 8,
    lastActivity: "1 day ago",
  },
  {
    id: "4",
    title: "How to structure a research paper for IEEE publication?",
    context: "First time submitting to a journal",
    author: "Sneha R.",
    tags: ["Research", "Publishing"],
    replies: 15,
    lastActivity: "2 days ago",
  },
  {
    id: "5",
    title: "Rust vs Go for building microservices - pros and cons",
    context: "Starting a new backend project, need language recommendations",
    author: "Vikram P.",
    tags: ["Rust", "Go", "Backend"],
    replies: 31,
    lastActivity: "3 days ago",
  },
];

const Forum = () => {
  const userTopics = threads.filter((t) => t.isInUserTopics);
  const otherTopics = threads.filter((t) => !t.isInUserTopics);

  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Forum
            </h1>
            <p className="text-muted-foreground">
              Async discussions on tech, research, and career
            </p>
          </div>
          <Button className="gap-2">
            <MessageSquare className="h-4 w-4" />
            New Thread
          </Button>
        </div>

        {/* Your Active Topics */}
        {userTopics.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Your Active Topics
            </h2>
            <div className="space-y-3">
              {userTopics.map((thread, index) => (
                <ThreadCard key={thread.id} thread={thread} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Discussions */}
        <div>
          <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Recent Discussions
          </h2>
          <div className="space-y-3">
            {otherTopics.map((thread, index) => (
              <ThreadCard 
                key={thread.id} 
                thread={thread} 
                index={index + userTopics.length} 
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

function ThreadCard({ thread, index }: { thread: ForumThread; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center justify-between gap-4 rounded-xl bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground mb-1 truncate">
          {thread.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 truncate">
          {thread.context}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{thread.author}</span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {thread.replies} replies
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {thread.lastActivity}
          </span>
          <div className="flex gap-1.5">
            {thread.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Lightbulb className="h-3.5 w-3.5" />
          Convert to idea
        </Button>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export default Forum;
