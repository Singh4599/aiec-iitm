import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Lock, Plus, Edit, Trash2, Eye, EyeOff, Calendar, Users, Briefcase, 
  Settings, BarChart3, Database, Zap, Brain, Activity, Globe, Star,
  Upload, Download, RefreshCw, Search, Filter, Save, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Dummy admin password - in production, this should be handled securely
  const ADMIN_PASSWORD = "aiec2024admin";

  useEffect(() => {
    document.title = "Admin Panel - AIEC IITM";
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <Card className="glass-card max-w-md w-full transform hover:scale-105 transition-all duration-500 premium-card">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center mb-6 animate-neural-pulse">
              <Lock className="w-10 h-10 text-cyan-400" />
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-black">
              Admin Access
            </CardTitle>
            <CardDescription className="text-slate-300 mt-2">
              Enter the admin password to access the 3D content management system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="glass-card border-cyan-500/30 focus:border-cyan-400 text-white placeholder-slate-400"
                placeholder="Enter admin password"
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              disabled={!password}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Zap className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Access Admin Panel</span>
            </Button>
            <div className="text-center">
              <div className="glass-card rounded-lg p-3 border border-emerald-500/30">
                <p className="text-emerald-400 text-sm font-mono">Demo: aiec2024admin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '6s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        {/* 3D Header */}
        <div className="mb-12 text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center animate-neural-pulse">
              <Database className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            3D Admin Dashboard
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced content management system with real-time analytics and 3D interface
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <StatsCard icon={Calendar} title="Events" count="25" color="from-blue-500 to-cyan-500" />
          <StatsCard icon={Briefcase} title="Projects" count="18" color="from-purple-500 to-pink-500" />
          <StatsCard icon={Users} title="Team Members" count="42" color="from-emerald-500 to-teal-500" />
          <StatsCard icon={BarChart3} title="Analytics" count="1.2K" color="from-orange-500 to-red-500" />
        </div>

        <Tabs defaultValue="events" className="space-y-8">
          <TabsList className="glass-card grid w-full grid-cols-5 p-2 rounded-2xl">
            <TabsTrigger value="events" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 text-slate-300 rounded-xl transition-all duration-300">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 text-slate-300 rounded-xl transition-all duration-300">
              <Briefcase className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 text-slate-300 rounded-xl transition-all duration-300">
              <Users className="w-4 h-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 text-slate-300 rounded-xl transition-all duration-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 text-slate-300 rounded-xl transition-all duration-300">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Events Management */}
          <TabsContent value="events">
            <EventsManagement />
          </TabsContent>

          {/* Projects Management */}
          <TabsContent value="projects">
            <ProjectsManagement />
          </TabsContent>

          {/* Team Management */}
          <TabsContent value="team">
            <TeamManagement />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// 3D Stats Card Component
const StatsCard = ({ icon: Icon, title, count, color }) => (
  <Card className="glass-card premium-card transform hover:scale-105 transition-all duration-500 hover:rotate-1">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-black text-white mt-1">{count}</p>
        </div>
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center animate-neural-pulse`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Enhanced 3D Events Management Component
const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingEvent, setEditingEvent] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
      toast({
        title: "Error Loading Events",
        description: "Failed to load events. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEvents(events.filter(event => event.id !== id));
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the event. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "featured" && event.is_featured) ||
                         (filterStatus === "upcoming" && new Date(event.date) > new Date());
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full flex items-center justify-center mb-6 animate-neural-pulse">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
        <p className="text-xl text-slate-300">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 3D Header */}
      <div className="glass-card rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Events Management
            </h2>
            <p className="text-slate-400">Create, edit, and manage all your events</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-card pl-10 border-cyan-500/30 focus:border-cyan-400 text-white"
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="glass-card border-cyan-500/30 text-white w-40 px-3 py-2 rounded-lg appearance-none bg-slate-800/50 focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All Events</option>
                <option value="featured">Featured</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            
            {/* Add Event Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card max-w-3xl border-cyan-500/30">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Add New Event
                  </DialogTitle>
                </DialogHeader>
                <EventForm onSuccess={loadEvents} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Card key={event.id} className="glass-card premium-card transform hover:scale-[1.02] transition-all duration-500" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                      <CardTitle className="text-xl text-white flex items-center gap-3">
                        {event.title}
                        {event.is_featured && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-slate-400 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {event.location}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="glass-button hover:bg-blue-500/20"
                      onClick={() => setEditingEvent(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="glass-button hover:bg-red-500/20 text-red-400"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{event.description}</p>
                {event.image_url && (
                  <div className="mt-4">
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="glass-card text-center p-20">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-600/30 to-slate-700/30 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Start by adding your first event"}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Event
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card max-w-3xl border-cyan-500/30">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Add New Event
                  </DialogTitle>
                </DialogHeader>
                <EventForm onSuccess={loadEvents} />
              </DialogContent>
            </Dialog>
          </Card>
        )}
      </div>

      {/* Edit Event Dialog */}
      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent className="glass-card max-w-3xl border-cyan-500/30">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Edit Event
              </DialogTitle>
            </DialogHeader>
            <EventForm 
              event={editingEvent} 
              onSuccess={() => {
                loadEvents();
                setEditingEvent(null);
              }} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Event form component
const EventForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
    is_featured: false
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('events')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Event Added",
        description: "The event has been successfully created.",
      });

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        image_url: "",
        is_featured: false
      });

      onSuccess();
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Failed to Add Event",
        description: "There was an error creating the event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date & Time</Label>
          <Input
            id="date"
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.is_featured}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
        />
        <Label htmlFor="featured">Featured Event</Label>
      </div>
      
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Adding..." : "Add Event"}
      </Button>
    </form>
  );
};

// Placeholder components for other management sections
const ProjectsManagement = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-primary mb-4">Projects Management</h2>
    <p className="text-muted-foreground">Project management interface coming soon...</p>
  </div>
);

const TeamManagement = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-primary mb-4">Team Management</h2>
    <p className="text-muted-foreground">Team management interface coming soon...</p>
  </div>
);

const JobsManagement = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-primary mb-4">Jobs Management</h2>
    <p className="text-muted-foreground">Jobs management interface coming soon...</p>
  </div>
);

const SubmissionsView = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-primary mb-4">Form Submissions</h2>
    <p className="text-muted-foreground">Submissions viewer coming soon...</p>
  </div>
);

export default Admin;
