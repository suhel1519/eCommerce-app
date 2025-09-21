import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface HeaderButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "icon";
  variant?: "ghost" | "default" | "destructive" | "outline" | "secondary";
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className = "",
  size = "icon",
  variant = "ghost"
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`p-2 text-muted-foreground hover:text-card-foreground ${className}`}
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
};
