import { useState, useEffect } from "react";
import { ChevronDown, Zap, Brain, Cpu, Code, Database, Network, Sparkles, Bot, Activity, Wifi, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import Galaxy from "./Galaxy";

const Hero = ({ id, showLoadingScreen }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [robotPulse, setRobotPulse] = useState(false);
  const [aiStatus, setAiStatus] = useState("INITIALIZING");

  const fullText = "Powering the Future with AI";

  // Reset loading state on component mount
  useEffect(() => {
    if (showLoadingScreen) {
      setLoadingProgress(0);
      setIsLoaded(false);
      setShowContent(false);
      
      // Faster loading simulation
      const loadingInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
              setIsLoaded(true);
              setTimeout(() => setShowContent(true), 200);
            }, 300);
            return 100;
          }
          return prev + Math.random() * 25 + 15;
        });
      }, 60);

      return () => clearInterval(loadingInterval);
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

  // Typing animation effect
  useEffect(() => {
    if (showContent) {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }
  }, [showContent]);

  // Robot pulse effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setRobotPulse(prev => !prev);
    }, 2000);
    return () => clearInterval(pulseInterval);
  }, []);

  // AI Status cycling
  useEffect(() => {
    const statuses = ["INITIALIZING", "PROCESSING", "LEARNING", "OPTIMIZING", "READY"];
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      setAiStatus(statuses[statusIndex]);
      statusIndex = (statusIndex + 1) % statuses.length;
    }, 3000);
    return () => clearInterval(statusInterval);
  }, []);

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
    { name: "NEURAL NETWORKS", status: "ACTIVE", icon: Brain, color: "from-emerald-400 to-teal-400", pulse: true },
    { name: "QUANTUM PROCESSING", status: "ONLINE", icon: Cpu, color: "from-blue-400 to-cyan-400", pulse: false },
    { name: "AI CORE", status: "OPTIMIZED", icon: Bot, color: "from-purple-400 to-pink-400", pulse: true },
    { name: "DEEP LEARNING", status: "TRAINING", icon: Database, color: "from-orange-400 to-red-400", pulse: false },
  ];

  // Cycle through systems for dynamic effect
  useEffect(() => {
    const systemInterval = setInterval(() => {
      setCurrentSystem((prev) => (prev + 1) % systemStatus.length);
    }, 2000);
    return () => clearInterval(systemInterval);
  }, []);

  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-bg">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={0.8}
          glowIntensity={0.4}
          saturation={0.3}
          hueShift={240}
          speed={0.8}
          twinkleIntensity={0.2}
          rotationSpeed={0.05}
          transparent={true}
        />
        {/* Cyberpunk gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/10 to-black"></div>
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1 animate-scan-line"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {!showContent ? (
          /* 3D Dynamic Loading Screen */
          <div className="space-y-12 animate-fade-in">
            {/* 3D Logo and Title */}
            <div className="space-y-8">
              <div className="relative">
                {/* 3D Rotating Cube */}
                <div className="w-40 h-40 mx-auto relative perspective-1000">
                  <div className="absolute inset-0 transform-gpu animate-spin-slow" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl shadow-2xl shadow-cyan-500/50 animate-neural-pulse" style={{ transform: 'rotateY(0deg) translateZ(20px)' }}>
                      <Brain className="w-20 h-20 text-white animate-neon-pulse mx-auto mt-8" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl shadow-2xl shadow-purple-500/50 animate-neural-pulse" style={{ transform: 'rotateY(90deg) translateZ(20px)' }}>
                      <Cpu className="w-20 h-20 text-white animate-neon-pulse mx-auto mt-8" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-2xl shadow-2xl shadow-blue-500/50 animate-neural-pulse" style={{ transform: 'rotateY(180deg) translateZ(20px)' }}>
                      <Bot className="w-20 h-20 text-white animate-neon-pulse mx-auto mt-8" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl shadow-2xl shadow-pink-500/50 animate-neural-pulse" style={{ transform: 'rotateY(270deg) translateZ(20px)' }}>
                      <Database className="w-20 h-20 text-white animate-neon-pulse mx-auto mt-8" />
                    </div>
                  </div>
                  {/* 3D Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-3xl blur-2xl animate-pulse"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight animate-neon-pulse">
                  AIEC IITM
                </h1>
                <p className="text-2xl md:text-3xl text-cyan-300 font-medium tracking-wide animate-hologram-flicker">
                  AI Experience Centre
                </p>
              </div>
            </div>

            {/* Dynamic System Status */}
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-neural-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-neural-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-neural-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '400ms' }}></div>
                </div>
                <span className="text-sm font-mono text-cyan-300 tracking-wider animate-hologram-flicker">
                  INITIALIZING NEURAL NETWORKS
                </span>
              </div>
              
              {/* Cyberpunk Progress Bar */}
              <div className="w-96 mx-auto">
                <div className="glass-card rounded-full h-4 overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-500 ease-out relative animate-hologram-flicker"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-data-flow"></div>
                    <div className="absolute inset-0 bg-cyan-400/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-mono text-cyan-300 tracking-wider animate-neon-pulse">
                    NEURAL SYNC: {Math.round(loadingProgress)}%
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
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
                  <div className="glass-card rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 border border-cyan-500/20 animate-floating-panel">
                    <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${system.color} rounded-xl flex items-center justify-center shadow-2xl animate-neural-pulse`}>
                      <system.icon className="w-7 h-7 text-white animate-neon-pulse" />
                    </div>
                    <h3 className="text-sm font-bold text-cyan-300 mb-3 tracking-wider animate-hologram-flicker">
                      {system.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-3">
                      <div className={`w-3 h-3 rounded-full shadow-lg ${
                        system.status === 'Active' || system.status === 'Online' 
                          ? 'bg-emerald-400 animate-neural-pulse shadow-emerald-400/50' 
                          : 'bg-amber-400 animate-neural-pulse shadow-amber-400/50'
                      }`}></div>
                      <span className={`text-xs font-mono tracking-wider ${
                        system.status === 'Active' || system.status === 'Online' 
                          ? 'text-emerald-400 animate-neon-pulse' 
                          : 'text-amber-400 animate-neon-pulse'
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
          /* Dark Theme Hero Interface */
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up max-w-7xl mx-auto">
            {/* Left Content - Dark Theme Design */}
            <div className="space-y-8 text-left lg:text-left order-2 lg:order-1">
              {/* Cyberpunk Status Chip */}
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cyber-card cyber-glow">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 text-black mr-3 font-bold">01</span>
                <span className="cyber-primary font-mono">PURPOSE</span>
              </div>
              
              {/* Cyberpunk Main Title */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black cyber-text tracking-tight leading-tight">
                  <span className="cyber-primary">AIEC IITM</span>: Where Code<br className="hidden sm:inline" />Meets Innovation
                </h1>
                
                {/* Cyberpunk Subtitle */}
                <p className="text-xl md:text-2xl cyber-secondary leading-relaxed max-w-2xl font-mono">
                  The Artificial Intelligence Experience Centre that bridges human creativity with artificial intelligence to shape future-ready innovators.
                </p>
              </div>
              
              {/* Cyberpunk Description */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl cyber-text-muted leading-relaxed max-w-lg font-mono">
                  From coding to creativity, we bridge human intelligence with artificial intelligence to shape 
                  <span className="cyber-primary font-bold"> future-ready innovators</span>.
                </p>
              </div>

              {/* Cyberpunk Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="cyber-button px-8 py-4 text-base font-bold rounded-full font-mono relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-green-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Bot className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">JOIN AI REVOLUTION</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="cyber-border cyber-text hover:cyber-primary hover:cyber-glow px-8 py-4 text-base font-bold rounded-full font-mono transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                  <Sparkles className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">EXPLORE PROJECTS</span>
                </Button>
              </div>
            </div>

            {/* Right Content - Cyberpunk Robot Display */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                {/* Cyberpunk Robot Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                  {/* Cyberpunk Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/40 via-green-500/20 to-cyan-500/40 rounded-2xl blur-3xl cyber-glow"></div>
                  
                  {/* Robot Image with Cyberpunk Effects */}
                  <div className="relative z-10 robot-container group cursor-pointer">
                    <div className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-2">
                      <img 
                        src="https://aiec-iitm.in/static/media/robot2.3dac1472b94749acbb23.png" 
                        alt="AI Robot" 
                        className="w-64 h-64 lg:w-80 lg:h-80 object-contain rounded-2xl sm:rounded-3xl shadow-2xl filter drop-shadow-2xl"
                        style={{
                          filter: 'brightness(1.2) contrast(1.2) drop-shadow(0 0 30px rgba(0, 255, 136, 0.6))'
                        }}
                      />
                    </div>
                    
                    {/* Cyberpunk UI Elements */}
                    <div className="absolute top-4 right-4 cyber-card rounded-lg p-3 cyber-glow">
                      <div className="flex items-center space-x-2">
                        <Power className="w-4 h-4 cyber-primary" />
                        <span className="text-xs font-mono cyber-primary font-bold">ONLINE</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 cyber-card rounded-lg p-3 cyber-glow">
                      <div className="flex items-center space-x-2">
                        <Wifi className="w-4 h-4 cyber-secondary" />
                        <span className="text-xs font-mono cyber-secondary font-bold">CONNECTED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
