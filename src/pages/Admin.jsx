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
import { Lock, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="ai-card max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-primary">Admin Access</CardTitle>
            <CardDescription>
              Enter the admin password to access the content management system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="ai-glow-hover"
                placeholder="Enter admin password"
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-primary to-accent"
              disabled={!password}
            >
              Access Admin Panel
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <p>Demo password: aiec2024admin</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your website content, events, projects, team members, and job postings.
          </p>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 ai-card">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
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

          {/* Jobs Management */}
          <TabsContent value="jobs">
            <JobsManagement />
          </TabsContent>

          {/* Submissions View */}
          <TabsContent value="submissions">
            <SubmissionsView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Component for managing events
const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Manage Events</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="ai-card max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-primary">Add New Event</DialogTitle>
            </DialogHeader>
            <EventForm onSuccess={loadEvents} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id} className="ai-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-primary flex items-center gap-2">
                      {event.title}
                      {event.is_featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {new Date(event.date).toLocaleDateString()} • {event.location}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="ai-card text-center p-12">
            <h3 className="text-xl font-semibold mb-2">No Events</h3>
            <p className="text-muted-foreground">Start by adding your first event.</p>
          </Card>
        )}
      </div>
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
