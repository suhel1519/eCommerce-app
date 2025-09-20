import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({ title, value, change, className }: MetricCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <CardContent className="p-0">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <span
                className={cn(
                  "text-xs font-medium",
                  change.isPositive ? "text-dashboard-positive" : "text-dashboard-negative"
                )}
              >
                {change.isPositive ? "+" : ""}{change.value}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}