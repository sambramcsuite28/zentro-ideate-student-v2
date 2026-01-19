import { Layout } from "@/components/layout/Layout";
import { ProgressPulse } from "@/components/dashboard/ProgressPulse";
import { ActiveWorkZone } from "@/components/dashboard/ActiveWorkZone";
import { ScoreDashboardCard } from "@/components/dashboard/ScoreDashboardCard";
import { SuggestionsPanel } from "@/components/dashboard/SuggestionsPanel";
import { ProgressSnapshot } from "@/components/dashboard/ProgressSnapshot";
import { PeerBenchmark } from "@/components/dashboard/PeerBenchmark";
import { EyesOnYou } from "@/components/dashboard/EyesOnYou";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-full overflow-x-hidden">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome back, Arjun
          </h1>
          <p className="text-muted-foreground">
            Your innovation journey at a glance
          </p>
        </div>

        {/* Progress Pulse - Hero Section */}
        <div className="mb-8">
          <ProgressPulse />
        </div>

        {/* Score Dashboard Card */}
        <div className="mb-8">
          <ScoreDashboardCard />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left Column - Primary Content */}
          <div className="space-y-8 min-w-0">
            <ActiveWorkZone />
            <SuggestionsPanel />
          </div>

          {/* Right Column - Contextual Widgets */}
          <div className="space-y-4">
            <ProgressSnapshot />
            <PeerBenchmark />
            <EyesOnYou />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
