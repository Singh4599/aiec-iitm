import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Briefcase, MapPin, Clock, DollarSign, Search, Users, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    job_id: "",
    name: "",
    email: "",
    phone: "",
    resume_url: "",
    cover_letter: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Careers - AIEC IITM | Join Our AI Team";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore career opportunities at AIEC IITM. Join our team of AI researchers, engineers, and innovators shaping the future of artificial intelligence.');
    }
    
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedType]);

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    setFilteredJobs(filtered);
  };

  const getJobTypes = () => {
    const types = new Set(jobs.map(job => job.type));
    return Array.from(types).sort();
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setApplicationData(prev => ({ ...prev, job_id: job.id }));
  };

  const submitApplication = async () => {
    if (!applicationData.name || !applicationData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([applicationData]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });

      // Reset form
      setApplicationData({
        job_id: "",
        name: "",
        email: "",
        phone: "",
        resume_url: "",
        cover_letter: ""
      });
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'internship': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'contract': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Be part of the AI revolution at AIEC IITM. Join our team of passionate researchers, 
              engineers, and innovators who are shaping the future of artificial intelligence.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 space-y-4 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 ai-glow-hover"
                />
              </div>
              <div className="min-w-[200px]">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground ai-glow-hover"
                >
                  <option value="">All Job Types</option>
                  {getJobTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {(searchTerm || selectedType) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing {filteredJobs.length} of {jobs.length} positions</span>
                {(searchTerm || selectedType) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("");
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

      {/* Jobs List */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading positions...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <Card 
                  key={job.id} 
                  className="ai-card ai-glow-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl md:text-2xl text-primary mb-2">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {job.department}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getTypeColor(job.type)}>
                          {job.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      {job.salary_range && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary_range}</span>
                        </div>
                      )}
                    </div>

                    {job.requirements && job.requirements.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 5).map((req, reqIndex) => (
                            <Badge key={reqIndex} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                          {job.requirements.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.requirements.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="bg-gradient-to-r from-primary to-accent"
                            onClick={() => handleApply(job)}
                          >
                            Apply Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="ai-card max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-primary">
                              Apply for {selectedJob?.title}
                            </DialogTitle>
                            <DialogDescription>
                              Fill out the form below to submit your application.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                  id="name"
                                  value={applicationData.name}
                                  onChange={(e) => setApplicationData(prev => 
                                    ({ ...prev, name: e.target.value })
                                  )}
                                  className="ai-glow-hover"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={applicationData.email}
                                  onChange={(e) => setApplicationData(prev => 
                                    ({ ...prev, email: e.target.value })
                                  )}
                                  className="ai-glow-hover"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                value={applicationData.phone}
                                onChange={(e) => setApplicationData(prev => 
                                  ({ ...prev, phone: e.target.value })
                                )}
                                className="ai-glow-hover"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="resume">Resume URL</Label>
                              <Input
                                id="resume"
                                placeholder="Link to your resume (Google Drive, LinkedIn, etc.)"
                                value={applicationData.resume_url}
                                onChange={(e) => setApplicationData(prev => 
                                  ({ ...prev, resume_url: e.target.value })
                                )}
                                className="ai-glow-hover"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="cover-letter">Cover Letter</Label>
                              <Textarea
                                id="cover-letter"
                                placeholder="Tell us why you're interested in this position..."
                                value={applicationData.cover_letter}
                                onChange={(e) => setApplicationData(prev => 
                                  ({ ...prev, cover_letter: e.target.value })
                                )}
                                rows={5}
                                className="ai-glow-hover"
                              />
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                              <Button 
                                onClick={submitApplication}
                                disabled={submitting}
                                className="bg-gradient-to-r from-primary to-accent flex-1"
                              >
                                {submitting ? "Submitting..." : "Submit Application"}
                              </Button>
                              <DialogTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogTrigger>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" className="ai-glow-hover">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="ai-card text-center p-12">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm || selectedType ? 'No Positions Found' : 'No Open Positions'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedType 
                  ? 'Try adjusting your search criteria to find more positions.'
                  : 'No job openings are currently available. Check back soon for new opportunities.'
                }
              </p>
              {(searchTerm || selectedType) && (
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          )}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Join AIEC IITM?
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover what makes our team special and why talented professionals choose to build their careers with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔬",
                title: "Cutting-edge Research",
                description: "Work on groundbreaking AI research projects that push the boundaries of what's possible."
              },
              {
                icon: "🌟",
                title: "World-class Team",
                description: "Collaborate with leading researchers and industry experts from around the globe."
              },
              {
                icon: "📚",
                title: "Continuous Learning",
                description: "Access to conferences, workshops, and professional development opportunities."
              },
              {
                icon: "🚀",
                title: "Innovation Culture",
                description: "Freedom to explore new ideas and turn innovative concepts into reality."
              },
              {
                icon: "🌍",
                title: "Global Impact",
                description: "Contribute to AI solutions that address real-world challenges and benefit society."
              },
              {
                icon: "⚖️",
                title: "Work-Life Balance",
                description: "Flexible working arrangements and a supportive environment that values well-being."
              }
            ].map((benefit, index) => (
              <Card 
                key={index} 
                className="ai-card ai-glow-hover text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <CardTitle className="text-xl text-primary">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Don't See the Right Position?
            </h2>
            <p className="text-lg text-muted-foreground">
              We're always looking for talented individuals to join our team. 
              Send us your resume and let us know how you'd like to contribute to the future of AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent ai-glow-hover">
                <Users className="w-5 h-5 mr-2" />
                Send General Application
              </Button>
              <Button size="lg" variant="outline" className="ai-glow-hover">
                Contact HR Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
