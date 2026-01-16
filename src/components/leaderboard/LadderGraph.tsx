import { motion } from "framer-motion";
import { Target } from "lucide-react";

interface LadderTier {
  label: string;
  range: string;
  percentage: number;
  isCurrentTier: boolean;
}

const tiers: LadderTier[] = [
  { label: "Top 1%", range: "Elite Innovators", percentage: 1, isCurrentTier: false },
  { label: "Top 5%", range: "Innovation Leaders", percentage: 5, isCurrentTier: false },
  { label: "Top 10%", range: "High Performers", percentage: 10, isCurrentTier: false },
  { label: "Top 15%", range: "Active Contributors", percentage: 15, isCurrentTier: true },
  { label: "Top 25%", range: "Rising Talent", percentage: 25, isCurrentTier: false },
  { label: "Top 50%", range: "Building Momentum", percentage: 50, isCurrentTier: false },
];

const LadderGraph = () => {
  const currentTierIndex = tiers.findIndex(t => t.isCurrentTier);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl bg-card p-6 shadow-card"
    >
      <h3 className="font-display font-semibold text-foreground mb-6">
        Your Position
      </h3>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-3">
          {tiers.map((tier, index) => {
            const isAbove = index < currentTierIndex;
            const isCurrent = tier.isCurrentTier;
            const isBelow = index > currentTierIndex;

            return (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`relative flex items-center gap-4 py-2 px-3 rounded-lg transition-colors ${
                  isCurrent 
                    ? "bg-primary/10 border border-primary/20" 
                    : isAbove 
                      ? "opacity-60" 
                      : ""
                }`}
              >
                {/* Node */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isAbove
                        ? "bg-accent border-2 border-border"
                        : "bg-card border-2 border-border"
                  }`}
                >
                  {isCurrent ? (
                    <span className="text-xs font-bold">#28</span>
                  ) : (
                    <div 
                      className={`w-2 h-2 rounded-full ${
                        isAbove ? "bg-muted-foreground" : "bg-border"
                      }`} 
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      isCurrent ? "text-primary" : "text-foreground"
                    }`}>
                      {tier.label}
                    </span>
                    {isCurrent && (
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        You are here
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {tier.range}
                  </span>
                </div>

                {/* Progress Bar Background */}
                <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      isCurrent 
                        ? "bg-primary" 
                        : isAbove 
                          ? "bg-muted-foreground" 
                          : "bg-border"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: isCurrent ? "85%" : isAbove ? "100%" : "0%" }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next Tier CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-lg bg-accent/50 border border-border"
      >
        <div className="flex items-start gap-3">
          <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              To reach Top 10%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Validate 1 more project OR win 1 industry challenge
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LadderGraph;
