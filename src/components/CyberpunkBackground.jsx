import React, { useEffect, useState, useMemo } from 'react';

const CyberpunkBackground = () => {
  const [particles, setParticles] = useState([]);
  const [matrixRain, setMatrixRain] = useState([]);
  const [hologramPanels, setHologramPanels] = useState([]);
  const [stars, setStars] = useState([]);
  const [galaxyParticles, setGalaxyParticles] = useState([]);

  useEffect(() => {
    // Generate particles (reduced for better performance)
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      color: ['cyan-400', 'blue-400', 'purple-400', 'pink-400', 'emerald-400'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);

    // Generate matrix rain (reduced for better performance)
    const matrixArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      speed: Math.random() * 3 + 2,
      characters: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    }));
    setMatrixRain(matrixArray);

    // Generate hologram panels (reduced for better performance)
    const panelArray = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      width: Math.random() * 200 + 150,
      height: Math.random() * 150 + 100,
      rotation: Math.random() * 360,
      delay: Math.random() * 3,
      type: ['terminal', 'graph', 'code', 'data'][Math.floor(Math.random() * 4)],
    }));
    setHologramPanels(panelArray);

    // Generate animated stars
    const starArray = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setStars(starArray);

    // Generate galaxy particles
    const galaxyArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      color: ['cyan', 'blue', 'purple', 'pink', 'white'][Math.floor(Math.random() * 5)],
      direction: Math.random() * 360,
    }));
    setGalaxyParticles(galaxyArray);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      {/* Base Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900"></div>
      
      {/* Animated Starfield */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: 'white',
              opacity: star.opacity,
              animationDuration: `${star.twinkleSpeed}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
            }}
          />
        ))}
      </div>

      {/* Dynamic Galaxy Particles */}
      <div className="absolute inset-0">
        {galaxyParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-cosmic-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: 
                particle.color === 'cyan' ? '#00ffff' :
                particle.color === 'blue' ? '#0080ff' :
                particle.color === 'purple' ? '#8000ff' :
                particle.color === 'pink' ? '#ff00ff' : '#ffffff',
              animationDuration: `${particle.speed}s`,
              animationDelay: `${particle.delay}s`,
              color: 
                particle.color === 'cyan' ? '#00ffff' :
                particle.color === 'blue' ? '#0080ff' :
                particle.color === 'purple' ? '#8000ff' :
                particle.color === 'pink' ? '#ff00ff' : '#ffffff',
              opacity: 0.7,
              '--drift-x': `${(Math.random() - 0.5) * 300}px`,
              '--drift-y': `${(Math.random() - 0.5) * 300}px`,
            }}
          />
        ))}
      </div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full animate-cyber-grid"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg)',
          }}
        ></div>
      </div>

      {/* Enhanced Matrix Rain Effect */}
      <div className="absolute inset-0">
        {matrixRain.map((rain) => (
          <div
            key={rain.id}
            className="absolute text-cyan-400 font-mono text-sm opacity-60 animate-matrix-rain"
            style={{
              left: `${rain.x}%`,
              animationDelay: `${rain.delay}s`,
              animationDuration: `${rain.speed}s`,
              textShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
            }}
          >
            {rain.characters.split('').slice(0, 20).map((char, index) => (
              <div
                key={index}
                className="block leading-tight"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: Math.max(0.2, 1 - (index * 0.05)),
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Floating Holographic Panels */}
      <div className="absolute inset-0">
        {hologramPanels.map((panel) => (
          <div
            key={panel.id}
            className="absolute animate-floating-panel animate-hologram-flicker"
            style={{
              left: `${panel.x}%`,
              top: `${panel.y}%`,
              width: `${panel.width}px`,
              height: `${panel.height}px`,
              animationDelay: `${panel.delay}s`,
              transform: `rotateY(${panel.rotation}deg)`,
            }}
          >
            <HologramPanel type={panel.type} />
          </div>
        ))}
      </div>

      {/* 3D Particle System */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute animate-particle-drift`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              '--random-x': `${(Math.random() - 0.5) * 200}px`,
              '--random-y': `${(Math.random() - 0.5) * 200}px`,
              '--random-z': `${(Math.random() - 0.5) * 100}px`,
            }}
          >
            <div
              className={`w-full h-full rounded-full opacity-60 animate-neural-pulse ${
                particle.color === 'cyan-400' ? 'bg-cyan-400' :
                particle.color === 'blue-400' ? 'bg-blue-400' :
                particle.color === 'purple-400' ? 'bg-purple-400' :
                particle.color === 'pink-400' ? 'bg-pink-400' :
                'bg-emerald-400'
              }`}
              style={{
                boxShadow: `0 0 10px ${
                  particle.color === 'cyan-400' ? '#22d3ee' :
                  particle.color === 'blue-400' ? '#60a5fa' :
                  particle.color === 'purple-400' ? '#c084fc' :
                  particle.color === 'pink-400' ? '#f472b6' :
                  '#34d399'
                }`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Neon Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0080ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8000ff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Animated Circuit Paths */}
        <path
          d="M0,100 Q200,50 400,100 T800,100 L1000,150 Q1200,100 1400,150"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,5"
          className="animate-cyber-circuit"
        />
        <path
          d="M100,0 Q150,200 200,400 T300,800 L350,1000 Q400,1200 450,1400"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8,4"
          className="animate-cyber-circuit"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M1400,200 Q1200,250 1000,200 T600,200 L400,250 Q200,200 0,250"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="12,6"
          className="animate-cyber-circuit"
          style={{ animationDelay: '2s' }}
        />
      </svg>

      {/* Holographic Scan Lines */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-holographic-scan"></div>
        <div 
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-holographic-scan"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      {/* Enhanced Ambient Light Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-emerald-400/12 rounded-full blur-3xl animate-float" style={{animationDelay: '6s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-56 h-56 bg-pink-400/8 rounded-full blur-3xl animate-float" style={{animationDelay: '8s'}}></div>
      </div>

      {/* Distortion Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-transparent animate-hologram-distort"></div>
    </div>
  );
};

// Holographic Panel Component
const HologramPanel = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case 'terminal':
        return (
          <div className="p-4 font-mono text-xs text-green-400">
            <div className="mb-2 text-cyan-400">$ system.status</div>
            <div className="opacity-80">NEURAL_NET: ACTIVE</div>
            <div className="opacity-80">AI_CORE: ONLINE</div>
            <div className="opacity-60">MEMORY: 98.7% OPTIMAL</div>
            <div className="opacity-60">PROCESSING: 1.2THz</div>
            <div className="mt-2 animate-pulse">$ _</div>
          </div>
        );
      case 'graph':
        return (
          <div className="p-4">
            <div className="text-xs text-cyan-400 mb-2">NEURAL ACTIVITY</div>
            <div className="flex items-end space-x-1 h-16">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-t from-cyan-500 to-blue-400 opacity-70 animate-pulse"
                  style={{
                    width: '8px',
                    height: `${Math.random() * 60 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      case 'code':
        return (
          <div className="p-4 font-mono text-xs text-blue-400">
            <div className="opacity-80">function aiProcess() {'{'}</div>
            <div className="opacity-60 ml-4">neural.compute();</div>
            <div className="opacity-60 ml-4">data.analyze();</div>
            <div className="opacity-60 ml-4">return result;</div>
            <div className="opacity-80">{'}'}</div>
            <div className="mt-2 text-green-400 animate-pulse">// EXECUTING...</div>
          </div>
        );
      case 'data':
        return (
          <div className="p-4 text-xs">
            <div className="text-purple-400 mb-2">DATA STREAM</div>
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>CPU:</span>
                <span className="text-cyan-400">87%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GPU:</span>
                <span className="text-green-400">92%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>RAM:</span>
                <span className="text-yellow-400">76%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>NET:</span>
                <span className="text-purple-400 animate-pulse">ACTIVE</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-cyan-500/40 rounded-lg backdrop-blur-md bg-black/60 animate-hologram-flicker shadow-2xl shadow-cyan-500/20">
      {renderContent()}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 rounded-lg"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
    </div>
  );
};

export default CyberpunkBackground;
