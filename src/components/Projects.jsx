import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const projects = [
    {
      title: "BookMyBus",
      description: "An online bus ticket booking platform with real-time seat availability.",
      tech: ["React", "Node.js", "Express"],
      github: "https://github.com/whomimohshukla/bookmybus",
      live: "#"
    },
    {
      title: "Skillbridge Freelancing",
      description: "A platform connecting freelancers with clients for various projects.",
      tech: [],
      github: "https://github.com/whomimohshukla/skillbridge",
      live: "#"
    },
    {
      title: "Skillbridge Freelancing",
      description: "A platform connecting freelancers with clients for various projects.",
      tech: [],
      github: "https://github.com/whomimohshukla/skillbridge",
      live: "#"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="project-container"
    >
      <h2>projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <FiExternalLink />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
