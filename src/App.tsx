import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-dashboard-bg transition-colors duration-300">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <header className="h-16 flex items-center justify-between border-b bg-card px-6 animate-fade-in">
                  <SidebarTrigger className="button-press" />
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover-lift transition-transform duration-200">
                      <span className="text-xs font-medium text-primary-foreground">A</span>
                    </div>
                  </div>
                </header>
                <main className="flex-1 p-6 animate-slide-up">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/orders" element={<Orders />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
