import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  BookOpen, 
  Lightbulb, 
  Code, 
  Brain,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Zap,
  Globe,
  Heart,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "About Us - AIEC IITM | AI Experience Centre";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about the AI Experience Centre at IIT Madras, our mission, vision, and the brilliant minds driving AI innovation and research.');
    }
    
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const missionValues = [
    {
      title: "Innovation",
      description: "Pioneering breakthrough research in artificial intelligence and machine learning technologies.",
      icon: "🚀"
    },
    {
      title: "Excellence",
      description: "Maintaining the highest standards in research, education, and technological development.",
      icon: "⭐"
    },
    {
      title: "Collaboration",
      description: "Fostering partnerships between academia, industry, and research institutions worldwide.",
      icon: "🤝"
    },
    {
      title: "Impact",
      description: "Creating AI solutions that address real-world challenges and benefit society.",
      icon: "🌍"
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About AIEC IITM
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              The AIEC of IITM Janakpuri is a hub for innovation and learning in AI, ML, and emerging technologies. Through 
              workshops, projects, competitions, and industry collaborations, it equips students with hands-on skills to 
              become problem-solvers and innovators driving real-world impact.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
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
              
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border-0"
                >
                  Learn More About Us
                </Button>
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

      {/* Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide our research, innovation, and collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {missionValues.map((value, index) => (
              <Card 
                key={index} 
                className="ai-card ai-glow-hover text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Meet the brilliant minds driving AI innovation at AIEC IITM
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading team members...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card 
                  key={member.id} 
                  className="ai-card ai-glow-hover animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                      {member.image_url ? (
                        <img 
                          src={member.image_url} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-12 h-12 text-primary" />
                      )}
                    </div>
                    <CardTitle className="text-lg text-primary">{member.name}</CardTitle>
                    <CardDescription className="font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  {(member.bio || member.email || member.linkedin_url || member.github_url) && (
                    <CardContent className="space-y-4">
                      {member.bio && (
                        <p className="text-sm text-muted-foreground text-center">
                          {member.bio}
                        </p>
                      )}
                      <div className="flex justify-center gap-2">
                        {member.email && (
                          <Button size="sm" variant="outline" className="p-2" asChild>
                            <a href={`mailto:${member.email}`}>
                              <Mail className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {member.linkedin_url && (
                          <Button size="sm" variant="outline" className="p-2" asChild>
                            <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {member.github_url && (
                          <Button size="sm" variant="outline" className="p-2" asChild>
                            <a href={member.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="ai-card text-center p-12">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Team Members Yet</h3>
              <p className="text-muted-foreground">
                Team information will be displayed here once members are added.
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Join Our Mission
            </h2>
            <p className="text-lg text-muted-foreground">
              Interested in collaborating with us or joining our team? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent ai-glow-hover">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <Link to="/careers">
                <Button size="lg" variant="outline" className="ai-glow-hover">
                  View Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
