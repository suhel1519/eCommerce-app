import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MuiThemeProvider } from "@/components/MuiThemeProvider";
import { AppSidebar } from "@/components/AppSidebar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { AppHeader } from "./components/AppHeader";

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Configure React Query with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <MuiThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="flex h-screen bg-gray-50">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <AppHeader />
                  <div className="flex flex-1 overflow-hidden">
                    <main className="flex-1 overflow-auto min-w-0">
                      <Suspense
                        fallback={
                          <div className="flex items-center justify-center h-full">
                            <LoadingSpinner size="lg" />
                          </div>
                        }
                      >
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/profile/*" element={<Profile />} />
                          <Route path="/projects" element={<div className="p-6">Projects Page</div>} />
                          <Route path="/courses" element={<div className="p-6">Courses Page</div>} />
                          <Route path="/account" element={<div className="p-6">Account Page</div>} />
                          <Route path="/corporate" element={<div className="p-6">Corporate Page</div>} />
                          <Route path="/blog" element={<div className="p-6">Blog Page</div>} />
                          <Route path="/social" element={<div className="p-6">Social Page</div>} />
                          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </Suspense>
                    </main>
                    <div className="hidden xl:block">
                      <NotificationsPanel />
                    </div>
                  </div>
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
