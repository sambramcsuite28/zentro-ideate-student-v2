import { Eye, User } from "lucide-react";

interface Viewer {
  name: string;
  role: string;
  timestamp: string;
}

const viewers: Viewer[] = [
  {
    name: "Dr. Sharma",
    role: "Innovation Cell",
    timestamp: "2 days ago",
  },
  {
    name: "Mahindra Reviewer",
    role: "Challenge Evaluator",
    timestamp: "1 week ago",
  },
];

export function EyesOnYou() {
  return (
    <div className="rounded-xl bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <Eye className="h-4 w-4 text-primary" />
        <h3 className="font-display text-sm font-semibold text-foreground">
          Eyes on You
        </h3>
      </div>
      
      {viewers.length > 0 ? (
        <div className="space-y-3">
          {viewers.map((viewer, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <User className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {viewer.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {viewer.role}
                </p>
              </div>
              <span className="text-xs text-muted-foreground/70 shrink-0">
                {viewer.timestamp}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No meaningful views yet
        </p>
      )}
    </div>
  );
}
