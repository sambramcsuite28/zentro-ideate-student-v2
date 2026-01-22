import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Search, Library, FolderOpen, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RepoCard, RepoItem } from "@/components/repository/RepoCard";
import { MyRepoPanel } from "@/components/repository/MyRepoPanel";
import { CreateProjectModal } from "@/components/repository/CreateProjectModal";
import { CollaborationRequestModal } from "@/components/repository/CollaborationRequestModal";
import { Button } from "@/components/ui/button";

const exploreItems: RepoItem[] = [
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
    hasValidation: true,
    githubUrl: "https://github.com/user/drone-detection",
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
    hasValidation: true,
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
    githubUrl: "https://github.com/user/lru-cache",
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
    hasValidation: true,
    githubUrl: "https://github.com/user/mh-chatbot",
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
  {
    id: "6",
    title: "GraphQL API Generator from Prisma Schema",
    author: "Kavya Reddy",
    year: 2024,
    type: "snippet",
    abstract: "Automated generation of type-safe GraphQL resolvers from Prisma definitions",
    tags: ["GraphQL", "Prisma", "TypeScript"],
    stars: 156,
    forks: 34,
    githubUrl: "https://github.com/user/prisma-graphql-gen",
  },
];

const typeFilters = ["All", "Projects", "Papers", "Snippets"];

const Repository = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    id: string;
    title: string;
    author: string;
    tags: string[];
  } | null>(null);

  const handleCollaborateRequest = (item: RepoItem) => {
    setSelectedProject({
      id: item.id,
      title: item.title,
      author: item.author,
      tags: item.tags,
    });
    setCollabModalOpen(true);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Repository
            </h1>
            <p className="text-muted-foreground">
              Searchable archive of projects, papers, and code snippets
            </p>
          </div>
          <Button className="gap-2" onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="explore" className="space-y-6">
          <TabsList className="h-12 p-1 bg-secondary/50">
            <TabsTrigger value="explore" className="h-10 px-6 gap-2 data-[state=active]:bg-card">
              <Library className="h-4 w-4" />
              Explore Repository
            </TabsTrigger>
            <TabsTrigger value="my" className="h-10 px-6 gap-2 data-[state=active]:bg-card">
              <FolderOpen className="h-4 w-4" />
              My Repository
            </TabsTrigger>
          </TabsList>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search projects, papers, code..." className="pl-10" />
              </div>
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter, index) => (
                <Button
                  key={filter}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {exploreItems.map((item, index) => (
                <RepoCard 
                  key={item.id} 
                  item={item} 
                  index={index}
                  onCollaborate={() => handleCollaborateRequest(item)}
                />
              ))}
            </div>
          </TabsContent>

          {/* My Repository Tab */}
          <TabsContent value="my">
            <MyRepoPanel onCreateNew={() => setCreateModalOpen(true)} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <CreateProjectModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <CollaborationRequestModal 
        open={collabModalOpen} 
        onOpenChange={setCollabModalOpen}
        project={selectedProject}
      />
    </Layout>
  );
};

export default Repository;