import { motion } from "framer-motion";
import { MessageSquare, Tag, Clock, ThumbsUp, MessageCircle, Share2, MoreHorizontal, Image, FileText, Link2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    title: string;
  };
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  type: "discussion" | "project" | "achievement";
}

const feedPosts: FeedPost[] = [
  {
    id: "1",
    author: {
      name: "Rahul M.",
      title: "Computer Science • 3rd Year",
    },
    content: "Just published my research on real-time collaboration using WebSockets for my FYP. Looking for feedback from peers who've worked on similar distributed systems! 🚀",
    tags: ["WebSockets", "FYP", "Research"],
    likes: 24,
    comments: 12,
    shares: 5,
    timestamp: "2 hours ago",
    type: "project",
  },
  {
    id: "2",
    author: {
      name: "Priya S.",
      title: "Electronics • 4th Year",
    },
    content: "Resources for learning system design from scratch - anyone preparing for product-based company interviews? I've compiled a list of my favorite resources.",
    tags: ["System Design", "Interview"],
    likes: 45,
    comments: 24,
    shares: 18,
    timestamp: "5 hours ago",
    type: "discussion",
  },
  {
    id: "3",
    author: {
      name: "Aditya K.",
      title: "AI/ML Specialization",
    },
    content: "Deploying ML models on edge devices - tried both TensorFlow Lite and ONNX for Raspberry Pi. Here's my comparison of latency and accuracy tradeoffs.",
    tags: ["ML", "Edge Computing", "TensorFlow"],
    likes: 32,
    comments: 8,
    shares: 12,
    timestamp: "1 day ago",
    type: "project",
  },
  {
    id: "4",
    author: {
      name: "Sneha R.",
      title: "Data Science • 3rd Year",
    },
    content: "🎉 Just got my first paper accepted at IEEE conference! Happy to share tips on how to structure a research paper for publication.",
    tags: ["Research", "Publishing", "Achievement"],
    likes: 89,
    comments: 15,
    shares: 7,
    timestamp: "2 days ago",
    type: "achievement",
  },
];

export function DashboardFeed() {
  return (
    <div className="space-y-4">
      {/* Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">A</AvatarFallback>
          </Avatar>
          <Input
            placeholder="Start a discussion, share a project..."
            className="flex-1 rounded-full bg-secondary/50 border-0 focus-visible:ring-1"
          />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <Image className="h-4 w-4 text-blue-500" />
              <span className="text-xs">Media</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <FileText className="h-4 w-4 text-orange-500" />
              <span className="text-xs">Project</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <Link2 className="h-4 w-4 text-green-500" />
              <span className="text-xs">Link</span>
            </Button>
          </div>
          <Button size="sm" className="rounded-full gap-1 h-8">
            <Send className="h-3 w-3" />
            Post
          </Button>
        </div>
      </motion.div>

      {/* Feed Posts */}
      {feedPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-xl bg-card p-4 shadow-card hover:shadow-card-hover transition-shadow"
        >
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/forum/${post.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                  {post.author.name}
                </Link>
                <p className="text-xs text-muted-foreground">{post.author.title}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.timestamp}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Post Content */}
          <p className="text-sm text-foreground mb-3 leading-relaxed">
            {post.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pb-3 border-b border-border/50">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary">
              <ThumbsUp className="h-4 w-4" />
              Like
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary">
              <MessageCircle className="h-4 w-4" />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-primary">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </motion.div>
      ))}

      {/* View More Link */}
      <div className="text-center">
        <Link to="/forum">
          <Button variant="ghost" className="text-primary">
            View All Discussions
            <MessageSquare className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}