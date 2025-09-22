import { useState, useEffect } from "react";
import { ChevronDown, Zap, Brain, Cpu, Code, Database, Network, Sparkles, Bot, Activity, Wifi, Power } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-slate-900/20" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {!showContent ? (
          /* Premium Loading Screen */
          <div className="space-y-12 animate-fade-in">
            {/* Logo and Title */}
            <div className="space-y-6">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 animate-neural-pulse animate-hologram-flicker">
                  <Brain className="w-16 h-16 text-white animate-neon-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl animate-ping"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-lg animate-pulse"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight animate-neon-pulse">
                  AIEC IITM
                </h1>
                <p className="text-xl md:text-2xl text-cyan-300 font-medium tracking-wide animate-hologram-flicker">
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
          /* Dynamic AI Interface */
          <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up max-w-7xl mx-auto">
            {/* Left Content - AI Interface */}
            <div className="space-y-8 text-left lg:text-left order-2 lg:order-1">
              {/* Cyberpunk AI Status Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative">
                  <div className={`w-5 h-5 rounded-full ${robotPulse ? 'bg-emerald-400' : 'bg-cyan-400'} transition-colors duration-500 animate-neural-pulse shadow-lg ${robotPulse ? 'shadow-emerald-400/50' : 'shadow-cyan-400/50'}`}>
                    <div className={`absolute inset-0 rounded-full ${robotPulse ? 'bg-emerald-400' : 'bg-cyan-400'} animate-ping opacity-75`}></div>
                  </div>
                </div>
                <span className="text-sm font-mono text-cyan-300 tracking-wider animate-hologram-flicker">
                  NEURAL STATUS: <span className={`${robotPulse ? 'text-emerald-400' : 'text-cyan-400'} animate-neon-pulse`}>{aiStatus}</span>
                </span>
              </div>
              
              {/* Cyberpunk Main Title */}
              <div className="space-y-8">
                <h1 className="text-6xl md:text-8xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight leading-none relative animate-neon-pulse">
                  AIEC IITM
                  <div className="absolute inset-0 text-6xl md:text-8xl lg:text-7xl xl:text-8xl font-black text-cyan-400/10 animate-hologram-distort">
                    AIEC IITM
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-2xl -z-10 animate-pulse"></div>
                </h1>
                
                {/* Animated Subtitle with Hologram Effect */}
                <div className="h-16 flex items-center justify-center">
                  <div className="relative">
                    <p className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl text-cyan-300 font-light animate-hologram-flicker">
                      {typedText}
                      <span className="animate-pulse text-cyan-400 text-3xl">|</span>
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-holographic-scan"></div>
                  </div>
                </div>
              </div>
              
              {/* Cyberpunk AI Description */}
              <div className="space-y-6">
                <div className="relative">
                  <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-lg animate-hologram-flicker">
                    From coding to creativity, we bridge human intelligence with artificial intelligence to shape 
                    <span className="text-cyan-400 font-medium animate-neon-pulse"> future-ready innovators</span>.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-holographic-scan"></div>
                </div>
                
                {/* Enhanced System Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="glass-card rounded-xl p-4 border border-emerald-500/30 animate-floating-panel">
                    <div className="flex items-center space-x-3 mb-2">
                      <Activity className="w-5 h-5 text-emerald-400 animate-neural-pulse" />
                      <span className="text-xs font-mono text-emerald-300 tracking-wider">NEURAL ACTIVITY</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-400 animate-neon-pulse">98.7%</div>
                    <div className="w-full bg-slate-800/50 rounded-full h-1 mt-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1 rounded-full animate-data-flow" style={{width: '98.7%'}}></div>
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-4 border border-purple-500/30 animate-floating-panel" style={{animationDelay: '0.5s'}}>
                    <div className="flex items-center space-x-3 mb-2">
                      <Cpu className="w-5 h-5 text-purple-400 animate-neural-pulse" />
                      <span className="text-xs font-mono text-purple-300 tracking-wider">AI PROCESSING</span>
                    </div>
                    <div className="text-2xl font-black text-purple-400 animate-neon-pulse">OPTIMAL</div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 border-0 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Bot className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Join AI Revolution</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-cyan-400 hover:text-cyan-400 px-8 py-3 text-base font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-cyan-400/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                  <Sparkles className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Explore Neural Networks</span>
                </Button>
              </div>
            </div>

            {/* Right Content - Animated Robot */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                {/* Holographic Grid Background */}
                <div className="absolute inset-0 w-96 h-96 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-transparent to-blue-500/30 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-4 border border-cyan-400/30 rounded-full"></div>
                  <div className="absolute inset-8 border border-blue-400/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-12 border border-purple-400/20 rounded-full"></div>
                </div>
                
                {/* Robot Container with Enhanced Effects */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                  {/* Dynamic Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${robotPulse ? 'from-cyan-500/30 via-blue-500/20 to-purple-500/30' : 'from-blue-500/20 via-purple-500/30 to-cyan-500/20'} rounded-full blur-3xl transition-all duration-2000`}></div>
                  
                  {/* Robot Image with Hover Effects */}
                  <div className="relative z-10 robot-container group cursor-pointer">
                    <div className={`transition-all duration-500 ${robotPulse ? 'scale-110' : 'scale-105'} group-hover:scale-115`}>
                      <img 
                        src="https://aiec-iitm.in/static/media/robot2.3dac1472b94749acbb23.png" 
                        alt="AI Robot" 
                        className="w-64 h-64 lg:w-80 lg:h-80 object-contain filter drop-shadow-2xl"
                        style={{
                          filter: `brightness(1.1) contrast(1.1) drop-shadow(0 0 30px rgba(34, 211, 238, 0.4))`
                        }}
                      />
                    </div>
                    
                    {/* Interactive Particles around Robot */}
                    <div className="absolute inset-0">
                      {particles.slice(0, 12).map((particle) => (
                        <div
                          key={particle.id}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-60"
                          style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating UI Elements */}
                  <div className="absolute top-4 right-4 glass-card rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <Power className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs font-mono text-slate-300">ONLINE</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 glass-card rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-3 h-3 text-purple-400" />
                      <span className="text-xs font-mono text-slate-300">CONNECTED</span>
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
