import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Contact = () => {
  const socials = [
    {
      icon: <FiGithub />,
      label: 'github',
      link: 'https://github.com/whomimohshukla'
    },
    {
      icon: <FiTwitter />,
      label: 'twitter',
      link: 'https://twitter.com/whomimohshukla'
    },
    {
      icon: <FiLinkedin />,
      label: 'linkedin',
      link: 'https://linkedin.com/in/Mimohshukla00'
    },
    {
      icon: <FiMail />,
      label: 'email',
      link: 'mailto:mimohshukla0001@gmail.com'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="contact-section"
    >
      <h2>socials</h2>
      <div className="social-links">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {social.icon}
            <span>{social.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default Contact;
