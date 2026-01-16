import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import ProofOfWork from "./pages/ProofOfWork";
import Leaderboard from "./pages/Leaderboard";
import Repository from "./pages/Repository";
import Forum from "./pages/Forum";
import ForumTopic from "./pages/ForumTopic";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/proof" element={<ProofOfWork />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/repo" element={<Repository />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:topicId" element={<ForumTopic />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
