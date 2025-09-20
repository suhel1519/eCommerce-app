import {
  Home,
  BarChart3,
  Users,
  ShoppingCart,
  Layers,
  Settings,
  FileText,
  PieChart,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

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

const mainItems = [
  { title: "Analytics", url: "/", icon: BarChart3 },
  { title: "Overview", url: "/overview", icon: Home },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Projects", url: "/projects", icon: Layers },
];

const secondaryItems = [
  { title: "User Profile", url: "/profile", icon: UserCheck },
  { title: "Overview", url: "/overview", icon: Home },
  { title: "Campaigns", url: "/campaigns", icon: TrendingUp },
  { title: "Components", url: "/components", icon: Layers },
  { title: "Features", url: "/features", icon: FileText },
  { title: "Followers", url: "/followers", icon: Users },
  { title: "Billing", url: "/billing", icon: PieChart },
  { title: "Blog", url: "/blog", icon: FileText },
  { title: "Studio", url: "/studio", icon: Settings },
];

export function AppSidebar() {
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium animate-scale-in"
      : "text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200 hover-lift";

  return (
    <Sidebar className="w-64 border-r bg-card transition-colors duration-300">
      <SidebarContent className="px-4 py-6 animate-fade-in">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <SidebarMenuButton asChild className="h-9 button-press">
                    <NavLink to={item.url} end className={getNavClasses}>
                      <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Secondary
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${(index + mainItems.length) * 50}ms` }}>
                  <SidebarMenuButton asChild className="h-9 button-press">
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}