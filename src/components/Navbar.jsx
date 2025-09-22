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
          ? "glass-navbar"
          : "bg-slate-900/20 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AIEC IITM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#"
              onClick={handleHomeClick}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a 
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#about');
              }}
              className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </a>
            <a 
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#events');
              }}
              className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </a>
            <a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#projects');
              }}
              className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Projects</span>
            </a>
            <Link 
              to="/team" 
              className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <Users className="w-4 h-4" />
              <span>Team</span>
            </Link>
            <a 
              href="#past-events"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#past-events');
              }}
              className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Past Events</span>
            </a>
          </div>

          {/* Join Us Button */}
          <div className="hidden md:block">
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 border-0"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:bg-slate-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" onClick={(e) => { handleHomeClick(e); setIsOpen(false); }} className="block px-3 py-2 text-slate-300 hover:text-blue-400 cursor-pointer">Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleSectionClick('#about'); setIsOpen(false); }} className="block px-3 py-2 text-slate-300 hover:text-blue-400 cursor-pointer">About</a>
            <a href="#events" onClick={(e) => { e.preventDefault(); handleSectionClick('#events'); setIsOpen(false); }} className="block px-3 py-2 text-slate-300 hover:text-blue-400 cursor-pointer">Events</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleSectionClick('#projects'); setIsOpen(false); }} className="block px-3 py-2 text-slate-300 hover:text-blue-400 cursor-pointer">Projects</a>
            <Link to="/team" className="block px-3 py-2 text-slate-300 hover:text-blue-400">Team</Link>
            <a href="#past-events" onClick={(e) => { e.preventDefault(); handleSectionClick('#past-events'); setIsOpen(false); }} className="block px-3 py-2 text-slate-300 hover:text-blue-400 cursor-pointer">Past Events</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
