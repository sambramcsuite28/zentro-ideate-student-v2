import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Tag, 
  Clock, 
  ArrowLeft, 
  ChevronUp, 
  ChevronDown,
  Lightbulb,
  Send,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Comment {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  replies?: Comment[];
}

interface TopicData {
  id: string;
  title: string;
  context: string;
  content: string;
  author: string;
  authorId: string;
  tags: string[];
  timestamp: string;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  comments: Comment[];
}

// Current user ID (in a real app, this would come from auth context)
const CURRENT_USER_ID = "user-1";

// Mock data for topics
const topicsData: Record<string, TopicData> = {
  "1": {
    id: "1",
    title: "Best approach for implementing real-time collaboration?",
    context: "Building a shared whiteboard feature for my FYP",
    content: `I'm working on my Final Year Project which involves building a collaborative whiteboard application. I'm stuck on choosing the right approach for real-time synchronization.

Here are my requirements:
- Multiple users can draw simultaneously
- Low latency updates (< 100ms)
- Handle conflict resolution gracefully
- Scale to ~50 concurrent users per session

I've been researching WebSockets vs Server-Sent Events vs WebRTC. Each has trade-offs:

**WebSockets:** Seems like the standard choice, but I'm concerned about connection management at scale.

**WebRTC:** Great for P2P, but signaling server setup seems complex for my use case.

**Server-Sent Events:** Simple, but only one-way communication.

Has anyone implemented something similar? What stack did you use? I'm leaning towards Socket.io with Redis for pub/sub, but would love to hear other perspectives.`,
    author: "Rahul M.",
    authorId: "user-1",
    tags: ["WebSockets", "FYP"],
    timestamp: "2 hours ago",
    upvotes: 18,
    downvotes: 2,
    userVote: null,
    comments: [
      {
        id: "c1",
        author: "Priya S.",
        authorId: "user-2",
        content: "I used Socket.io with Y.js for CRDT-based conflict resolution in a similar project. Works really well for collaborative editing. The learning curve for Y.js is worth it!",
        timestamp: "1 hour ago",
        upvotes: 12,
        downvotes: 0,
        userVote: null,
      },
      {
        id: "c2",
        author: "Aditya K.",
        authorId: "user-3",
        content: "Consider using Liveblocks or Yjs - they handle a lot of the complexity for you. I used Liveblocks for a hackathon project and it was surprisingly easy to set up.",
        timestamp: "45 mins ago",
        upvotes: 8,
        downvotes: 1,
        userVote: null,
      },
      {
        id: "c3",
        author: "Sneha R.",
        authorId: "user-4",
        content: "For 50 concurrent users, WebRTC might be overkill. Stick with WebSockets + Redis pub/sub. I'd also recommend looking into operational transforms for conflict resolution.",
        timestamp: "30 mins ago",
        upvotes: 5,
        downvotes: 0,
        userVote: null,
      },
    ],
  },
  "2": {
    id: "2",
    title: "Resources for learning system design from scratch",
    context: "Preparing for product-based company interviews",
    content: `I have interviews coming up with Google and Microsoft in 3 months. My DSA is solid, but I've never done system design before.

Looking for recommendations on:
1. Books or courses for beginners
2. Practice problems with solutions
3. Mock interview platforms

My background: 3 years of web development experience, comfortable with databases and APIs, but never designed systems at scale.

Budget isn't a concern - willing to pay for quality resources.`,
    author: "Priya S.",
    authorId: "user-2",
    tags: ["System Design", "Interview"],
    timestamp: "5 hours ago",
    upvotes: 45,
    downvotes: 3,
    userVote: null,
    comments: [
      {
        id: "c1",
        author: "Vikram P.",
        authorId: "user-5",
        content: "Designing Data-Intensive Applications by Martin Kleppmann is the gold standard. Pair it with the System Design Primer on GitHub and you're set.",
        timestamp: "4 hours ago",
        upvotes: 32,
        downvotes: 0,
        userVote: null,
      },
      {
        id: "c2",
        author: "Rahul M.",
        authorId: "user-1",
        content: "ByteByteGo by Alex Xu is excellent for interview prep specifically. His YouTube channel is also great for visual learners.",
        timestamp: "3 hours ago",
        upvotes: 18,
        downvotes: 1,
        userVote: null,
      },
    ],
  },
  "3": {
    id: "3",
    title: "Deploying ML models on edge devices - experiences?",
    context: "Trying TensorFlow Lite vs ONNX for Raspberry Pi",
    content: `Working on an IoT project that requires running a custom image classification model on Raspberry Pi 4. The model needs to process ~10 frames per second with acceptable accuracy.

Current situation:
- Training on PyTorch (ResNet-18 variant)
- Need to optimize for edge deployment
- Memory constraint: ~2GB available

I've been comparing TensorFlow Lite vs ONNX Runtime. Initial tests show:
- TFLite: Easier setup, but conversion from PyTorch is painful
- ONNX: Direct PyTorch export, but slightly higher latency

Anyone have experience with either? Are there other options I should consider?`,
    author: "Aditya K.",
    authorId: "user-3",
    tags: ["ML", "Edge Computing"],
    timestamp: "1 day ago",
    upvotes: 22,
    downvotes: 1,
    userVote: null,
    comments: [
      {
        id: "c1",
        author: "Sneha R.",
        authorId: "user-4",
        content: "Have you looked into OpenVINO? It's specifically optimized for Intel hardware but works surprisingly well on ARM too with some tweaks.",
        timestamp: "20 hours ago",
        upvotes: 7,
        downvotes: 0,
        userVote: null,
      },
    ],
  },
  "4": {
    id: "4",
    title: "How to structure a research paper for IEEE publication?",
    context: "First time submitting to a journal",
    content: `I'm writing my first research paper based on my FYP work on using transformers for time-series forecasting. Planning to submit to IEEE Access.

Questions:
1. What's the typical structure expected?
2. How detailed should the methodology section be?
3. Should I include code/data availability statements?
4. Any tips for literature review - how many papers should I cite?

My advisor is helpful but hasn't published in IEEE recently, so looking for current advice.`,
    author: "Sneha R.",
    authorId: "user-4",
    tags: ["Research", "Publishing"],
    timestamp: "2 days ago",
    upvotes: 28,
    downvotes: 0,
    userVote: null,
    comments: [
      {
        id: "c1",
        author: "Priya S.",
        authorId: "user-2",
        content: "IEEE Access has a specific template - download it from their website. Generally: Abstract, Introduction, Related Work, Methodology, Experiments, Results, Discussion, Conclusion. Cite 30-50 papers for a journal submission.",
        timestamp: "1 day ago",
        upvotes: 15,
        downvotes: 0,
        userVote: null,
      },
    ],
  },
  "5": {
    id: "5",
    title: "Rust vs Go for building microservices - pros and cons",
    context: "Starting a new backend project, need language recommendations",
    content: `Starting a new microservices project at my internship. The team is giving me freedom to choose the tech stack for a new service.

Requirements:
- High throughput (10k+ requests/sec)
- Low memory footprint
- Easy to maintain by junior developers
- Good ecosystem for web services

I'm torn between Rust and Go. I have basic experience in both.

Rust pros: Performance, safety, growing ecosystem
Rust cons: Steep learning curve, slower development

Go pros: Simplicity, great stdlib, fast compilation
Go cons: Error handling verbosity, less type-safe

What would you choose and why?`,
    author: "Vikram P.",
    authorId: "user-5",
    tags: ["Rust", "Go", "Backend"],
    timestamp: "3 days ago",
    upvotes: 56,
    downvotes: 4,
    userVote: null,
    comments: [
      {
        id: "c1",
        author: "Aditya K.",
        authorId: "user-3",
        content: "For 10k req/sec, both will handle it easily. Go is more pragmatic for team projects - the simplicity means less cognitive overhead. I'd choose Rust only if you need the absolute lowest latency or memory usage.",
        timestamp: "2 days ago",
        upvotes: 24,
        downvotes: 2,
        userVote: null,
      },
      {
        id: "c2",
        author: "Rahul M.",
        authorId: "user-1",
        content: "Consider your team composition. If junior devs need to maintain it, Go wins hands down. Rust's ownership model is beautiful but takes time to internalize.",
        timestamp: "2 days ago",
        upvotes: 19,
        downvotes: 0,
        userVote: null,
      },
    ],
  },
};

const ForumTopic = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = topicsData[topicId || "1"];
  
  const [comments, setComments] = useState<Comment[]>(topic?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [topicVotes, setTopicVotes] = useState({
    upvotes: topic?.upvotes || 0,
    downvotes: topic?.downvotes || 0,
    userVote: topic?.userVote || null as "up" | "down" | null,
  });

  const isOwner = topic?.authorId === CURRENT_USER_ID;

  if (!topic) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center py-12">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Topic not found
            </h1>
            <Link to="/forum">
              <Button variant="outline">Back to Forum</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleTopicVote = (vote: "up" | "down") => {
    setTopicVotes((prev) => {
      if (prev.userVote === vote) {
        return {
          ...prev,
          upvotes: vote === "up" ? prev.upvotes - 1 : prev.upvotes,
          downvotes: vote === "down" ? prev.downvotes - 1 : prev.downvotes,
          userVote: null,
        };
      }
      return {
        upvotes: vote === "up" 
          ? prev.upvotes + 1 + (prev.userVote === "down" ? 0 : 0)
          : prev.upvotes - (prev.userVote === "up" ? 1 : 0),
        downvotes: vote === "down"
          ? prev.downvotes + 1 + (prev.userVote === "up" ? 0 : 0)
          : prev.downvotes - (prev.userVote === "down" ? 1 : 0),
        userVote: vote,
      };
    });
  };

  const handleCommentVote = (commentId: string, vote: "up" | "down") => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id !== commentId) return comment;
        
        const wasUpvoted = comment.userVote === "up";
        const wasDownvoted = comment.userVote === "down";
        const isRemoving = comment.userVote === vote;

        return {
          ...comment,
          upvotes: vote === "up" 
            ? (isRemoving ? comment.upvotes - 1 : comment.upvotes + 1 + (wasDownvoted ? 0 : 0))
            : comment.upvotes - (wasUpvoted && !isRemoving ? 1 : 0),
          downvotes: vote === "down"
            ? (isRemoving ? comment.downvotes - 1 : comment.downvotes + 1 + (wasUpvoted ? 0 : 0))
            : comment.downvotes - (wasDownvoted && !isRemoving ? 1 : 0),
          userVote: isRemoving ? null : vote,
        };
      })
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      authorId: CURRENT_USER_ID,
      content: newComment,
      timestamp: "Just now",
      upvotes: 0,
      downvotes: 0,
      userVote: null,
    };
    
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        {/* Back Button */}
        <Link to="/forum">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Forum
          </Button>
        </Link>

        {/* Topic Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-card p-6 shadow-card mb-6"
        >
          <div className="flex gap-4">
            {/* Vote Column */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${topicVotes.userVote === "up" ? "text-primary" : "text-muted-foreground"}`}
                onClick={() => handleTopicVote("up")}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
              <span className="font-semibold text-foreground">
                {topicVotes.upvotes - topicVotes.downvotes}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${topicVotes.userVote === "down" ? "text-destructive" : "text-muted-foreground"}`}
                onClick={() => handleTopicVote("down")}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h1 className="font-display text-xl font-bold text-foreground mb-1">
                    {topic.title}
                  </h1>
                  <p className="text-muted-foreground text-sm">{topic.context}</p>
                </div>
                {isOwner && (
                  <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Convert to idea
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {topic.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {topic.timestamp}
                </span>
                <div className="flex gap-1.5">
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="h-2.5 w-2.5 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-foreground">
                {topic.content.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-3 last:mb-0 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {comments.length} Comments
          </h2>

          <div className="space-y-4">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl bg-card p-4 shadow-card"
              >
                <div className="flex gap-3">
                  {/* Vote Column */}
                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 ${comment.userVote === "up" ? "text-primary" : "text-muted-foreground"}`}
                      onClick={() => handleCommentVote(comment.id, "up")}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-foreground">
                      {comment.upvotes - comment.downvotes}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-7 w-7 ${comment.userVote === "down" ? "text-destructive" : "text-muted-foreground"}`}
                      onClick={() => handleCommentVote(comment.id, "down")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{comment.author}</span>
                      <span>•</span>
                      <span>{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="rounded-xl bg-card p-4 shadow-card">
          <h3 className="font-medium text-foreground mb-3">Add a comment</h3>
          <Textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-3 min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment} disabled={!newComment.trim()} className="gap-2">
              <Send className="h-4 w-4" />
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForumTopic;
