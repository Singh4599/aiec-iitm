import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Github, ExternalLink, Search, Filter, Code } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");

  useEffect(() => {
    document.title = "Projects - AIEC IITM | AI Innovation Showcase";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore cutting-edge AI projects and research innovations from the AI Experience Centre at IIT Madras. Discover our machine learning, deep learning, and AI solutions.');
    }
    
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedTech]);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech_stack?.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedTech) {
      filtered = filtered.filter(project =>
        project.tech_stack?.includes(selectedTech)
      );
    }

    setFilteredProjects(filtered);
  };

  const getAllTechnologies = () => {
    const techSet = new Set();
    projects.forEach(project => {
      project.tech_stack?.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover our cutting-edge AI research projects and innovative solutions that are 
              shaping the future of artificial intelligence and machine learning.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 space-y-4 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 ai-glow-hover"
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground appearance-none ai-glow-hover"
                >
                  <option value="">All Technologies</option>
                  {getAllTechnologies().map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {(searchTerm || selectedTech) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing {filteredProjects.length} of {projects.length} projects</span>
                {(searchTerm || selectedTech) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTech("");
                    }}
                    className="h-auto p-1 text-primary hover:text-primary/80"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className={`ai-card ai-glow-hover overflow-hidden animate-fade-in-up ${
                    project.is_featured ? 'ring-2 ring-primary/50' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {project.is_featured && (
                    <div className="bg-gradient-to-r from-primary to-accent px-3 py-1">
                      <span className="text-xs font-bold text-primary-foreground">FEATURED</span>
                    </div>
                  )}
                  
                  {project.image_url ? (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Code className="w-16 h-16 text-primary/50" />
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="secondary" 
                            className="text-xs hover:bg-primary/20 cursor-pointer transition-colors"
                            onClick={() => setSelectedTech(tech)}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {project.github_url && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 ai-glow-hover" 
                          asChild
                        >
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo_url && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-primary to-accent" 
                          asChild
                        >
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="ai-card text-center p-12">
              <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm || selectedTech ? 'No Projects Found' : 'No Projects Yet'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedTech 
                  ? 'Try adjusting your search criteria to find more projects.'
                  : 'Project showcases will be displayed here once projects are added.'
                }
              </p>
              {(searchTerm || selectedTech) && (
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTech("");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Have a Project Idea?
            </h2>
            <p className="text-lg text-muted-foreground">
              We're always looking for new challenges and collaboration opportunities. 
              Let's build the future of AI together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent ai-glow-hover">
                  Start a Collaboration
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="ai-glow-hover">
                  View Research Areas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
