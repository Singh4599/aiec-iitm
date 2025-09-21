import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
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
    <div className="min-h-screen bg-slate-900">
      <Hero id="home" showLoadingScreen={showLoadingScreen} />
      
      {isAppLoaded && (
        <>
          {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About AIEC IITM
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              The AIEC of IITM Janakpuri is a hub for innovation and learning in AI, ML, and emerging technologies. Through 
              workshops, projects, competitions, and industry collaborations, it equips students with hands-on skills to 
              become problem-solvers and innovators driving real-world impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 premium-card">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 text-center tracking-wider">Development</h3>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 premium-card">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 text-center tracking-wider">AI/ML</h3>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 premium-card">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 text-center tracking-wider">Innovation</h3>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 premium-card">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 text-center tracking-wider">Community</h3>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 animate-slide-in-right">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Beyond Campus Visits</h3>
                  </div>
                  <p className="text-slate-400 text-sm">Exploring diverse opportunities outside the classroom.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Event Sphere</h3>
                  </div>
                  <p className="text-slate-400 text-sm">A vibrant space for fests, competitions, and collaborations.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Innovative Workshops</h3>
                  </div>
                  <p className="text-slate-400 text-sm">Hands-on learning with the latest AI & tech tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-xl text-slate-300">
              Exciting opportunities await—dive into workshops, fests designed to spark innovation and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* AIEC Orientation */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Orientation</span>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Closed</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AIEC Orientation</h3>
              <p className="text-slate-400 text-sm mb-4">
                Kickstart your AIEC journey—explore our vision, departments, and opportunities.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  August 26, 2025
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  IITM Campus (Auditorium)
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Open to all freshers participants
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                Register Now
              </Button>
            </div>

            {/* AIEC Registration */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Membership</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Register Now</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AIEC Registration</h3>
              <p className="text-slate-400 text-sm mb-4">
                Join the Artificial Intelligence Experience Centre and become part of a vibrant AI-driven community.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  September 8-9, 2025
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  IITM Campus
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Limited Seats participants
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                Register Now
              </Button>
            </div>

            {/* Techno Sapiens 2025 */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Tech Fest</span>
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Coming Soon</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Techno Sapiens 2025</h3>
              <p className="text-slate-400 text-sm mb-4">
                The flagship annual tech fest of AIEC—packed with hackathons, workshops, competitions & innovations.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-slate-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Coming Soon - 2025
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  IITM Campus
                </div>
                <div className="flex items-center text-slate-400 text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  500+ participants expected participants
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                Register Now
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl"
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-300">
              Explore our cutting-edge projects that showcase innovation and technical excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* AI-Powered Smart Campus */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 premium-card">
              <div className="text-center mb-6">
                <Code className="w-16 h-16 mx-auto text-white mb-4" />
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">AI/ML</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Smart Campus</h3>
              <p className="text-white/80 text-sm mb-6">
                An intelligent campus management system using computer vision and IoT sensors to optimize resource utilization and enhance security.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">Python</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">TensorFlow</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">React</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">Node.js</span>
              </div>
            </div>

            {/* Blockchain Voting System */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 premium-card">
              <div className="text-center mb-6">
                <Database className="w-16 h-16 mx-auto text-white mb-4" />
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">Blockchain</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Blockchain Voting System</h3>
              <p className="text-white/80 text-sm mb-6">
                A decentralized voting platform ensuring transparency and immutability in electoral processes using blockchain technology.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">Solidity</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">Web3.js</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">React</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">Node.js</span>
              </div>
            </div>

            {/* Real-time Energy Monitor */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 premium-card">
              <div className="text-center mb-6">
                <Zap className="w-16 h-16 mx-auto text-white mb-4" />
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">IoT</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Energy Monitor</h3>
              <p className="text-white/80 text-sm mb-6">
                IoT-based energy consumption monitoring system with predictive analytics and automated optimization recommendations.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">IoT</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">Python</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">React</span>
                <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">AWS</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-xl"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section id="past-events" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Past Events
                </h2>
                <p className="text-xl text-slate-300 mb-8">
                  Relive our most thrilling experiences — from Workshops, Techno sapiens, and Hackathons to Gaming battles, UI/UX challenges, and IoT innovations. Our community came together to learn, create, and compete.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Hands-on innovation and problem-solving</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Tech meets creativity through gaming & design</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>Future-ready ideas in IoT and beyond</span>
                </div>
              </div>
            </div>

            {/* Right Content - Event Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 premium-card">
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
          </div>
        </div>
      </section>

      {/* Society Highlights - Achievements */}
      <section id="achievements" className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Society Highlights
            </h2>
            <p className="text-xl text-slate-300">
              Celebrating milestones, creating impact, and shaping the future of tech.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center premium-card">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-slate-400 text-sm font-semibold tracking-wider">EVENTS HOSTED</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center premium-card">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-slate-400 text-sm font-semibold tracking-wider">PROJECTS COMPLETED</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center premium-card">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">150+</div>
              <div className="text-slate-400 text-sm font-semibold tracking-wider">ACTIVE MEMBERS</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center premium-card">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">100+</div>
              <div className="text-slate-400 text-sm font-semibold tracking-wider">WINNERS</div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-8">Recent Achievements</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white mb-1">Techno Sapiens 2024</h4>
                    <p className="text-slate-400 text-sm">Organized our flagship fest with 500+ participants across events</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white mb-1">Innovative Solutions</h4>
                    <p className="text-slate-400 text-sm">Developed real-world AI projects in healthcare, finance, and automation</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white mb-1">Community Impact</h4>
                    <p className="text-slate-400 text-sm">Conducted 20+ workshops and outreach programs to spread AI awareness beyond campus</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white mb-1">Student Success</h4>
                    <p className="text-slate-400 text-sm">AIEC members secured internships and placements at top tech companies</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white mb-1">Industry Collaborations</h4>
                    <p className="text-slate-400 text-sm">Partnered with leading AI startups for hands-on student projects</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 premium-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-white mb-1">Research Publications</h4>
                    <p className="text-slate-400 text-sm">10+ papers published in journals/conferences</p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl"
            >
              Join Our Success Story
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Transforming Ideas into Impact — <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AIEC IITM</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              AIEC IITM is a launchpad for innovators, creators, and changemakers — 
              empowering students to collaborate, experiment, and turn ideas into 
              real-world impact.
            </p>
            <p className="text-lg text-slate-500 font-medium tracking-wider">
              Learn. Build. Lead.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <div className="flex items-center space-x-3 text-slate-400">
                <Users className="w-5 h-5" />
                <span className="font-semibold">100+ Active Members</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Award className="w-5 h-5" />
                <span className="font-semibold">30+ Events Annually</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
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
