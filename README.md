# AIEC IITM Website

A modern, responsive clone of the official AIEC-IITM website built with React, JavaScript, Tailwind CSS, and Supabase. This project features a complete content management system, dynamic content loading, and an admin panel for easy website management.

## 🚀 Features

- **Modern Design**: Clean, professional interface with AI-themed animations and effects
- **Responsive Layout**: Fully responsive design that works perfectly on all devices
- **Dynamic Content**: Powered by Supabase for real-time content management
- **Interactive Components**: Engaging user interface with smooth animations and effects
- **SEO Optimized**: Search engine friendly with proper meta tags and structure
- **Admin Panel**: Hidden admin interface for complete content management
- **Form Integration**: Contact forms and job applications with Supabase integration
- **Real-time Updates**: Live content updates without page refresh

## 🛠 Tech Stack

- **Frontend**: React 18 with JavaScript (converted from TypeScript)
- **Styling**: Tailwind CSS with custom animations and responsive design
- **UI Components**: Shadcn/ui component library for consistent design
- **Database**: Supabase (PostgreSQL) for backend and real-time features
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router DOM for client-side navigation
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React for beautiful, consistent icons
- **Animations**: Custom CSS animations with Tailwind for amazing effects

## 📱 Pages & Features

### 🏠 Home Page
- Dynamic hero section with loading animations
- Featured projects, events, and team members
- Call-to-action sections
- Responsive grid layouts

### ℹ️ About Page
- Mission and vision statements
- Research areas showcase
- Team member profiles with social links
- Values and principles section

### 🚀 Projects Page
- Searchable project showcase
- Technology stack filtering
- Featured project highlighting
- GitHub and demo links integration

### 📅 Events Page
- Event listings with calendar integration
- Upcoming/past event filtering
- Event registration functionality
- Rich event details with images

### 💼 Careers Page
- Job listings with detailed descriptions
- Application form integration
- Job type and location filtering
- Company benefits showcase

### 📞 Contact Page
- Contact form with Supabase integration
- Office information and hours
- Interactive FAQ section
- Campus location details

### 🔐 Admin Panel
- Secure password-protected access
- Event management (CRUD operations)
- Content management interface
- Form submission viewing
- Real-time content updates

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account for backend services

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd aiec-iitm
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:8080](http://localhost:8080)

## 🗄 Database Schema

The application uses these Supabase tables:

### Core Tables
- **`events`**: Event information, dates, locations, and featured status
- **`projects`**: Project showcase with tech stacks, GitHub links, and demos
- **`team`**: Team member profiles with social media links
- **`jobs`**: Career opportunities with requirements and descriptions

### Form Tables
- **`contact_submissions`**: Contact form submissions
- **`job_applications`**: Job application submissions with resume links

### Database Features
- Row Level Security (RLS) enabled
- Public read access for content tables
- Public insert access for form submissions
- Automatic timestamp updates

## 🔐 Admin Access

Access the admin panel at `/admin` with the password: **`aiec2024admin`**

### Admin Features:
- **Event Management**: Create, edit, and delete events
- **Project Management**: Manage project showcase
- **Team Management**: Update team member information
- **Job Management**: Post and manage career opportunities
- **Submissions**: View contact and application submissions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository to your hosting platform
2. Set environment variables in the platform dashboard
3. Deploy with default build settings
4. Ensure Supabase URL is accessible from your domain

### Environment Setup
Make sure to set these environment variables in your hosting platform:
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

## 🎨 Customization

### Styling & Theming
- **Global Styles**: Modify `src/index.css` for global styles
- **Theme Configuration**: Update `tailwind.config.js` for colors, animations, and responsive breakpoints
- **Component Styles**: Edit individual component files for specific styling

### Content Management
- **Dynamic Content**: Update through the admin panel interface
- **Static Content**: Modify component files for fixed content
- **New Pages**: Create new components in `src/pages/` and add routes

### Database Customization
- **Schema Changes**: Modify `supabase/migrations/` files
- **API Integration**: Update component files for new database interactions
- **Policies**: Adjust RLS policies in Supabase dashboard

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Hero.jsx        # Hero section component
│   └── Navbar.jsx      # Navigation component
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── About.jsx       # About page
│   ├── Projects.jsx    # Projects showcase
│   ├── Events.jsx      # Events listing
│   ├── Careers.jsx     # Career opportunities
│   ├── Contact.jsx     # Contact page
│   └── Admin.jsx       # Admin panel
├── integrations/       # External service integrations
│   └── supabase/       # Supabase configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css           # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, questions, or contributions:
- Use the contact form on the website
- Open an issue on GitHub
- Contact the AIEC IITM team directly

## 🙏 Acknowledgments

- Original AIEC-IITM website for design inspiration
- Shadcn/ui for the beautiful component library
- Supabase for the powerful backend services
- Tailwind CSS for the utility-first styling approach

---

**Built with ❤️ for the AIEC IITM community**
