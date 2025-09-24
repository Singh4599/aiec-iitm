import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Contact Us - AIEC IITM | Get in Touch";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Contact the AI Experience Centre at IIT Madras. Get in touch for collaborations, research inquiries, or general information about our AI programs and initiatives.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
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
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "General Inquiry",
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["aiec@iitm.ac.in", "research@aiec.iitm.ac.in"],
      description: "Send us an email for general inquiries or research collaborations"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 44 2257 XXXX", "+91 44 2257 YYYY"],
      description: "Call us during business hours for immediate assistance"
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "AI Experience Centre",
        "Indian Institute of Technology Madras",
        "Chennai, Tamil Nadu 600036, India"
      ],
      description: "Visit us at our state-of-the-art facility on the IIT Madras campus"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
      description: "Our team is available during these hours to assist you"
    }
  ];

  return (
    <div className="min-h-screen pt-16 cyber-bg">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 cyber-primary font-mono">
              CONTACT US
            </h1>
            <p className="text-xl cyber-text-muted max-w-4xl mx-auto leading-relaxed font-mono">
              Have questions about our research, looking for collaboration opportunities, 
              or want to learn more about AIEC IITM? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <Card className="ai-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="ai-glow-hover"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="ai-glow-hover"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your inquiry"
                        className="ai-glow-hover"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us more about your inquiry or how we can help..."
                        rows={6}
                        className="ai-glow-hover"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-primary to-accent ai-glow-hover"
                      size="lg"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-primary">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Whether you're a researcher, student, industry partner, or simply curious about AI, 
                  we're here to connect and collaborate.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="ai-card ai-glow-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primary mb-2">{info.title}</h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-foreground font-medium">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Visit Our Campus
            </h2>
            <p className="text-lg text-muted-foreground">
              Located in the heart of Chennai at the prestigious IIT Madras campus
            </p>
          </div>

          <Card className="ai-card animate-scale-in overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 mx-auto text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-primary">IIT Madras Campus</h3>
                  <p className="text-muted-foreground">Interactive map coming soon</p>
                </div>
                <Button variant="outline" className="ai-glow-hover">
                  View in Google Maps
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about AIEC IITM
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How can I collaborate with AIEC IITM?",
                answer: "We welcome collaborations with industry partners, academic institutions, and researchers. Please reach out to us with details about your project or research interests."
              },
              {
                question: "Do you offer internship opportunities?",
                answer: "Yes, we regularly offer internship positions for undergraduate and graduate students. Check our careers page for current openings or send us your resume."
              },
              {
                question: "Can I visit the AI Experience Centre?",
                answer: "We welcome visitors! Please contact us in advance to schedule a tour of our facilities and learn about our ongoing research projects."
              },
              {
                question: "How can I stay updated with your research?",
                answer: "Follow our events page for upcoming seminars and workshops. You can also subscribe to our newsletter for regular updates on our research and activities."
              }
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="ai-card ai-glow-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
