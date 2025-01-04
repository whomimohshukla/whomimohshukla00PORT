import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import Projects from './components/Projects';
import Terminal from './components/Terminal';
import './App.css';
import React from 'react';

function Navbar() {
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'socials'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <a href="#" className="nav-brand">mimoh</a>
      <div className="nav-items">
        <a 
          href="#about" 
          className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}
        >
          about
        </a>
        <a 
          href="#projects" 
          className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('projects');
          }}
        >
          projects
        </a>
        <a 
          href="#skills" 
          className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('skills');
          }}
        >
          skills
        </a>
        <a 
          href="#socials" 
          className={`nav-item ${activeSection === 'socials' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('socials');
          }}
        >
          socials
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const interactiveRef = React.useRef(null);
  const [particles, setParticles] = React.useState([]);
  const [textIndex, setTextIndex] = React.useState(0);
  
  const devTexts = [
    "console.log('hello world')",
    "npm install future",
    "git commit -m 'fixing bugs'",
    "while(coding) { coffee++ }",
    "./start_adventure.sh"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex(prev => (prev + 1) % devTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleInteraction = (e) => {
    const rect = interactiveRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const velocity = 80 + Math.random() * 40;
      const scale = 0.8 + Math.random() * 0.4;
      return {
        id: Date.now() + i,
        x,
        y,
        style: {
          '--tx': `${Math.cos(angle) * velocity}px`,
          '--ty': `${Math.sin(angle) * velocity}px`,
          left: x + 'px',
          top: y + 'px',
          transform: `scale(${scale})`
        }
      };
    });

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1400);
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Mimoh <span>Shukla</span>
        </h1>
        <div className="hero-subtitle">
          <span>Software Developer</span> passionate about creating elegant solutions
        </div>
        <div className="hero-description">
          I build things for the web and love exploring new technologies.
        </div>
        <div className="socials">
          <a href="https://github.com/whomimohshukla" className="social-link">github</a>
          <a href="https://linkedin.com/in/yourusername" className="social-link">linkedin</a>
          <a href="https://twitter.com/whomimohshukla" className="social-link">twitter</a>
          <a href="mailto:mimohshukla0001@gmail.com" className="social-link">email</a>
        </div>
      </div>
      <motion.div
        className="interactive-area"
        ref={interactiveRef}
        onMouseMove={handleInteraction}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          handleInteraction(touch);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={particle.style}
          />
        ))}
        <motion.div 
          className="interactive-text"
          key={devTexts[textIndex]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {devTexts[textIndex]}
        </motion.div>
      </motion.div>
    </div>
  );
}

function About() {
  return (
    <motion.div
      className="about-section"
      id="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-content">
        <h2 className="about-heading">
          About <span>Me</span>
        </h2>
        <div className="about-description">
          <p>
            Hi! I'm <span>Mimoh</span>, a passionate software developer focused on creating elegant 
            and efficient solutions.
          </p>
          <p>
            I specialize in building applications using <span>React</span>, <span>Node.js</span>, 
            and <span>TypeScript</span>. Currently, I'm exploring <span>Rust</span> and systems programming.
          </p>
          <p>
            When I'm not coding, you can find me contributing to open-source projects, 
            writing technical blogs, or exploring new technologies.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ScrollIndicator() {
  const [scrollWidth, setScrollWidth] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollWidth(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="scroll-indicator" 
      style={{ transform: `scaleX(${scrollWidth / 100})` }}
    />
  );
}

function ScrollRevealSection({ children, delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.4, 0, 0.2, 1]
        }
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={controls}
      className="reveal-section"
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <div className="app">
      <ScrollIndicator />
      <AnimatedBackground />
      <motion.div 
        className="portfolio-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <Navbar />
        
        <ScrollRevealSection>
          <Hero />
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <About />
        </ScrollRevealSection>

        <ScrollRevealSection>
          <Terminal />
        </ScrollRevealSection>

        <div className="content-divider"></div>

        <ScrollRevealSection delay={0.2}>
          <div id="projects">
            <Projects />
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.3}>
          <div id="skills">
            <Skills />
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.4}>
          <div id="contact">
            <Contact />
          </div>
        </ScrollRevealSection>
      </motion.div>
    </div>
  );
}

export default App;
