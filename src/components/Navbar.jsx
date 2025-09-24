import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Info, Calendar, Briefcase, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const handleSectionClick = (sectionId) => {
    if (isHomePage) {
      // If on home page, scroll to section
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (isHomePage) {
      // If on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on other page, navigate to home using React Router
      navigate('/', { replace: false });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "cyber-bg/90 backdrop-blur-md shadow-lg shadow-cyan-500/20 border-b cyber-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25 cyber-glow">
              <span className="text-black font-bold text-sm font-mono">AI</span>
            </div>
            <span className="text-xl font-bold cyber-text font-mono">
              AIEC IITM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#"
              onClick={handleHomeClick}
              className="cyber-text hover:cyber-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:cyber-primary after:transition-all hover:after:w-full cursor-pointer font-mono"
            >
              HOME
            </a>
            <a 
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#about');
              }}
              className="cyber-text hover:cyber-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:cyber-primary after:transition-all hover:after:w-full cursor-pointer font-mono"
            >
              ABOUT
            </a>
            <a 
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#events');
              }}
              className="cyber-text hover:cyber-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:cyber-primary after:transition-all hover:after:w-full cursor-pointer font-mono"
            >
              EVENTS
            </a>
            <a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#projects');
              }}
              className="cyber-text hover:cyber-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:cyber-primary after:transition-all hover:after:w-full cursor-pointer font-mono"
            >
              PROJECTS
            </a>
            <Link 
              to="/team" 
              className="cyber-text hover:cyber-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:cyber-primary after:transition-all hover:after:w-full font-mono"
            >
              TEAM
            </Link>
            <a 
              href="#past-events"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#past-events');
              }}
              className="cyber-text hover:cyber-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:cyber-primary after:transition-all hover:after:w-full cursor-pointer font-mono"
            >
              CONTACT
            </a>
          </div>

          {/* Join Us Button */}
          <div className="hidden md:block">
            <Button 
              size="sm"
              className="cyber-button px-6 py-2 rounded-full font-mono font-bold"
            >
              <Users className="w-4 h-4 mr-2" />
              JOIN US
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="cyber-text hover:cyber-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden cyber-bg/95 backdrop-blur-lg border-t cyber-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" onClick={(e) => { handleHomeClick(e); setIsOpen(false); }} className="block px-3 py-2 cyber-text hover:cyber-primary cursor-pointer transition-colors font-mono">HOME</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleSectionClick('#about'); setIsOpen(false); }} className="block px-3 py-2 cyber-text hover:cyber-primary cursor-pointer transition-colors font-mono">ABOUT</a>
            <a href="#events" onClick={(e) => { e.preventDefault(); handleSectionClick('#events'); setIsOpen(false); }} className="block px-3 py-2 cyber-text hover:cyber-primary cursor-pointer transition-colors font-mono">EVENTS</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleSectionClick('#projects'); setIsOpen(false); }} className="block px-3 py-2 cyber-text hover:cyber-primary cursor-pointer transition-colors font-mono">PROJECTS</a>
            <Link to="/team" className="block px-3 py-2 cyber-text hover:cyber-primary transition-colors font-mono">TEAM</Link>
            <a href="#past-events" onClick={(e) => { e.preventDefault(); handleSectionClick('#past-events'); setIsOpen(false); }} className="block px-3 py-2 cyber-text hover:cyber-primary cursor-pointer transition-colors font-mono">CONTACT</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
