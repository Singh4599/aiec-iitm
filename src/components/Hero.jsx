import { useState, useEffect } from "react";
import { ChevronDown, Zap, Brain, Cpu, Code, Database, Network, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ id, showLoadingScreen }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(0);

  // Reset loading state on component mount
  useEffect(() => {
    if (showLoadingScreen) {
      setLoadingProgress(0);
      setIsLoaded(false);
      setShowContent(false);
    } else {
      // Skip loading animation
      setLoadingProgress(100);
      setIsLoaded(true);
      setShowContent(true);
      // Immediately notify that loading is complete
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('heroLoadingComplete'));
      }, 100);
    }
  }, [showLoadingScreen]);

  useEffect(() => {
    if (!showLoadingScreen) return; // Skip loading animation if not needed
    
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => {
              setShowContent(true);
              // Dispatch event to notify App component that loading is complete
              window.dispatchEvent(new CustomEvent('heroLoadingComplete'));
            }, 1000);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [showLoadingScreen]);

  const systemStatus = [
    { name: "NEURAL NETWORKS", status: "Active", icon: Brain, color: "from-emerald-400 to-teal-400" },
    { name: "ML MODELS", status: "Loading", icon: Database, color: "from-blue-400 to-cyan-400" },
    { name: "AI SYSTEMS", status: "Online", icon: Network, color: "from-purple-400 to-pink-400" },
  ];

  // Cycle through systems for dynamic effect
  useEffect(() => {
    const systemInterval = setInterval(() => {
      setCurrentSystem((prev) => (prev + 1) % systemStatus.length);
    }, 2000);
    return () => clearInterval(systemInterval);
  }, []);

  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {!showContent ? (
          /* Premium Loading Screen */
          <div className="space-y-12 animate-fade-in">
            {/* Logo and Title */}
            <div className="space-y-6">
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 animate-pulse">
                  <Brain className="w-12 h-12 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl animate-ping"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tight">
                  AIEC IITM
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-wide">
                  AI Experience Centre
                </p>
              </div>
            </div>

            {/* Dynamic System Status */}
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm font-mono text-slate-300 tracking-wider">
                  Initializing AI Systems
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-80 mx-auto">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-slate-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-500 ease-out relative"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <p className="text-sm font-mono text-slate-400 mt-2 tracking-wider">
                  {Math.round(loadingProgress)}% Complete
                </p>
              </div>
            </div>

            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {systemStatus.map((system, index) => (
                <div 
                  key={system.name}
                  className={`relative group transition-all duration-500 ${
                    currentSystem === index ? 'scale-105' : 'scale-100 opacity-70'
                  }`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300">
                    <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${system.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <system.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 tracking-wider">
                      {system.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        system.status === 'Active' || system.status === 'Online' 
                          ? 'bg-emerald-400 animate-pulse' 
                          : 'bg-amber-400 animate-bounce'
                      }`}></div>
                      <span className={`text-xs font-mono ${
                        system.status === 'Active' || system.status === 'Online' 
                          ? 'text-emerald-400' 
                          : 'text-amber-400'
                      }`}>
                        {system.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Glow effect for active system */}
                  {currentSystem === index && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${system.color} opacity-20 rounded-2xl blur-xl -z-10 animate-pulse`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Premium Main Content */
          <div className="space-y-12 animate-fade-in-up">
            <div className="space-y-8">
              {/* Hero Logo */}
              <div className="relative">
                <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25 animate-float">
                  <Brain className="w-14 h-14 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl animate-pulse"></div>
                </div>
              </div>
              
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tight leading-none">
                  AIEC IITM
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light tracking-wide">
                Powering the Future with <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">Artificial Intelligence</span>
              </p>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                From coding to creativity, we bridge human intelligence with artificial intelligence to shape 
                <span className="text-blue-400 font-medium"> future-ready innovators</span>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border-0"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Join Us
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-blue-400 hover:text-blue-400 px-10 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Code className="w-5 h-5 mr-2" />
                Explore Events
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-20 animate-bounce">
              <div className="w-6 h-10 border-2 border-slate-600 rounded-full mx-auto flex justify-center">
                <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 tracking-wider">SCROLL TO EXPLORE</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
