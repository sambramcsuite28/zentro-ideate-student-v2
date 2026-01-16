import { Layout } from "@/components/layout/Layout";
import LadderGraph from "@/components/leaderboard/LadderGraph";
import RankingList from "@/components/leaderboard/RankingList";
import CompetitiveFeed from "@/components/leaderboard/CompetitiveFeed";

const Leaderboard = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Campus Innovation Leaderboard
          </h1>
          <p className="text-muted-foreground">
            IIT Bombay — Your benchmark against campus peers
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Ladder Graph */}
          <div className="lg:col-span-1 space-y-6">
            <LadderGraph />
            <CompetitiveFeed />
          </div>

          {/* Right Column - Ranking List */}
          <div className="lg:col-span-2">
            <RankingList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
