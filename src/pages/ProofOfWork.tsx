import { Layout } from "@/components/layout/Layout";
import MetricsPanel from "@/components/proof-of-work/MetricsPanel";
import ProjectTimeline from "@/components/proof-of-work/ProjectTimeline";
import PortfolioSidebar from "@/components/proof-of-work/PortfolioSidebar";

const ProofOfWork = () => {
  return (
    <Layout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Proof-of-Work
          </h1>
          <p className="text-muted-foreground">
            Your real-world technical journey, documented
          </p>
        </div>

        {/* Top Metrics Panel */}
        <MetricsPanel />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ProjectTimeline />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <PortfolioSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProofOfWork;
