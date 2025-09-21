import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { animations } from "@/lib/animations";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Custom SVG Icon component
interface SvgIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ src, alt, size = 20, className = "" }) => {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`${className} dark:invert dark:brightness-0 dark:contrast-200`}
    />
  );
};

// TypeScript interfaces for better type safety
interface MenuItem {
  title: string;
  url: string;
  iconSrc: string;
  isActive?: boolean;
  subItems?: MenuItem[];
  isExpandable?: boolean;
  isFavorite?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Menu configuration
const favoriteItems: MenuItem[] = [
  { title: "Overview", url: "/overview", iconSrc: "", isFavorite: true },
  { title: "Projects", url: "/projects", iconSrc: "", isFavorite: true },
];

const dashboardItems: MenuItem[] = [
  { title: "Default", url: "/", iconSrc: "/ChartPieSlice.svg", isActive: true },
  { title: "eCommerce", url: "/commerce", iconSrc: "/e-commerce.svg" },
  { title: "Projects", url: "/projects", iconSrc: "/project.svg" },
  { title: "Online Courses", url: "/courses", iconSrc: "/online-courses.svg" },
];

// User Profile sub-items
const userProfileSubItems: MenuItem[] = [
  { title: "Overview", url: "/profile/overview", iconSrc: "" },
  { title: "Projects", url: "/profile/projects", iconSrc: "" },
  { title: "Campaigns", url: "/profile/campaigns", iconSrc: "" },
  { title: "Documents", url: "/profile/documents", iconSrc: "" },
  { title: "Followers", url: "/profile/followers", iconSrc: "" },
];

const pageItems: MenuItem[] = [
  {
    title: "User Profile",
    url: "/profile",
    iconSrc: "/user-profile.svg",
    isExpandable: true,
    subItems: userProfileSubItems
  },
  { title: "Orders", url: "/orders", iconSrc: "/e-commerce.svg" },
];

const accountItems: MenuItem[] = [
  { title: "Account", url: "/account", iconSrc: "/account.svg" },
  { title: "Corporate", url: "/corporate", iconSrc: "/corporate.svg" },
  { title: "Blog", url: "/blog", iconSrc: "/notebook.svg" },
  { title: "Social", url: "/social", iconSrc: "/social.svg" },
];

const menuSections: MenuSection[] = [
  { title: "Favorites", items: favoriteItems },
  { title: "Dashboards", items: dashboardItems },
  { title: "Pages", items: pageItems },
  { title: "", items: accountItems }, // No title for account section
];

// Reusable components
interface SidebarMenuItemProps {
  item: MenuItem;
  isClickable?: boolean;
  level?: number;
}

const SidebarMenuItemComponent: React.FC<SidebarMenuItemProps> = ({ item, isClickable = true, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const baseClasses = "flex items-center justify-between px-3 py-2 text-sm rounded-md";
  const interactiveClasses = `${baseClasses} ${animations.transition.smooth} ${animations.focus.outline}`;
  const indentClass = level > 0 ? "ml-6" : "";

  if (!isClickable) {
    return (
      <SidebarMenuItem>
        <div className={`${baseClasses} text-muted-foreground ${indentClass}`} role="menuitem">
          <div className="flex items-center space-x-3">
            {item.isFavorite ? (
              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
            ) : (
              <ChevronRight size={12} className="text-muted-foreground" aria-hidden="true" />
            )}
            {item.iconSrc && (
              <SvgIcon src={item.iconSrc} alt={`${item.title} icon`} />
            )}
            <span>{item.title}</span>
          </div>
        </div>
      </SidebarMenuItem>
    );
  }

  if (item.isExpandable && item.subItems) {
    return (
      <>
        <SidebarMenuItem>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${interactiveClasses} w-full text-muted-foreground hover:bg-muted/50 hover:text-card-foreground ${indentClass}`}
            role="menuitem"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`}
          >
            <div className="flex items-center space-x-3">
              <SvgIcon src={item.iconSrc} alt={`${item.title} icon`} />
              <span>{item.title}</span>
            </div>
            {isExpanded ? (
              <ChevronDown size={16} aria-hidden="true" />
            ) : (
              <ChevronRight size={16} aria-hidden="true" />
            )}
          </button>
        </SidebarMenuItem>
        {isExpanded && item.subItems.map((subItem, index) => (
          <SidebarMenuItemComponent
            key={`${subItem.url}-${index}`}
            item={subItem}
            isClickable={true}
            level={level + 1}
          />
        ))}
      </>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            `${interactiveClasses} ${isActive || item.isActive
              ? 'bg-muted text-card-foreground font-medium'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-card-foreground'
            } ${indentClass}`
          }
          role="menuitem"
          aria-label={`Navigate to ${item.title}`}
        >
          {({ isActive }) => (
            <div className="flex items-center space-x-3">
              {isActive || item.isActive ? (
                <div className="w-1 h-4 bg-foreground rounded-sm" />
              ) : (
                <ChevronRight size={12} className="text-muted-foreground" aria-hidden="true" />
              )}
              <SvgIcon src={item.iconSrc} alt={`${item.title} icon`} />
              <span>{item.title}</span>
            </div>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

interface MenuSectionProps {
  section: MenuSection;
  isClickable?: boolean;
}

const MenuSectionComponent: React.FC<MenuSectionProps> = ({ section, isClickable = true }) => {
  return (
    <SidebarGroup className={section.title ? "mt-6" : "mt-6"}>
      {section.title && (
        <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          {section.title}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1" role="menu" aria-label={section.title || "Menu"}>
          {section.items.map((item, index) => (
            <SidebarMenuItemComponent
              key={`${item.url}-${index}`}
              item={item}
              isClickable={isClickable}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-card transition-colors duration-75" role="navigation" aria-label="Main navigation">
      <SidebarContent className="p-4">
        {/* User Profile */}
        <div className={`flex items-center space-x-3 mb-6 p-2 ${animations.entrance.slideLeft}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/ByeWind.svg" alt="ByeWind company logo" />
          </Avatar>
          <span className="font-medium text-card-foreground">ByeWind</span>
        </div>

        {/* Render Favorites as non-clickable */}
        <MenuSectionComponent section={menuSections[0]} isClickable={false} />

        {/* Render other sections as clickable */}
        {menuSections.slice(1).map((section, index) => (
          <MenuSectionComponent
            key={section.title || `section-${index}`}
            section={section}
            isClickable={true}
          />
        ))}
      </SidebarContent>
    </Sidebar>
  );
}