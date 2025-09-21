import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomThemeProvider } from "@/contexts/ThemeContext";
import { MuiThemeProvider } from "@/components/MuiThemeProvider";
import { AppProvider } from "@/contexts/AppContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { AppSidebar } from "@/components/AppSidebar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AppHeader } from "@/components/AppHeader";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Import pages directly to avoid circular dependency issues
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import NotFound from "@/pages/NotFound";
import { NotificationsPanel } from "@/components/NotificationsPanel";

// Configure React Query with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider defaultTheme="light" enableSystem disableTransitionOnChange>
        <MuiThemeProvider>
          <AppProvider>
            <DashboardProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <SidebarProvider>
                    <ErrorBoundary fallback={<div className="flex items-center justify-center h-screen">Layout Error</div>}>
                      <div className="flex h-screen bg-background transition-colors duration-75">
                        <AppSidebar />
                        <div className="flex-1 flex flex-col">
                          <AppHeader />
                          <div className="flex flex-1 overflow-hidden">
                            <main className="flex-1 overflow-auto min-w-0">
                              <ErrorBoundary fallback={<div className="p-6">Route Error</div>}>
                                <Routes>
                                  <Route path="/" element={<Dashboard />} />
                                  <Route path="/orders" element={<Orders />} />
                                  <Route path="/projects" element={<div className="p-6">Projects Page</div>} />
                                  <Route path="/courses" element={<div className="p-6">Courses Page</div>} />
                                  <Route path="/account" element={<div className="p-6">Account Page</div>} />
                                  <Route path="/corporate" element={<div className="p-6">Corporate Page</div>} />
                                  <Route path="/blog" element={<div className="p-6">Blog Page</div>} />
                                  <Route path="/social" element={<div className="p-6">Social Page</div>} />
                                  <Route path="*" element={<NotFound />} />
                                </Routes>
                              </ErrorBoundary>
                            </main>
                            <div className="hidden xl:block">
                              <ErrorBoundary fallback={<div className="w-72 h-full bg-card">Panel Error</div>}>
                                <NotificationsPanel />
                              </ErrorBoundary>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ErrorBoundary>
                  </SidebarProvider>
                </BrowserRouter>
              </TooltipProvider>
            </DashboardProvider>
          </AppProvider>
        </MuiThemeProvider>
      </CustomThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
