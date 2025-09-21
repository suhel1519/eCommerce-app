import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTheme } from "@/contexts/ThemeContext";

interface OptimizedThemeToggleProps {
  showSystemOption?: boolean;
  size?: "sm" | "default" | "lg";
  variant?: "ghost" | "outline" | "default";
}

export const OptimizedThemeToggle: React.FC<OptimizedThemeToggleProps> = ({
  showSystemOption = false,
  size = "sm",
  variant = "ghost"
}) => {
  const { state, toggleTheme, setTheme } = useCustomTheme();

  if (state.isLoading) {
    return (
      <Button variant={variant} size={size} className="w-9 h-9 p-0" disabled>
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  if (showSystemOption) {
    return (
      <div className="flex items-center space-x-1 p-1 bg-muted rounded-lg">
        <Button
          variant={state.theme === 'light' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme('light')}
          className="w-8 h-8 p-0"
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" />
        </Button>
        <Button
          variant={state.theme === 'system' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme('system')}
          className="w-8 h-8 p-0"
          aria-label="System mode"
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          variant={state.theme === 'dark' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme('dark')}
          className="w-8 h-8 p-0"
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:bg-muted transition-colors duration-75"
      aria-label={`Switch to ${state.resolvedTheme === "light" ? "dark" : "light"} mode`}
    >
      {state.resolvedTheme === "light" ? (
        <Moon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-75" />
      ) : (
        <Sun className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-75" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
