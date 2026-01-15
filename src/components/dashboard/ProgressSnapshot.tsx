import { Target, Trophy, CheckCircle, Building2, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProgressSnapshot() {
  return (
    <div className="rounded-xl bg-card p-5 shadow-card">
      <h3 className="mb-4 font-display text-sm font-semibold text-foreground">
        Industry Readiness Snapshot
      </h3>

      <div className="space-y-4">
        {/* Proof-of-Work Score - Radial Ring */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  className="stroke-secondary"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeDasharray={`${68 * 0.94} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
                68%
              </span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">PoW Score</span>
              <p className="text-xs text-muted-foreground/70">out of 100%</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Ready
          </Badge>
        </div>

        {/* Challenge Participation - Horizontal Bar */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Challenge Participation
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">3 of 5</span>
          </div>
          <div className="h-2 rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: "60%" }}
            />
          </div>
        </div>

        {/* Industry Feedback */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Industry Feedback
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              2 validated
            </span>
          </div>
        </div>

        {/* PPI Eligibility Tracker */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              PPI Eligibility
            </span>
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            2 partner firms
          </Badge>
        </div>

        {/* Artifacts Tracked */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Artifacts tracked
          </span>
          <span className="font-display font-semibold text-foreground">12</span>
        </div>
      </div>

      {/* Improvement Suggestion */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-accent/50 p-3">
        <ArrowUp className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          Complete 1 mentored project to reach{" "}
          <span className="font-medium text-foreground">80% readiness</span>
        </p>
      </div>
    </div>
  );
}
