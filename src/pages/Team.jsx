import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Mail, Users, Instagram } from "lucide-react";

const Team = () => {
  const facultyHeads = [
    {
      name: "Ms. Komal Sharma",
      role: "Faculty Head",
      description: "Provides academic guidance and shares collaborative initiatives.",
      image: "/api/placeholder/150/150",
      linkedin: "#"
    },
    {
      name: "Ms. Aditi Aggarwal",
      role: "Faculty Head",
      description: "Inspires innovation and mentors future tech leaders.",
      image: "/api/placeholder/150/150",
      linkedin: "#"
    }
  ];

  const leadership = [
    {
      name: "Rishi Luthra",
      role: "President",
      description: "Drives vision, strategy, and society operations.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    },
    {
      name: "Girdhar Maheshwari",
      role: "Vice President",
      description: "Ensures smooth coordination and operational excellence.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const technicalDepartment = [
    {
      name: "Praveen Garg",
      role: "Head",
      description: "Ensures smooth technical operations, from managing websites to handling event setups.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Ayushi Gupta",
      role: "Co-Head",
      description: "Drives innovation and ensures seamless execution of tech-focused events.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const graphicsDepartment = [
    {
      name: "Ishan Kandari",
      role: "Head",
      description: "Creates impactful designs and visuals for events.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    },
    {
      name: "Captain Lovepreet Singh",
      role: "Co-Head",
      description: "Adds creativity and innovation through graphic storytelling.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const contentEditorialDepartment = [
    {
      name: "Sophia Kour",
      role: "Head",
      description: "Crafts compelling content and manages editorial processes.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    },
    {
      name: "Kamakshi Jang",
      role: "Co-Head",
      description: "Ensures quality content creation and editorial excellence.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const eventManagementDepartment = [
    {
      name: "Sushma Mehtani",
      role: "Head",
      description: "Orchestrates seamless events and manages logistics.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    },
    {
      name: "Akshay Bhargav",
      role: "Co-Head",
      description: "Ensures flawless event execution and coordination.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const prDepartment = [
    {
      name: "Abhiram Gupta",
      role: "Head",
      description: "Manages public relations and external communications.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const advertisingDepartment = [
    {
      name: "Yash Raj",
      role: "Head",
      description: "Drives advertising campaigns and promotional strategies.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    },
    {
      name: "Kavisha Jang",
      role: "Co-Head",
      description: "Enhances brand visibility through creative advertising.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const videoEditingDepartment = [
    {
      name: "Mukund Singal",
      role: "Head",
      description: "Creates engaging video content and manages post-production.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    },
    {
      name: "Nishant Tiwari",
      role: "Co-Head",
      description: "Specializes in video editing and visual storytelling.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const socialMediaDepartment = [
    {
      name: "Harsh Kandari",
      role: "Head",
      description: "Manages social media presence and digital engagement.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    },
    {
      name: "Saumya Joshi",
      role: "Co-Head",
      description: "Enhances social media strategy and community building.",
      image: "/api/placeholder/150/150",
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  ];

  const renderDepartment = (title, members, bgColor = "cyber-bg/50 backdrop-blur-sm") => (
    <section className={`py-20 px-4 ${bgColor}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-6 cyber-primary font-mono">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {members.map((member, index) => (
            <Card key={index} className="cyber-card rounded-2xl cyber-glow">
              <CardHeader className="text-center pb-4">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-green-500 p-1 cyber-glow">
                  <div className="w-full h-full rounded-full cyber-bg flex items-center justify-center">
                    <Users className="w-16 h-16 cyber-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold cyber-text font-mono">{member.name}</h3>
                <p className="cyber-primary font-semibold font-mono">{member.role}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="cyber-text-muted mb-4 font-mono">{member.description}</p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a href={member.linkedin} className="cyber-secondary hover:cyber-primary transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} className="cyber-text-muted hover:cyber-text transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} className="cyber-accent hover:cyber-primary transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen pt-16 relative cyber-bg">
      {/* Cyberpunk Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 cyber-bg"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full blur-3xl animate-float cyber-glow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-black mb-6 cyber-primary font-mono">
              OUR TEAM
            </h1>
            <p className="text-xl cyber-text-muted max-w-3xl mx-auto leading-relaxed font-mono">
              Meet the people who lead and build AIEC IITM
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Heads */}
      {renderDepartment("Faculty Heads", facultyHeads, "cyber-bg/50 backdrop-blur-sm")}

      {/* Leadership */}
      {renderDepartment("Leadership", leadership, "cyber-bg/50 backdrop-blur-sm")}

      {/* Technical Department */}
      {renderDepartment("Technical Department", technicalDepartment, "cyber-bg/50 backdrop-blur-sm")}

      {/* Graphics Department */}
      {renderDepartment("Graphics Department", graphicsDepartment, "cyber-bg/50 backdrop-blur-sm")}

      {/* Content & Editorial Department */}
      {renderDepartment("Content & Editorial Department", contentEditorialDepartment, "cyber-bg/50 backdrop-blur-sm")}

      {/* Event Management & Marketing Department */}
      {renderDepartment("Event Management & Marketing Department", eventManagementDepartment, "cyber-bg/50 backdrop-blur-sm")}

      {/* PR Department */}
      <section className="py-20 px-4 cyber-bg/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6 cyber-primary font-mono">
              PR DEPARTMENT
            </h2>
          </div>

          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {prDepartment.map((member, index) => (
              <Card key={index} className="cyber-card rounded-2xl cyber-glow">
                <CardHeader className="text-center pb-4">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-green-500 p-1 cyber-glow">
                    <div className="w-full h-full rounded-full cyber-bg flex items-center justify-center">
                      <Users className="w-16 h-16 cyber-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold cyber-text font-mono">{member.name}</h3>
                  <p className="cyber-primary font-semibold font-mono">{member.role}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="cyber-text-muted mb-4 font-mono">{member.description}</p>
                  <div className="flex justify-center space-x-4">
                    {member.linkedin && (
                      <a href={member.linkedin} className="cyber-secondary hover:cyber-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} className="cyber-text-muted hover:cyber-text transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} className="cyber-accent hover:cyber-primary transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advertising Department */}
      {renderDepartment("Advertising Department", advertisingDepartment, "cyber-bg/50 backdrop-blur-sm")}

      {/* Video Editing & Photography Department */}
      {renderDepartment("Video Editing & Photography Department", videoEditingDepartment, "cyber-bg/50 backdrop-blur-sm")}

      {/* Social Media Department */}
      {renderDepartment("Social Media Department", socialMediaDepartment, "cyber-bg/50 backdrop-blur-sm")}
    </div>
  );
};

export default Team;
