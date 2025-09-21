import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Menu, Star, RotateCcw, Copy } from "lucide-react";
import { OptimizedThemeToggle } from "./OptimizedThemeToggle";
import { HeaderButton, SearchBar } from "@/components/common";
import { animations } from "@/lib/animations";

// Route to breadcrumb mapping
const routeBreadcrumbs: Record<string, { section: string; page: string }> = {
  "/": { section: "Dashboards", page: "Default" },
  "/orders": { section: "Pages", page: "Orders" },
  "/profile": { section: "Pages", page: "User Profile" },
  "/projects": { section: "Dashboards", page: "Projects" },
  "/courses": { section: "Dashboards", page: "Online Courses" },
  "/campaigns": { section: "Pages", page: "Campaigns" },
  "/documents": { section: "Pages", page: "Documents" },
  "/followers": { section: "Pages", page: "Followers" },
  "/account": { section: "Account", page: "Settings" },
  "/corporate": { section: "Account", page: "Corporate" },
  "/blog": { section: "Account", page: "Blog" },
  "/social": { section: "Account", page: "Social" },
};

interface AppHeaderProps {
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ className }) => {
  const location = useLocation();
  const breadcrumb = routeBreadcrumbs[location.pathname] || { section: "Pages", page: "Unknown" };

  return (
    <header className={`bg-card border-b border-border px-6 py-3 transition-colors duration-75 ${animations.entrance.slideDown}`}>
      <div className="flex items-center justify-between">
        {/* Left side - Navigation Icons and Breadcrumb */}
        <div className="flex items-center space-x-4">
          {/* Menu Icon */}
          <HeaderButton icon={Menu} label="Menu" />

          {/* Star Icon */}
          <HeaderButton icon={Star} label="Favorites" />

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">{breadcrumb.section}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-card-foreground font-medium">{breadcrumb.page}</span>
          </div>
        </div>

        {/* Right side - Search and Actions */}
        <div className={`flex items-center space-x-3 ${animations.entrance.slideLeft}`}>
          {/* Search Bar */}
          <SearchBar placeholder="Search" />

          {/* Theme Toggle */}
          <OptimizedThemeToggle />

          {/* Refresh Icon */}
          <HeaderButton icon={RotateCcw} label="Refresh" />

          {/* Notifications */}
          <HeaderButton icon={Bell} label="Notifications" />

          {/* Copy/Duplicate Icon */}
          <HeaderButton icon={Copy} label="Duplicate" />
        </div>
      </div>
    </header>
  );
};
