import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
  const [commandOutput, setCommandOutput] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState('Type "help" to see available commands...');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const projects = {
    mybus: {
      name: 'MyBus Ticket Booking',
      tech: ['MERN Stack', 'Redux', 'Stripe'],
      description: 'Full-stack bus ticket booking platform with real-time seat selection',
      link: 'https://github.com/yourusername/mybus'
    },
    weather: {
      name: 'Weather App',
      tech: ['React', 'OpenWeatherMap API'],
      description: 'Modern weather dashboard with detailed forecasts',
      link: 'https://github.com/yourusername/weather-app'
    },
    sos: {
      name: 'Emergency SOS',
      tech: ['React Native', 'Firebase'],
      description: 'Emergency response app with hospital locator',
      link: 'https://github.com/yourusername/sos-emergency'
    },
    chat: {
      name: 'Real-time Chat',
      tech: ['Socket.IO', 'MERN Stack'],
      description: 'Feature-rich chat platform with real-time messaging',
      link: 'https://github.com/yourusername/chat-app'
    }
  };

  const availableCommands = {
    help: 'Shows available commands',
    clear: 'Clears the terminal',
    projects: 'Lists all projects',
    about: 'Shows information about me',
    contact: 'Shows contact information',
    'project <name>': 'Shows detailed info about a specific project',
    skills: 'Lists all skills',
    social: 'Shows social media links'
  };

  const handleCommand = (cmd) => {
    const args = cmd.toLowerCase().split(' ');
    const command = args[0];
    
    switch(command) {
      case 'help':
        return [
          'Available Commands:',
          '',
          '<command>help</command>     - Shows available commands',
          '<command>clear</command>    - Clears the terminal',
          '<command>projects</command> - Lists all projects',
          '<command>about</command>    - Shows information about me',
          '<command>contact</command>  - Shows contact information',
          '<command>project</command> <arg><name></arg> - Shows detailed info about a specific project',
          '<command>skills</command>   - Lists all skills',
          '<command>social</command>   - Shows social media links',
          ''
        ];
      
      case 'clear':
        setCommandOutput([]);
        return [];
      
      case 'projects':
        return [
          'Available Projects:',
          ...Object.keys(projects).map(key => 
            `• ${projects[key].name} (${key})`
          )
        ];
      
      case 'project':
        const project = projects[args[1]];
        if (!project) return [`Project "${args[1]}" not found. Type 'projects' to see available projects.`];
        return [
          `Project: ${project.name}`,
          `Description: ${project.description}`,
          `Technologies: ${project.tech.join(', ')}`,
          `Link: ${project.link}`
        ];
      
      case 'about':
        return [
          'Full-stack developer passionate about building modern web applications.',
          'Currently working on MERN stack projects and exploring new technologies.',
          'Type "skills" to see my technical skills.'
        ];
      
      case 'skills':
        return [
          'Technical Skills:',
          '• Frontend: React, Next.js, TypeScript, Tailwind',
          '• Backend: Node.js, Express, MongoDB, PostgreSQL',
          '• Tools: Git, Docker, AWS, Firebase',
          '• Languages: JavaScript, Python, Java'
        ];
      
      case 'contact':
        return [
          'Email: your.email@example.com',
          'Phone: +1 234 567 8900',
          'Location: Your City, Country',
          'Type "social" for social media links'
        ];
      
      case 'social':
        return [
          'Social Links:',
          '• GitHub: github.com/yourusername',
          '• LinkedIn: linkedin.com/in/yourusername',
          '• Twitter: twitter.com/yourusername'
        ];
      default:
        return [`Command not found: ${command}. Type 'help' for available commands.`];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const output = handleCommand(currentCommand);
    setCommandOutput(prev => [...prev, `> ${currentCommand}`, ...output]);
    setCommandHistory(prev => [currentCommand, ...prev]);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [commandOutput]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="terminal-container"
    >
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button red"></span>
          <span className="terminal-button yellow"></span>
          <span className="terminal-button green"></span>
        </div>
        <div className="terminal-title">portfolio.sh</div>
      </div>
      
      <div className="terminal-body" ref={terminalRef}>
        {commandOutput.map((command, i) => (
          <div key={i} className="terminal-line">
            {command.startsWith('>') ? (
              <>
                <span className="terminal-prompt">{'whomimohshukla@whomimohshukla-Portfolio:~$'}</span>
                <span className="terminal-command">{command.slice(1)}</span>
              </>
            ) : (
              <span 
                className="terminal-output"
                dangerouslySetInnerHTML={{ 
                  __html: command
                    .replace(/<command>(.*?)<\/command>/g, '<span class="terminal-cmd">$1</span>')
                    .replace(/<arg>(.*?)<\/arg>/g, '<span class="terminal-arg">$1</span>')
                }} 
              />
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="terminal-prompt">{'whomimohshukla@whomimohshukla-Portfolio:~$'}</span>
          <div className="terminal-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              spellCheck="false"
              autoComplete="off"
            />
            {!currentCommand && <span className="terminal-suggestion">{suggestion}</span>}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Terminal;
