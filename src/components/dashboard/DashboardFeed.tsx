import { motion } from "framer-motion";
import { MessageSquare, Tag, Clock, ThumbsUp, MessageCircle, Share2, MoreHorizontal, Image, FileText, Link2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScoreDashboardCard } from "./ScoreDashboardCard";

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
];

export function DashboardFeed() {
  return (
    <div className="space-y-4">
      {/* Score Dashboard - Top 20-25% of center column */}
      <ScoreDashboardCard />

      {/* Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-card p-4 shadow-card"
      >
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">A</AvatarFallback>
          </Avatar>
          <Input
            placeholder="Share a project update or start a discussion..."
            className="flex-1 rounded-full bg-secondary/50 border-0 focus-visible:ring-1 h-9 text-sm"
          />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground h-7 px-2">
              <Image className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs">Media</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground h-7 px-2">
              <FileText className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs">Project</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground h-7 px-2">
              <Link2 className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs">Link</span>
            </Button>
          </div>
          <Button size="sm" className="rounded-full gap-1 h-7 text-xs px-3">
            <Send className="h-3 w-3" />
            Post
          </Button>
        </div>
      </motion.div>

      {/* Feed Posts - Condensed */}
      {feedPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + index * 0.05 }}
          className="rounded-xl bg-card p-4 shadow-card hover:shadow-card-hover transition-shadow"
        >
          {/* Post Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/forum/${post.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {post.author.name}
                </Link>
                <p className="text-[10px] text-muted-foreground">{post.author.title}</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {post.timestamp}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Post Content */}
          <p className="text-sm text-foreground mb-2 leading-relaxed">
            {post.content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium"
              >
                <Tag className="h-2 w-2" />
                {tag}
              </span>
            ))}
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground pb-2 border-b border-border/50">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" className="flex-1 gap-1.5 text-muted-foreground hover:text-primary h-7 text-xs">
              <ThumbsUp className="h-3.5 w-3.5" />
              Like
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 gap-1.5 text-muted-foreground hover:text-primary h-7 text-xs">
              <MessageCircle className="h-3.5 w-3.5" />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 gap-1.5 text-muted-foreground hover:text-primary h-7 text-xs">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
          </div>
        </motion.div>
      ))}

      {/* View More Link */}
      <div className="text-center">
        <Link to="/forum">
          <Button variant="ghost" size="sm" className="text-primary text-xs">
            View All Discussions
            <MessageSquare className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
