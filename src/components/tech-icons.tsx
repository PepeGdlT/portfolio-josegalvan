'use client';

import Image from 'next/image';

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "w-5 h-5" }: TechIconProps) {
  const getIconPath = () => {
    switch (name.toLowerCase()) {
      // Frontend
      case 'react':
        return '/logos-png/react.png';
      case 'typescript':
        return '/logos-png/typescript.png';
      case 'tailwind css':
        return '/logos-png/tailwind.png';
      case 'html':
        return '/logos-png/html.png';
      case 'css':
        return '/logos-png/css.png';
      
      // Backend
      case 'node.js':
        return '/logos-png/nodejs.png';
      case 'python':
        return '/logos-png/python.png';
      case 'java':
        return '/logos-png/java.png';
      case 'spring boot':
        return '/logos-png/springboot.png';
      case 'rest apis':
        return '/logos-png/restapi.png';
      
      // Database
      case 'mysql':
        return '/logos-png/mysql.png';
      case 'sqlite':
        return '/logos-png/sqlite.png';
      case 'h2':
        return '/logos-png/h2.png';
      case 'postgresql':
        return '/logos-png/postgre.png';
      
      // Cloud
      case 'aws':
        return '/logos-png/aws.png';
      case 'google cloud':
        return '/logos-png/googlecloud.png';
      case 'docker':
        return '/logos-png/docker.png';
      
      // Tools
      case 'git':
        return '/logos-png/git.png';
      case 'linux':
        return '/logos-png/linux.png';
      case 'maven':
        return '/logos-png/maven.png';
      case 'npm':
        return '/logos-png/npm.png';
      case 'junit':
        return '/logos-png/junit.png';
      
      // Default fallback
      default:
        return null;
    }
  };

  const iconPath = getIconPath();
  
  if (iconPath) {
    return (
      <Image 
        src={iconPath} 
        alt={name}
        width={20}
        height={20}
        className={className}
        style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))' }}
      />
    );
  }

  // Fallback para soft skills o tecnologías sin logo
  return <span className="text-lg">📋</span>;
}