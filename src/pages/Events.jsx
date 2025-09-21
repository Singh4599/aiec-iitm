import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Clock, Search, CalendarDays } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    document.title = "Events - AIEC IITM | AI Workshops & Conferences";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Join AI workshops, seminars, and conferences at AIEC IITM. Stay updated with the latest events in artificial intelligence, machine learning, and technology innovation.');
    }
    
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, filterType]);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;
    const now = new Date();

    // Filter by time
    if (filterType === "upcoming") {
      filtered = filtered.filter(event => new Date(event.date) >= now);
    } else if (filterType === "past") {
      filtered = filtered.filter(event => new Date(event.date) < now);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en', { month: 'short' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('en', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      full: date.toLocaleDateString('en', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) >= new Date();
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Upcoming Events
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Exciting opportunities await—dive into workshops, fests designed to spark innovation and growth.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12 space-y-4 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 ai-glow-hover"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { key: "all", label: "All Events" },
                  { key: "upcoming", label: "Upcoming" },
                  { key: "past", label: "Past Events" }
                ].map(filter => (
                  <Button
                    key={filter.key}
                    variant={filterType === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(filter.key)}
                    className="ai-glow-hover"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {(searchTerm || filterType !== "all") && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing {filteredEvents.length} of {events.length} events</span>
                {(searchTerm || filterType !== "all") && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSearchTerm("");
                      setFilterType("all");
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

      {/* Events List */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((event, index) => {
                const dateInfo = formatDate(event.date);
                const upcoming = isUpcoming(event.date);
                
                return (
                  <Card 
                    key={event.id} 
                    className={`ai-card ai-glow-hover overflow-hidden animate-fade-in-up ${
                      event.is_featured ? 'ring-2 ring-primary/50' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Date Badge */}
                      <div className="lg:w-32 flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 flex flex-row lg:flex-col items-center justify-center p-4 lg:p-6">
                        <div className="text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-primary">
                            {dateInfo.day}
                          </div>
                          <div className="text-sm lg:text-base font-semibold text-muted-foreground">
                            {dateInfo.month}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {dateInfo.year}
                          </div>
                        </div>
                        {event.is_featured && (
                          <Badge variant="default" className="ml-4 lg:ml-0 lg:mt-2">
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Event Image */}
                      {event.image_url && (
                        <div className="lg:w-48 flex-shrink-0">
                          <img 
                            src={event.image_url} 
                            alt={event.title}
                            className="w-full h-48 lg:h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Event Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-2">
                              {event.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {event.description}
                            </p>
                          </div>
                          <Badge 
                            variant={upcoming ? "default" : "secondary"}
                            className="ml-4"
                          >
                            {upcoming ? "Upcoming" : "Past"}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{dateInfo.full}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{dateInfo.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {upcoming ? (
                            <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                              Register Now
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Calendar className="w-4 h-4 mr-2" />
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="ai-card text-center p-12">
              <CalendarDays className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm || filterType !== "all" ? 'No Events Found' : 'No Events Yet'}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== "all" 
                  ? 'Try adjusting your search criteria to find more events.'
                  : 'Event listings will be displayed here once events are scheduled.'
                }
              </p>
              {(searchTerm || filterType !== "all") && (
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </Card>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Never Miss an Event
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay updated with our latest workshops, seminars, and AI conferences. 
              Join our community of AI enthusiasts and researchers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email..." 
                className="ai-glow-hover"
              />
              <Button className="bg-gradient-to-r from-primary to-accent ai-glow-hover">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
