import { BarChart3, GitBranch, FlaskConical } from "lucide-react";

interface Benchmark {
  icon: React.ReactNode;
  metric: string;
  comparison: string;
  percentile?: number;
}

const benchmarks: Benchmark[] = [
  {
    icon: <GitBranch className="h-4 w-4" />,
    metric: "GitHub-linked projects",
    comparison: "Top 10% peers have 3+. You have 1.",
    percentile: 35,
  },
  {
    icon: <FlaskConical className="h-4 w-4" />,
    metric: "R&D Index",
    comparison: "You're in 40th percentile",
    percentile: 40,
  },
];

function getPercentileColor(percentile: number): string {
  if (percentile >= 70) return "bg-success";
  if (percentile >= 40) return "bg-warning";
  return "bg-info";
}

export function PeerBenchmark() {
  return (
    <div className="rounded-xl bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h3 className="font-display text-sm font-semibold text-foreground">
          Peer Benchmark
        </h3>
      </div>
      
      <div className="space-y-4">
        {benchmarks.map((benchmark) => (
          <div key={benchmark.metric} className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-muted-foreground">{benchmark.icon}</div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {benchmark.metric}
                </p>
                <p className="text-xs text-muted-foreground">
                  {benchmark.comparison}
                </p>
              </div>
            </div>
            {benchmark.percentile && (
              <div className="ml-7 h-1.5 rounded-full bg-secondary">
                <div
                  className={`h-1.5 rounded-full transition-all ${getPercentileColor(benchmark.percentile)}`}
                  style={{ width: `${benchmark.percentile}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
