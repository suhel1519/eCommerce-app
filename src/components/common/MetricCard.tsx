import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { animations } from "@/lib/animations";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: LucideIcon;
  backgroundColor?: string;
  borderColor?: string;
  iconColor?: string;
  width?: string;
  height?: string;
  className?: string;
  animationDelay?: string;
}

export const MetricCard: React.FC<MetricCardProps> = React.memo(({
  title,
  value,
  change,
  icon: Icon,
  backgroundColor = "bg-white",
  borderColor,
  iconColor = "text-gray-500",
  width,
  height,
  className = "",
  animationDelay = "0ms"
}) => {
  const cardClasses = [
    backgroundColor,
    borderColor,
    animations.entrance.fadeIn,
    animations.interactive.card,
    className
  ].filter(Boolean).join(" ");

  const sizeClasses = [
    width,
    height
  ].filter(Boolean).join(" ");

  return (
    <Card 
      className={`${cardClasses} ${sizeClasses}`}
      style={{ animationDelay }}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
            {change && (
              <div className="flex items-center mt-1">
                {change.isPositive ? (
                  <TrendingUp className="h-3 w-3 text-green-500 dark:text-green-400 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 dark:text-red-400 mr-1" />
                )}
                <span className={`text-xs font-medium ${
                  change.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {change.isPositive ? '+' : ''}{change.value}%
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="ml-2">
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

MetricCard.displayName = "MetricCard";
