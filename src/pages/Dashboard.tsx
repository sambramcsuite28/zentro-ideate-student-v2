import { Layout } from "@/components/layout/Layout";
import { LeftSidebar } from "@/components/dashboard/LeftSidebar";
import { DashboardFeed } from "@/components/dashboard/DashboardFeed";
import { RightSidebar } from "@/components/dashboard/RightSidebar";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container py-6 max-w-7xl">
        {/* LinkedIn-style 3-column layout */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr_300px]">
          {/* Left Sidebar - Profile & Metrics */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <LeftSidebar />
            </div>
          </aside>

          {/* Center - Feed */}
          <main className="min-w-0">
            <DashboardFeed />
          </main>

          {/* Right Sidebar - Actions & Trending */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;