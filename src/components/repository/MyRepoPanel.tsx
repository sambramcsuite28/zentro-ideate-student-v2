import { useState } from "react";
import { motion } from "framer-motion";
import { Pin, FileText, Code, Bookmark, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RepoCard, RepoItem } from "./RepoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const myItems: RepoItem[] = [
  {
    id: "my-1",
    title: "Real-time Object Detection for Autonomous Drones",
    author: "You",
    authorId: "current-user",
    year: 2024,
    type: "project",
    abstract: "YOLO-based detection system optimized for edge deployment on DJI drones",
    tags: ["Computer Vision", "Edge ML", "Python"],
    stars: 45,
    forks: 12,
    isOwner: true,
    isPinned: true,
    githubUrl: "https://github.com/user/drone-detection",
  },
  {
    id: "my-2",
    title: "Efficient LRU Cache Implementation in Rust",
    author: "You",
    authorId: "current-user",
    year: 2024,
    type: "snippet",
    abstract: "Thread-safe LRU cache with O(1) operations and minimal memory overhead",
    tags: ["Rust", "Data Structures", "Performance"],
    stars: 89,
    forks: 23,
    isOwner: true,
    isPinned: true,
    githubUrl: "https://github.com/user/lru-cache",
  },
  {
    id: "my-3",
    title: "Mental Health Chatbot using GPT Fine-tuning",
    author: "You",
    authorId: "current-user",
    year: 2024,
    type: "project",
    abstract: "Empathetic conversational agent trained on counseling transcripts",
    tags: ["NLP", "Mental Health", "LLM"],
    stars: 67,
    forks: 15,
    isOwner: true,
    githubUrl: "https://github.com/user/mh-chatbot",
  },
];

const savedItems: RepoItem[] = [
  {
    id: "saved-1",
    title: "Blockchain-based Academic Credential Verification",
    author: "Neha Gupta",
    year: 2024,
    type: "paper",
    abstract: "Decentralized verification system reducing fraud by 95% in pilot study",
    tags: ["Blockchain", "Smart Contracts", "Security"],
    stars: 32,
    forks: 8,
    hasValidation: true,
  },
];

export const MyRepoPanel = () => {
  const pinnedItems = myItems.filter(item => item.isPinned);
  const allMyItems = myItems;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-2xl font-bold text-primary">{myItems.length}</p>
          <p className="text-xs text-muted-foreground">Your Items</p>
        </div>
        <div className="p-4 rounded-xl bg-success/5 border border-success/20">
          <p className="text-2xl font-bold text-success">{myItems.filter(i => i.hasValidation).length || 2}</p>
          <p className="text-xs text-muted-foreground">With Validation</p>
        </div>
        <div className="p-4 rounded-xl bg-info/5 border border-info/20">
          <p className="text-2xl font-bold text-info">{savedItems.length}</p>
          <p className="text-xs text-muted-foreground">Saved</p>
        </div>
      </div>

      {/* Pinned Projects */}
      {pinnedItems.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Pin className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-foreground">Pinned Projects</h3>
            <Badge variant="secondary" className="text-xs">{pinnedItems.length}/3</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pinnedItems.map((item, index) => (
              <RepoCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Sub-tabs for My Items vs Saved */}
      <Tabs defaultValue="authored" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="authored" className="gap-2">
            <Code className="h-4 w-4" />
            Authored ({allMyItems.length})
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Saved ({savedItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="authored">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allMyItems.map((item, index) => (
              <RepoCard key={item.id} item={item} index={index} />
            ))}
            
            {/* Add New Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: allMyItems.length * 0.05 }}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 p-8 text-center hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer min-h-[300px]"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">Add New Item</p>
              <p className="text-sm text-muted-foreground">Project, paper, or snippet</p>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          {savedItems.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedItems.map((item, index) => (
                <RepoCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No saved items yet</p>
              <p className="text-sm text-muted-foreground">Bookmark interesting projects from Explore</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
