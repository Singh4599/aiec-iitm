import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
// import TestComponent from "./TestComponent";
import Navbar from "./components/Navbar";
import CyberpunkBackground from "./components/CyberpunkBackground";
import SplashCursor from "./components/SplashCursor";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  // Loading disabled - app loads immediately
  // useEffect(() => {
  //   // Check if this is internal navigation (not a page load/reload)
  //   const hasLoadedInSession = sessionStorage.getItem('hasLoadedBefore');
  //   const isPageLoad = !hasLoadedInSession || performance.navigation.type === performance.navigation.TYPE_RELOAD;
  //   
  //   if (isPageLoad) {
  //     // First load or page reload - show loading screen
  //     setShowLoadingScreen(true);
  //     setIsAppLoaded(false);
  //     
  //     // Listen for loading completion from Hero component
  //     const handleLoadingComplete = () => {
  //       setIsAppLoaded(true);
  //       sessionStorage.setItem('hasLoadedBefore', 'true');
  //     };

  //     window.addEventListener('heroLoadingComplete', handleLoadingComplete);
  //     
  //     return () => {
  //       window.removeEventListener('heroLoadingComplete', handleLoadingComplete);
  //     };
  //   } else {
  //     // Internal navigation - skip loading
  //     setShowLoadingScreen(false);
  //     setIsAppLoaded(true);
  //   }
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="aiec-ui-theme">
        <TooltipProvider>
          <Toaster />
          <SonnerToaster />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="min-h-screen relative transition-all duration-300 ease-in-out">
            {/* Advanced 3D Cyberpunk Background */}
            <CyberpunkBackground />
            {/* Splash Cursor Effect */}
            <SplashCursor />
            {/* <TestComponent /> */}
            <Navbar />
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
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
