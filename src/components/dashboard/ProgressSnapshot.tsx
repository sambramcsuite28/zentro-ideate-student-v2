import { Lightbulb, FileCheck, Target, CheckCircle } from "lucide-react";

interface Stat {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { label: "Ideas Captured", value: 12, icon: <Lightbulb className="h-4 w-4" /> },
  { label: "Active Ideas", value: 4, icon: <Target className="h-4 w-4" /> },
  { label: "Challenge Submissions", value: 3, icon: <FileCheck className="h-4 w-4" /> },
];

export function ProgressSnapshot() {
  return (
    <div className="rounded-xl bg-card p-5 shadow-card">
      <h3 className="mb-4 font-display text-sm font-semibold text-foreground">
        Progress Snapshot
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-muted-foreground">{stat.icon}</div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <span className="font-display font-semibold text-foreground">
              {stat.value}
            </span>
          </div>
        ))}
        
        {/* Proof-of-Work Readiness */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">PoW Readiness</span>
            </div>
            <span className="text-sm font-medium text-foreground">68%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: "68%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
