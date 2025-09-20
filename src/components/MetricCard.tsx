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
    <Card className={cn("p-6 hover-lift transition-all duration-300 hover:border-primary/20 group animate-scale-in", className)}>
      <CardContent className="p-0">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground transition-colors duration-200">{title}</h3>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-foreground transition-all duration-300 group-hover:scale-105">{value}</p>
            {change && (
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  change.isPositive ? "text-success" : "text-destructive"
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