import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Search, Compass, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChallengeCard, Challenge } from "@/components/challenges/ChallengeCard";
import { MyChallengesPanel } from "@/components/challenges/MyChallengesPanel";
import { Button } from "@/components/ui/button";

const exploreChallenges: Challenge[] = [
  {
    id: "1",
    title: "EV Charging Network Optimization",
    host: "Mahindra",
    intent: "Design an AI-based algorithm to optimize charging station placement in urban areas, considering traffic patterns and grid capacity.",
    domain: "AI/ML",
    status: "Open",
    deadline: "15 days left",
    reward: "PPI + ₹50,000",
    participants: 234,
  },
  {
    id: "2",
    title: "Sustainable Supply Chain Tracker",
    host: "Infosys",
    intent: "Build a blockchain-based solution for tracking carbon footprint across supply chain operations.",
    domain: "Climate",
    status: "Open",
    deadline: "22 days left",
    reward: "Internship",
    participants: 156,
  },
  {
    id: "3",
    title: "Rural Banking Accessibility",
    host: "HDFC Bank",
    intent: "Create an offline-first mobile banking experience for rural areas with limited connectivity.",
    domain: "Fintech",
    status: "Open",
    deadline: "8 days left",
    reward: "₹1,00,000",
    participants: 89,
  },
  {
    id: "4",
    title: "Predictive Healthcare Analytics",
    host: "Apollo Hospitals",
    intent: "Develop machine learning models for early disease detection from patient health records.",
    domain: "Healthcare",
    status: "Open",
    deadline: "30 days left",
    reward: "Research Grant",
    participants: 312,
  },
  {
    id: "5",
    title: "Smart Campus Energy Management",
    host: "Tata Power",
    intent: "IoT-based system to monitor and optimize energy consumption across university campuses.",
    domain: "IoT",
    status: "Open",
    deadline: "18 days left",
    reward: "₹75,000 + Certificate",
    participants: 167,
  },
  {
    id: "6",
    title: "AI-Powered Legal Document Analysis",
    host: "Khaitan & Co",
    intent: "NLP solution to extract and summarize key clauses from legal contracts.",
    domain: "AI/ML",
    status: "Open",
    deadline: "25 days left",
    reward: "PPI",
    participants: 98,
  },
];

const domains = ["All", "AI/ML", "Fintech", "Climate", "Healthcare", "IoT", "Blockchain"];

const Challenges = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Challenges
          </h1>
          <p className="text-muted-foreground">
            Curated problem statements from industry and research partners
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="explore" className="space-y-6">
          <TabsList className="h-12 p-1 bg-secondary/50">
            <TabsTrigger value="explore" className="h-10 px-6 gap-2 data-[state=active]:bg-card">
              <Compass className="h-4 w-4" />
              Explore Challenges
            </TabsTrigger>
            <TabsTrigger value="my" className="h-10 px-6 gap-2 data-[state=active]:bg-card">
              <Briefcase className="h-4 w-4" />
              My Challenges
            </TabsTrigger>
          </TabsList>

          {/* Explore Challenges Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search challenges..." className="pl-10" />
              </div>
            </div>

            {/* Domain Filters */}
            <div className="flex flex-wrap gap-2">
              {domains.map((domain, index) => (
                <Button
                  key={domain}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {domain}
                </Button>
              ))}
            </div>

            {/* Challenge Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {exploreChallenges.map((challenge, index) => (
                <ChallengeCard 
                  key={challenge.id} 
                  challenge={challenge} 
                  index={index} 
                />
              ))}
            </div>
          </TabsContent>

          {/* My Challenges Tab */}
          <TabsContent value="my">
            <MyChallengesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Challenges;
