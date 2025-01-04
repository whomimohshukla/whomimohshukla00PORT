import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNode,
  FaPython,
  FaDocker,
  FaAws,
  FaGit,
  FaLinux,
  FaCuttlefish,
} from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTailwindcss,
  SiVite,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

const skills = [
  { icon: <SiHtml5 />, name: "HTML" },
  { icon: <SiCss3 />, name: "CSS" },
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <FaReact />, name: "React" },
  { icon: <TbBrandNextjs />, name: "Next.js" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <FaNode />, name: "Node.js" },
  // { icon: <FaPython />, name: "Python" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  // { icon: <SiRedis />, name: "Redis" },
  { icon: <FaDocker />, name: "Docker" },
  // { icon: <FaAws />, name: "AWS" },
  { icon: <FaGit />, name: "Git" },
  { icon: <SiTailwindcss />, name: "Tailwind" },
  { icon: <FaLinux />, name: "Linux" },
  { icon: <SiVite />, name: "Vite" },
  // New Skills

  { icon: <FaCuttlefish />, name: "C++" },
  // { icon: <SiMaterialui />, name: 'Material UI' },
];

const Skills = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="skills-section"
    >
      <h2>skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="skill-icon">{skill.icon}</div>
            <span className="skill-name">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
