import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    // Check if this is internal navigation (not a page load/reload)
    const hasLoadedInSession = sessionStorage.getItem('hasLoadedBefore');
    const isPageLoad = !hasLoadedInSession || performance.navigation.type === performance.navigation.TYPE_RELOAD;
    
    if (isPageLoad) {
      // First load or page reload - show loading screen
      setShowLoadingScreen(true);
      setIsAppLoaded(false);
      
      // Listen for loading completion from Hero component
      const handleLoadingComplete = () => {
        setIsAppLoaded(true);
        sessionStorage.setItem('hasLoadedBefore', 'true');
      };

      window.addEventListener('heroLoadingComplete', handleLoadingComplete);
      
      return () => {
        window.removeEventListener('heroLoadingComplete', handleLoadingComplete);
      };
    } else {
      // Internal navigation - skip loading
      setShowLoadingScreen(false);
      setIsAppLoaded(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-slate-900">
            {isAppLoaded && <Navbar />}
            <Routes>
              <Route path="/" element={<Home isAppLoaded={isAppLoaded} showLoadingScreen={showLoadingScreen} />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
