import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ElectricBorder from "@/components/ElectricBorder";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Github, ExternalLink, Users, Briefcase, Award, Code, Star, Globe, Lightbulb, Brain, Database, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Home = ({ isAppLoaded, showLoadingScreen }) => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    loadFeaturedContent();
    
    // Handle hash navigation when component loads and after loading is complete
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && isAppLoaded) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // Increased delay to ensure content is rendered
      }
    };

    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  // Handle hash navigation when app loading is complete
  useEffect(() => {
    if (isAppLoaded) {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000); // Wait for content to be fully rendered
      }
    }
  }, [isAppLoaded]);

  const loadFeaturedContent = async () => {
    try {
      // Load featured events
      const { data: events } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date')
        .limit(3);

      // Load featured projects
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      // Load team members
      const { data: team } = await supabase
        .from('team')
        .select('*')
        .order('position')
        .limit(4);

      if (events) setFeaturedEvents(events);
      if (projects) setFeaturedProjects(projects);
      if (team) setTeamMembers(team);
    } catch (error) {
      console.error('Error loading featured content:', error);
    }
  };

  return (
    <div className="min-h-screen cyber-bg">
      <Hero id="home" showLoadingScreen={showLoadingScreen} />
      
      {isAppLoaded && (
        <>
          {/* About Section */}
      <section id="about" className="py-20 px-4 cyber-bg/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-black mb-6 cyber-primary font-mono">
              ABOUT AIEC IITM
            </h2>
            <p className="text-xl cyber-text-muted max-w-4xl mx-auto leading-relaxed font-mono">
              The AIEC of IITM Janakpuri is a hub for innovation and learning in AI, ML, and emerging technologies. Through 
              workshops, projects, competitions, and industry collaborations, it equips students with hands-on skills to 
              become problem-solvers and innovators driving real-world impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="grid grid-cols-2 gap-6">
                <ElectricBorder color="#00ff88" speed={1.5} chaos={0.8} thickness={2} style={{ borderRadius: 16 }}>
                  <div className="cyber-card rounded-2xl p-6 hover:cyber-glow transition-all duration-300">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center cyber-glow">
                      <Code className="w-6 h-6 text-black font-bold" />
                    </div>
                    <h3 className="text-sm font-bold cyber-primary mb-2 text-center tracking-wider font-mono">DEVELOPMENT</h3>
                  </div>
                </ElectricBorder>
                
                <ElectricBorder color="#ff0088" speed={1.2} chaos={0.6} thickness={2} style={{ borderRadius: 16 }}>
                  <div className="cyber-card rounded-2xl p-6 hover:cyber-glow transition-all duration-300">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center cyber-glow">
                      <Brain className="w-6 h-6 text-white font-bold" />
                    </div>
                    <h3 className="text-sm font-bold cyber-primary mb-2 text-center tracking-wider font-mono">AI/ML</h3>
                  </div>
                </ElectricBorder>
                
                <ElectricBorder color="#00ff88" speed={1.8} chaos={1.0} thickness={2} style={{ borderRadius: 16 }}>
                  <div className="cyber-card rounded-2xl p-6 hover:cyber-glow transition-all duration-300">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-cyan-500 rounded-xl flex items-center justify-center cyber-glow">
                      <Lightbulb className="w-6 h-6 text-black font-bold" />
                    </div>
                    <h3 className="text-sm font-bold cyber-primary mb-2 text-center tracking-wider font-mono">INNOVATION</h3>
                  </div>
                </ElectricBorder>
                
                <ElectricBorder color="#ff6600" speed={1.3} chaos={0.7} thickness={2} style={{ borderRadius: 16 }}>
                  <div className="cyber-card rounded-2xl p-6 hover:cyber-glow transition-all duration-300">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center cyber-glow">
                      <Users className="w-6 h-6 text-white font-bold" />
                    </div>
                    <h3 className="text-sm font-bold cyber-primary mb-2 text-center tracking-wider font-mono">COMMUNITY</h3>
                  </div>
                </ElectricBorder>
              </div>
            </div>

            <ElectricBorder color="#00ff88" speed={1.0} chaos={0.5} thickness={3} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 animate-slide-in-right cyber-glow">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 cyber-primary rounded-full cyber-glow"></div>
                      <h3 className="text-lg font-bold cyber-text font-mono">BEYOND CAMPUS VISITS</h3>
                    </div>
                    <p className="cyber-text-muted text-sm font-mono">Exploring diverse opportunities outside the classroom.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 cyber-secondary rounded-full cyber-glow"></div>
                      <h3 className="text-lg font-bold cyber-text font-mono">EVENT SPHERE</h3>
                    </div>
                    <p className="cyber-text-muted text-sm font-mono">A vibrant space for fests, competitions, and collaborations.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 cyber-accent rounded-full cyber-glow"></div>
                      <h3 className="text-lg font-bold cyber-text font-mono">INNOVATIVE WORKSHOPS</h3>
                    </div>
                    <p className="cyber-text-muted text-sm font-mono">Hands-on learning with the latest AI & tech tools.</p>
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4 cyber-bg/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 cyber-primary font-mono">
              UPCOMING EVENTS
            </h2>
            <p className="text-xl cyber-text-muted font-mono">
              Exciting opportunities await—dive into workshops, fests designed to spark innovation and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* AIEC Orientation */}
            <ElectricBorder color="#ff0088" speed={1.2} chaos={0.6} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-6 cyber-glow">
                <div className="flex items-center justify-between mb-4">
                  <span className="cyber-accent bg-cyber-accent/20 text-cyber-accent px-3 py-1 rounded-full text-xs font-semibold font-mono">ORIENTATION</span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold font-mono">CLOSED</span>
                </div>
                <h3 className="text-xl font-bold cyber-text mb-3 font-mono">AIEC ORIENTATION</h3>
                <p className="cyber-text-muted text-sm mb-4 font-mono">
                  Kickstart your AIEC journey—explore our vision, departments, and opportunities.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <Calendar className="w-4 h-4 mr-2" />
                    August 26, 2025
                  </div>
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <MapPin className="w-4 h-4 mr-2" />
                    IITM Campus (Auditorium)
                  </div>
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <Users className="w-4 h-4 mr-2" />
                    Open to all freshers participants
                  </div>
                </div>
                <Button className="w-full cyber-button rounded-xl font-mono font-bold">
                  REGISTER NOW
                </Button>
              </div>
            </ElectricBorder>

            {/* AIEC Registration */}
            <ElectricBorder color="#0088ff" speed={1.4} chaos={0.8} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-6 cyber-glow">
                <div className="flex items-center justify-between mb-4">
                  <span className="cyber-secondary bg-cyber-secondary/20 text-cyber-secondary px-3 py-1 rounded-full text-xs font-semibold font-mono">MEMBERSHIP</span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold font-mono">REGISTER NOW</span>
                </div>
                <h3 className="text-xl font-bold cyber-text mb-3 font-mono">AIEC REGISTRATION</h3>
                <p className="cyber-text-muted text-sm mb-4 font-mono">
                  Join the Artificial Intelligence Experience Centre and become part of a vibrant AI-driven community.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <Calendar className="w-4 h-4 mr-2" />
                    September 8-9, 2025
                  </div>
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <MapPin className="w-4 h-4 mr-2" />
                    IITM Campus
                  </div>
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <Users className="w-4 h-4 mr-2" />
                    Limited Seats participants
                  </div>
                </div>
                <Button className="w-full cyber-button rounded-xl font-mono font-bold">
                  REGISTER NOW
                </Button>
              </div>
            </ElectricBorder>

            {/* Techno Sapiens 2025 */}
            <ElectricBorder color="#ff6600" speed={1.6} chaos={1.2} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-6 cyber-glow">
                <div className="flex items-center justify-between mb-4">
                  <span className="cyber-accent bg-cyber-accent/20 text-cyber-accent px-3 py-1 rounded-full text-xs font-semibold font-mono">TECH FEST</span>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold font-mono">COMING SOON</span>
                </div>
                <h3 className="text-xl font-bold cyber-text mb-3 font-mono">TECHNO SAPIENS 2025</h3>
                <p className="cyber-text-muted text-sm mb-4 font-mono">
                  The flagship annual tech fest of AIEC—packed with hackathons, workshops, competitions & innovations.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <Calendar className="w-4 h-4 mr-2" />
                    Coming Soon - 2025
                  </div>
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <MapPin className="w-4 h-4 mr-2" />
                    IITM Campus
                  </div>
                  <div className="flex items-center cyber-text-muted text-sm font-mono">
                    <Users className="w-4 h-4 mr-2" />
                    500+ participants expected participants
                  </div>
                </div>
                <Button className="w-full cyber-button rounded-xl font-mono font-bold">
                  REGISTER NOW
                </Button>
              </div>
            </ElectricBorder>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="cyber-button px-8 py-3 rounded-xl font-mono font-bold"
            >
              VIEW ALL EVENTS
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 cyber-bg/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 cyber-primary font-mono">
              FEATURED PROJECTS
            </h2>
            <p className="text-xl cyber-text-muted font-mono">
              Explore our cutting-edge projects that showcase innovation and technical excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* AI-Powered Smart Campus */}
            <ElectricBorder color="#00ff88" speed={1.3} chaos={0.7} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 cyber-glow">
                <div className="text-center mb-6">
                  <Code className="w-16 h-16 mx-auto cyber-primary mb-4" />
                  <span className="cyber-accent bg-cyber-accent/20 text-cyber-accent px-3 py-1 rounded-full text-xs font-semibold font-mono">AI/ML</span>
                </div>
                <h3 className="text-xl font-bold cyber-text mb-3 font-mono">AI-POWERED SMART CAMPUS</h3>
                <p className="cyber-text-muted text-sm mb-6 font-mono">
                  An intelligent campus management system using computer vision and IoT sensors to optimize resource utilization and enhance security.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">Python</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">TensorFlow</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">React</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">Node.js</span>
                </div>
              </div>
            </ElectricBorder>

            {/* Blockchain Voting System */}
            <ElectricBorder color="#0088ff" speed={1.5} chaos={0.9} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 cyber-glow">
                <div className="text-center mb-6">
                  <Database className="w-16 h-16 mx-auto cyber-secondary mb-4" />
                  <span className="cyber-secondary bg-cyber-secondary/20 text-cyber-secondary px-3 py-1 rounded-full text-xs font-semibold font-mono">BLOCKCHAIN</span>
                </div>
                <h3 className="text-xl font-bold cyber-text mb-3 font-mono">BLOCKCHAIN VOTING SYSTEM</h3>
                <p className="cyber-text-muted text-sm mb-6 font-mono">
                  A decentralized voting platform ensuring transparency and immutability in electoral processes using blockchain technology.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">Solidity</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">Web3.js</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">React</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">Node.js</span>
                </div>
              </div>
            </ElectricBorder>

            {/* Real-time Energy Monitor */}
            <ElectricBorder color="#00ff88" speed={1.7} chaos={1.1} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 cyber-glow">
                <div className="text-center mb-6">
                  <Zap className="w-16 h-16 mx-auto cyber-primary mb-4" />
                  <span className="cyber-primary bg-cyber-primary/20 text-cyber-primary px-3 py-1 rounded-full text-xs font-semibold font-mono">IoT</span>
                </div>
                <h3 className="text-xl font-bold cyber-text mb-3 font-mono">REAL-TIME ENERGY MONITOR</h3>
                <p className="cyber-text-muted text-sm mb-6 font-mono">
                  IoT-based energy consumption monitoring system with predictive analytics and automated optimization recommendations.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">IoT</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">Python</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">React</span>
                  <span className="cyber-border cyber-text px-2 py-1 rounded text-xs font-mono">AWS</span>
                </div>
              </div>
            </ElectricBorder>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="cyber-button px-8 py-3 rounded-xl font-mono font-bold"
            >
              VIEW ALL PROJECTS
            </Button>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section id="past-events" className="py-20 px-4 cyber-bg/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 cyber-primary font-mono">
                  PAST EVENTS
                </h2>
                <p className="text-xl cyber-text-muted mb-8 font-mono">
                  Relive our most thrilling experiences — from Workshops, Techno sapiens, and Hackathons to Gaming battles, UI/UX challenges, and IoT innovations. Our community came together to learn, create, and compete.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 cyber-text-muted">
                  <div className="w-2 h-2 cyber-secondary rounded-full cyber-glow"></div>
                  <span className="font-mono">Hands-on innovation and problem-solving</span>
                </div>
                <div className="flex items-center space-x-3 cyber-text-muted">
                  <div className="w-2 h-2 cyber-accent rounded-full cyber-glow"></div>
                  <span className="font-mono">Tech meets creativity through gaming & design</span>
                </div>
                <div className="flex items-center space-x-3 cyber-text-muted">
                  <div className="w-2 h-2 cyber-primary rounded-full cyber-glow"></div>
                  <span className="font-mono">Future-ready ideas in IoT and beyond</span>
                </div>
              </div>
            </div>

            {/* Right Content - Event Card */}
            <ElectricBorder color="#0088ff" speed={1.1} chaos={0.5} thickness={3} style={{ borderRadius: 16 }}>
              <div className="glass-card rounded-2xl p-8 premium-card">
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">Data Science Bootcamp</h3>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-400">7</div>
                          <div className="text-sm text-slate-300">WORKSHOPS</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-400">9</div>
                          <div className="text-sm text-slate-300">SPEAKERS</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-400">22</div>
                          <div className="text-sm text-slate-300">PROJECTS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">
                    <div className="mb-2">October 2023</div>
                    <div>Experience: 3 days</div>
                    <div>Mode: Hybrid</div>
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </div>
        </div>
      </section>

      {/* Society Highlights - Achievements */}
      <section className="py-20 px-4 cyber-bg/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 cyber-primary font-mono">
              SOCIETY HIGHLIGHTS
            </h2>
            <p className="text-xl cyber-text-muted font-mono">
              Celebrating milestones, creating impact, and shaping the future of tech.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <ElectricBorder color="#00ff88" speed={1.2} chaos={0.6} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 text-center cyber-glow">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Calendar className="w-8 h-8 text-black font-bold" />
                </div>
                <div className="text-4xl font-bold cyber-primary mb-2 font-mono">50+</div>
                <div className="cyber-text-muted text-sm font-semibold tracking-wider font-mono">EVENTS HOSTED</div>
              </div>
            </ElectricBorder>

            <ElectricBorder color="#ff0088" speed={1.4} chaos={0.8} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 text-center cyber-glow">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Code className="w-8 h-8 text-white font-bold" />
                </div>
                <div className="text-4xl font-bold cyber-accent mb-2 font-mono">100+</div>
                <div className="cyber-text-muted text-sm font-semibold tracking-wider font-mono">PROJECTS COMPLETED</div>
              </div>
            </ElectricBorder>

            <ElectricBorder color="#0088ff" speed={1.6} chaos={1.0} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 text-center cyber-glow">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Users className="w-8 h-8 text-white font-bold" />
                </div>
                <div className="text-4xl font-bold cyber-secondary mb-2 font-mono">150+</div>
                <div className="cyber-text-muted text-sm font-semibold tracking-wider font-mono">ACTIVE MEMBERS</div>
              </div>
            </ElectricBorder>

            <ElectricBorder color="#00ff88" speed={1.8} chaos={1.2} thickness={2} style={{ borderRadius: 16 }}>
              <div className="cyber-card rounded-2xl p-8 text-center cyber-glow">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Award className="w-8 h-8 text-white font-bold" />
                </div>
                <div className="text-4xl font-bold cyber-primary mb-2 font-mono">100+</div>
                <div className="cyber-text-muted text-sm font-semibold tracking-wider font-mono">WINNERS</div>
              </div>
            </ElectricBorder>
          </div>

          {/* Recent Achievements */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold cyber-text mb-8 font-mono">RECENT ACHIEVEMENTS</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <ElectricBorder color="#ff6600" speed={1.3} chaos={0.7} thickness={2} style={{ borderRadius: 16 }}>
                <div className="cyber-card rounded-2xl p-6 cyber-glow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 cyber-glow">
                      <Star className="w-6 h-6 text-white font-bold" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold cyber-text mb-1 font-mono">TECHNO SAPIENS 2024</h4>
                      <p className="cyber-text-muted text-sm font-mono">Organized our flagship fest with 500+ participants across events</p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder color="#ff0088" speed={1.5} chaos={0.9} thickness={2} style={{ borderRadius: 16 }}>
                <div className="cyber-card rounded-2xl p-6 cyber-glow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 cyber-glow">
                      <Lightbulb className="w-6 h-6 text-white font-bold" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold cyber-text mb-1 font-mono">INNOVATIVE SOLUTIONS</h4>
                      <p className="cyber-text-muted text-sm font-mono">Developed real-world AI projects in healthcare, finance, and automation</p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder color="#ff0088" speed={1.7} chaos={1.1} thickness={2} style={{ borderRadius: 16 }}>
                <div className="cyber-card rounded-2xl p-6 cyber-glow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 cyber-glow">
                      <Users className="w-6 h-6 text-white font-bold" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold cyber-text mb-1 font-mono">COMMUNITY IMPACT</h4>
                      <p className="cyber-text-muted text-sm font-mono">Conducted 20+ workshops and outreach programs to spread AI awareness beyond campus</p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder color="#00ff88" speed={1.9} chaos={1.3} thickness={2} style={{ borderRadius: 16 }}>
                <div className="cyber-card rounded-2xl p-6 cyber-glow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 cyber-glow">
                      <Award className="w-6 h-6 text-white font-bold" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold cyber-text mb-1 font-mono">STUDENT SUCCESS</h4>
                      <p className="cyber-text-muted text-sm font-mono">AIEC members secured internships and placements at top tech companies</p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder color="#00ff88" speed={2.1} chaos={1.5} thickness={2} style={{ borderRadius: 16 }}>
                <div className="cyber-card rounded-2xl p-6 cyber-glow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 cyber-glow">
                      <Briefcase className="w-6 h-6 text-white font-bold" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold cyber-text mb-1 font-mono">INDUSTRY COLLABORATIONS</h4>
                      <p className="cyber-text-muted text-sm font-mono">Partnered with leading AI startups for hands-on student projects</p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>

              <ElectricBorder color="#0088ff" speed={2.3} chaos={1.7} thickness={2} style={{ borderRadius: 16 }}>
                <div className="cyber-card rounded-2xl p-6 cyber-glow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 cyber-glow">
                      <Globe className="w-6 h-6 text-white font-bold" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold cyber-text mb-1 font-mono">RESEARCH PUBLICATIONS</h4>
                      <p className="cyber-text-muted text-sm font-mono">10+ papers published in journals/conferences</p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            </div>

            <Button 
              size="lg" 
              className="cyber-button px-8 py-3 rounded-xl font-mono font-bold"
            >
              JOIN OUR SUCCESS STORY
            </Button>
          </div>
        </div>
      </section>

      {/* Humanoid Section */}
      <section className="py-20 px-4 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-400/30 backdrop-blur-sm">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white mr-3">02</span>
                <span>Humanoid</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Why Humanoid
              </h2>
            </div>

            {/* Right Content - Glass Morphism Card */}
            <ElectricBorder color="#7df9ff" speed={1.0} chaos={0.4} thickness={3} style={{ borderRadius: 16 }}>
              <div className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-4">We're giving AI a way to navigate the physical world</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Through advanced robotics and humanoid technology, we're creating the bridge between artificial intelligence and real-world applications. Our humanoid projects demonstrate how AI can interact with and understand the physical environment.
                  </p>
                </div>
              </div>
            </ElectricBorder>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Transforming Ideas into Impact — <span className="text-cyan-400">AIEC IITM</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              AIEC IITM is a launchpad for innovators, creators, and changemakers — 
              empowering students to collaborate, experiment, and turn ideas into 
              real-world impact.
            </p>
            <p className="text-lg text-cyan-300 font-medium tracking-wider">
              Learn. Build. Lead.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <div className="flex items-center space-x-3 text-cyan-300">
                <Users className="w-5 h-5" />
                <span className="font-semibold">100+ Active Members</span>
              </div>
              <div className="flex items-center space-x-3 text-cyan-300">
                <Award className="w-5 h-5" />
                <span className="font-semibold">30+ Events Annually</span>
              </div>
              <div className="flex items-center space-x-3 text-cyan-300">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Industry Partnerships</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
};

export default Home;
 