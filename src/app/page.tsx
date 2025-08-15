'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ExternalLink, Calendar, Users, Award } from "lucide-react";
import AnimatedBackground from "@/components/animated-background";
import WaveEffect from "@/components/wave-effect";
import AnimatedCard from "@/components/animated-card";
import SimpleLoading from "@/components/simple-loading";
import NavigationMenu from "@/components/navigation-menu";
import SectionTransition from "@/components/section-transition";
import TechIcon from "@/components/tech-icons";
import dynamic from 'next/dynamic';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';

// Estilos personalizados para las animaciones del sistema solar y terminal
const customStyles = `
  @keyframes spin-slow {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  @keyframes spin-medium {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  @keyframes spin-fast {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  @keyframes matrixFall {
    0% { transform: translateY(-100px); opacity: 0; }
    10% { opacity: 0.2; }
    90% { opacity: 0.2; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  
  .animate-spin-medium {
    animation: spin-medium 15s linear infinite;
  }
  
  .animate-spin-fast {
    animation: spin-fast 10s linear infinite;
  }
  
  .animate-matrix-fall {
    animation: matrixFall 3s linear infinite;
  }
`;

// Importación dinámica del efecto Matrix Rain solo en cliente
const MatrixRainEffect = dynamic(() => Promise.resolve(MatrixRainEffectInner), { ssr: false });

function MatrixRainEffectInner({ count = 40 }: { count?: number }) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Solo se ejecuta en cliente
    const arr = Array.from({ length: count }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `matrixFall ${2 + Math.random() * 3}s linear infinite`,
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${8 + Math.random() * 8}px`,
      char: String.fromCharCode(Math.random() * 26 + 65)
    }));
    setParticles(arr);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div key={i} className="absolute text-green-400 text-xs opacity-15" style={{
          left: p.left,
          top: p.top,
          animation: p.animation,
          animationDelay: p.animationDelay,
          fontSize: p.fontSize
        }}>
          {p.char}
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const { t } = useTranslation();
  // Estado de carga para controlar la pantalla de loading
  const [isLoading, setIsLoading] = useState(true);
  // Estado para el blur bajo el menú
  const [isMenuBlurActive, setIsMenuBlurActive] = useState(false);
  // Estado para visibilidad del menú
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  // Timer para detectar inactividad de scroll
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsMenuVisible(true); // Mostrar menú al scrollear
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setIsMenuVisible(false); // Ocultar menú por inactividad
      }, 2500); // 2.5 segundos sin scroll
    };
    window.addEventListener('scroll', handleScroll);
    // Iniciar timer al montar
    inactivityTimer = setTimeout(() => setIsMenuVisible(false), 2500);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(inactivityTimer);
    };
  }, []);

  useEffect(() => {
    // Simula la carga inicial (puedes ajustar el tiempo o la lógica real)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Agrega los estilos personalizados solo en el cliente
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const { toast } = useToast();
  // Estado para el formulario de contacto
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [activeSection, setActiveSection] = useState<string>('hero');

  const sections = [
    { id: 'hero', label: t('menu.inicio') },
    { id: 'sobre-mi', label: t('menu.sobreMi') },
    { id: 'experiencia', label: t('menu.experiencia') },
    { id: 'proyectos', label: t('menu.proyectos') },
    { id: 'proyectos-personales', label: t('menu.proyectosPersonales') },
    { id: 'habilidades', label: t('menu.habilidades') },
    { id: 'certificaciones', label: t('menu.certificaciones') },
    { id: 'contacto', label: t('menu.contacto') }
  ];

  // Proyectos académicos usando traducción
  const projects = [
    {
      title: t('proyectos.lista.appchat.titulo'),
      subtitle: t('proyectos.lista.appchat.subtitulo'),
      institution: t('proyectos.lista.appchat.institucion'),
      period: t('proyectos.lista.appchat.periodo'),
      grade: t('proyectos.lista.appchat.nota'),
      challenge: t('proyectos.lista.appchat.reto'),
      solution: t('proyectos.lista.appchat.solucion'),
      impact: t('proyectos.lista.appchat.impacto'),
      technologies: t('proyectos.lista.appchat.tecnologias', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/TDS-AppChat",
        demo: null
      },
      image: "/project1.jpg"
    },
    {
      title: t('proyectos.lista.mitologia.titulo'),
      subtitle: t('proyectos.lista.mitologia.subtitulo'),
      institution: t('proyectos.lista.mitologia.institucion'),
      period: t('proyectos.lista.mitologia.periodo'),
      grade: t('proyectos.lista.mitologia.nota'),
      challenge: t('proyectos.lista.mitologia.reto'),
      solution: t('proyectos.lista.mitologia.solucion'),
      impact: t('proyectos.lista.mitologia.impacto'),
      technologies: t('proyectos.lista.mitologia.tecnologias', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/DSINT",
        demo: null
      },
      image: "/project2.jpg"
    },
    {
      title: t('proyectos.lista.nanofiles.titulo'),
      subtitle: t('proyectos.lista.nanofiles.subtitulo'),
      institution: t('proyectos.lista.nanofiles.institucion'),
      period: t('proyectos.lista.nanofiles.periodo'),
      grade: t('proyectos.lista.nanofiles.nota'),
      challenge: t('proyectos.lista.nanofiles.reto'),
      solution: t('proyectos.lista.nanofiles.solucion'),
      impact: t('proyectos.lista.nanofiles.impacto'),
      technologies: t('proyectos.lista.nanofiles.tecnologias', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/ProyectoRC",
        demo: null
      },
      image: "/project3.jpg"
    }
  ];

  // Proyectos personales usando traducción
  const personalProjects = [
    {
      title: t('proyectosPersonales.lista.portfolio.titulo'),
      subtitle: t('proyectosPersonales.lista.portfolio.subtitulo'),
      description: t('proyectosPersonales.lista.portfolio.descripcion'),
      challenge: t('proyectosPersonales.lista.portfolio.reto'),
      solution: t('proyectosPersonales.lista.portfolio.solucion'),
      impact: t('proyectosPersonales.lista.portfolio.impacto'),
      technologies: t('proyectosPersonales.lista.portfolio.tecnologias', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/portfolio",
        demo: null
      },
      image: "/portfolio-project.jpg",
      period: t('proyectosPersonales.lista.portfolio.periodo'),
      estado: "enDesarrollo"
    },
    {
      title: t('proyectosPersonales.lista.gestorTareas.titulo'),
      subtitle: t('proyectosPersonales.lista.gestorTareas.subtitulo'),
      description: t('proyectosPersonales.lista.gestorTareas.descripcion'),
      challenge: t('proyectosPersonales.lista.gestorTareas.reto'),
      solution: t('proyectosPersonales.lista.gestorTareas.solucion'),
      impact: t('proyectosPersonales.lista.gestorTareas.impacto'),
      technologies: t('proyectosPersonales.lista.gestorTareas.tecnologias', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/task-manager",
        demo: null
      },
      image: "/task-manager.jpg",
      period: t('proyectosPersonales.lista.gestorTareas.periodo'),
      estado: "completo"
    },
    {
      title: t('proyectosPersonales.lista.elearning.titulo'),
      subtitle: t('proyectosPersonales.lista.elearning.subtitulo'),
      description: t('proyectosPersonales.lista.elearning.descripcion'),
      challenge: t('proyectosPersonales.lista.elearning.reto'),
      solution: t('proyectosPersonales.lista.elearning.solucion'),
      impact: t('proyectosPersonales.lista.elearning.impacto'),
      technologies: t('proyectosPersonales.lista.elearning.tecnologias', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/elearning-platform",
        demo: null
      },
      image: "/elearning-platform.jpg",
      period: t('proyectosPersonales.lista.elearning.periodo'),
      estado: "enPausa"
    }
  ];

  const certifications = [
    {
      name: "Infrastructure in Google Cloud",
      issuer: "Google Cloud Skill Boost",
      date: "Jul 2025",
      logo: "/logos-png/googlecloud.png"
    },
    {
      name: "Cloud Computing Fundamentals",
      issuer: "Google Cloud Skill Boost",
      date: "Jul 2025",
      logo: "/logos-png/googlecloud.png"
    },
    {
      name: "Networking & Security in Google Cloud",
      issuer: "Google Cloud Skill Boost",
      date: "Jul 2025",
      logo: "/logos-png/googlecloud.png"
    },
    {
      name: "AWS Cloud Practitioner Essentials",
      issuer: "AWS",
      date: "Jul 2025",
      logo: "/logos-png/aws.png"
    }
  ];

  const skills = {
    frontend: [
      { name: "React", level: 90, icon: "⚛️" },
      { name: "TypeScript", level: 80, icon: "📟" },
      { name: "Tailwind CSS", level: 85, icon: "🌊" },
      { name: "HTML", level: 95, icon: "🏷️" },
      { name: "CSS", level: 90, icon: "🎨" }
    ],
    backend: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Python", level: 80, icon: "🐍" },
      { name: "Java", level: 75, icon: "☕" },
      { name: "Spring Boot", level: 70, icon: "🍃" },
      { name: "REST APIs", level: 85, icon: "🔗" }
    ],
    database: [
      { name: "MySQL", level: 70, icon: "🐬" },
      { name: "SQLite", level: 85, icon: "📦" },
      { name: "H2", level: 75, icon: "⚡" },
      { name: "PostgreSQL", level: 75, icon: "🐘" }
    ],
    cloud: [
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "Google Cloud", level: 75, icon: "🌐" },
      { name: "Docker", level: 65, icon: "🐳" }
    ],
    tools: [
      { name: "Git", level: 90, icon: "📋" },
      { name: "Linux", level: 75, icon: "🐧" },
      { name: "Docker", level: 65, icon: "🐳" },
      { name: "Maven", level: 80, icon: "🏺" },
      { name: "npm", level: 85, icon: "📦" },
      { name: "JUnit", level: 75, icon: "🧪" }
    ],
    soft: [
      { name: "Trabajo en Equipo", level: 90, icon: "🤝" },
      { name: "Comunicación", level: 85, icon: "💬" },
      { name: "Resolución de Problemas", level: 88, icon: "🧩" },
      { name: "Aprendizaje Rápido", level: 92, icon: "🚀" },
      { name: "Gestión de Tiempo", level: 80, icon: "⏰" }
    ]
  };

  const experiences = [
    {
      title: "Prácticas en Desarrollo e Integración de Software",
      company: "OdinS",
      period: "Ene 2025 – Jul 2025",
      description: "Desarrollo e integración de módulo de pago para PrestaShop usando GNU Taler. Configuración de backend merchant, base de datos y endpoints REST. Implementación de pruebas de flujo completo y documentación técnica.",
      achievements: ["Implementación completa de sistema de pago", "Documentación técnica y video explicativo", "Gestión de repositorio GitLab"]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Efecto para detectar la sección activa
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar inicialmente

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Función para enviar el mensaje usando Formspree
  const handleSendMessage = async () => {
    if (!contactName || !contactEmail || !contactMessage) {
      toast({
        title: t('contacto.toast.camposIncompletos.titulo'),
        description: t('contacto.toast.camposIncompletos.descripcion'),
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    setSending(true);
    try {
      // Reemplaza {form_id} por el tuyo de Formspree
      const response = await fetch("https://formspree.io/f/xyzpvyqe", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage
        })
      });
      const result = await response.json();
      if (response.ok) {
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        toast({
          title: t('contacto.toast.mensajeEnviado.titulo'),
          description: t('contacto.toast.mensajeEnviado.descripcion'),
          variant: "success",
          duration: 3000
        });
      } else {
        toast({
          title: t('contacto.toast.errorEnvio.titulo'),
          description: result?.error || t('contacto.toast.errorEnvio.descripcion'),
          variant: "destructive",
          duration: 3000
        });
      }
    } catch (error) {
      toast({
        title: t('contacto.toast.errorRed.titulo'),
        description: t('contacto.toast.errorRed.descripcion'),
        variant: "destructive",
        duration: 3000
      });
    }
    setSending(false);
  };

  // @ts-ignore
    return (
    <>
      <SimpleLoading isLoading={isLoading} />
      {!isLoading && (
        <>
          <NavigationMenu
            sections={sections}
            showMenu={!isLoading}
            isMenuVisible={isMenuVisible}
            onMenuVisibleChange={setIsMenuBlurActive}
          />
          {/* Blur solo bajo el menú, sincronizado con visibilidad */}
          {isMenuBlurActive && (
            <div className="fixed top-0 left-0 w-full h-12 z-40 pointer-events-none blur-under-menu" />
          )}
          <SectionTransition activeSection={activeSection} sections={sections} />
          <div className={`min-h-screen relative overflow-hidden`}>
            {/* Efectos de fondo - SIEMPRE fuera del blur */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <AnimatedBackground />
              <WaveEffect />
            </div>
            {/* Contenido principal sin blur dinámico */}
            <div className="relative z-10">
              {/* Hero Section */}
              <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative">
                <div className="max-w-5xl mx-auto text-center">
                  <div className="space-y-12">
                    {/* Nombre minimalista */}
                    <div className="space-y-4">
                      <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
                        {t('nombre')}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-400 font-light">
                        {t('profesion')}
                      </p>
                    </div>

                    {/* Propuesta de Valor Única - Realista */}
                    <div className="max-w-3xl mx-auto">
                      <p
                        className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
                        dangerouslySetInnerHTML={{ __html: t('hero.valor') }}
                      ></p>
                    </div>

                    {/* Métricas Reales */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">4º</div>
                        <div className="text-sm text-gray-400">{t('hero.metricas.curso')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">6</div>
                        <div className="text-sm text-gray-400">{t('hero.metricas.mesesExperiencia')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">3</div>
                        <div className="text-sm text-gray-400">{t('hero.metricas.proyectosDestacados')}</div>
                      </div>
                    </div>

                    {/* CTA Minimalista */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12">
                      <Button
                        size="lg"
                        onClick={() => scrollToSection('proyectos')}
                        className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-medium text-lg transition-all duration-300 transform hover:scale-105"
                      >
                        {t('hero.cta.verProyectos')}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.open('/CV-JoseGalvan.pdf', '_blank')}
                        className="px-8 py-4 border border-gray-600 text-gray-900 hover:bg-gray-800 font-medium text-lg transition-all duration-300"
                      >
                        {t('hero.cta.descargarCV')}
                      </Button>
                    </div>

                    {/* Iconos de redes sociales minimalistas */}
                    <div className="flex justify-center space-x-8 pt-8">
                      <a
                        href="https://github.com/PepeGdlT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <Github className="h-6 w-6" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/jose-galvan-de-la-torre/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                      <a
                        href="mailto:pepegdlt02@gmail.com"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <Mail className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sobre Mí Section */}
              <section id="sobre-mi" className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {t('sobreMi.titulo')}
                    </h2>
                  </div>

                  <AnimatedCard className="bg-black/30 backdrop-blur-sm border border-purple-500/30">
                    <div className="p-8">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg leading-relaxed mb-6 text-purple-100">
                          {t('sobreMi.descripcion1')}
                        </p>
                        <p className="text-lg leading-relaxed mb-6 text-purple-100">
                          {t('sobreMi.descripcion2')}
                        </p>
                        <p className="text-lg leading-relaxed text-purple-100">
                          {t('sobreMi.descripcion3')}
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                </div>
              </section>

              {/* Experiencia Section */}
              <section id="experiencia" className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {t('experiencia.titulo')}
                    </h2>
                    <p className="text-lg text-green-200 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                      {t('experiencia.descripcion')}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {experiences.filter(exp => exp.title.includes("Prácticas")).map((exp, index) => (
                      <AnimatedCard key={index} className="bg-black/30 backdrop-blur-sm border border-green-500/30">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{t('experiencia.practicas.titulo')}</h3>
                              <p className="text-green-300">{t('experiencia.practicas.empresa')}</p>
                            </div>
                            <p className="text-green-200 text-sm mt-1 md:mt-0">{t('experiencia.practicas.periodo')}</p>
                          </div>
                          <p className="text-green-100 mb-4">{t('experiencia.practicas.descripcion')}</p>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-green-300">{t('experiencia.practicas.logros')}</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {(() => {
                                const achievements = t('experiencia.practicas.achievements', { returnObjects: true });
                                return Array.isArray(achievements)
                                  ? achievements.map((achievement: any, achIndex: number) => (
                                      <li key={achIndex} className="text-green-100">{typeof achievement === 'string' ? achievement : achievement.label || JSON.stringify(achievement)}</li>
                                    ))
                                  : null;
                              })()}
                            </ul>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </section>

              {/* Proyectos Section */}
              <section id="proyectos" className="py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {t('proyectos.titulo')}
                    </h2>
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                      {t('proyectos.descripcion')}
                    </p>
                  </div>

                  <div className="grid gap-8 md:gap-12">
                    {projects.map((project, index) => (
                      <AnimatedCard key={index} className="bg-black/30 backdrop-blur-sm border border-blue-500/30">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="aspect-video bg-black/50 rounded-lg overflow-hidden border border-blue-500/30 relative">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex items-center justify-between text-sm text-blue-200">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{project.period}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4" />
                                <span>Nota: {project.grade}</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <CardTitle className="text-2xl mb-2 text-white">{project.title}</CardTitle>
                              <CardDescription className="text-base text-blue-200">{project.subtitle}</CardDescription>
                              <div className="flex items-center space-x-2 mt-2">
                                <Users className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-blue-300">{project.institution}</span>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <h4 className="font-semibold text-sm text-blue-300 mb-1">Reto</h4>
                                <p className="text-sm text-blue-100">{project.challenge}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold text-sm text-blue-300 mb-1">Solución</h4>
                                <p className="text-sm text-blue-100">{project.solution}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold text-sm text-blue-300 mb-1">Impacto</h4>
                                <p className="text-sm text-blue-100">{project.impact}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-blue-300">Tecnologías</h4>
                              <div className="flex flex-wrap gap-2">
                                {Array.isArray(project.technologies) &&
                                  project.technologies.map((tech: any, idx: number) => (
                                    <Badge key={idx} className="bg-blue-900 text-blue-100">{typeof tech === 'string' ? tech : tech.label || JSON.stringify(tech)}</Badge>
                                  ))
                                }
                              </div>
                            </div>

                            <div className="flex space-x-4">
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-blue-300 hover:text-white transition-colors"
                              >
                                <Github className="h-4 w-4" />
                                <span>Código</span>
                              </a>
                              {project.links.demo && (
                                <a
                                  href={project.links.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 text-sm text-blue-300 hover:text-white transition-colors"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  <span>Demo</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </section>

              {/* Proyectos Personales Section */}
              <section id="proyectos-personales" className="py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {t('menu.proyectosPersonales')}
                    </h2>
                    <p className="text-lg text-purple-200 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                      {t('proyectosPersonales.intro')}
                    </p>
                  </div>

                  <div className="grid gap-8 md:gap-12">
                    {personalProjects.map((project, index) => {
                      const estadoInfoRaw = t('proyectosPersonalesEstados.' + project.estado, { returnObjects: true });
                      let color = 'gray';
                      let label = project.estado;
                      if (
                        typeof estadoInfoRaw === 'object' && estadoInfoRaw !== null &&
                        typeof (estadoInfoRaw as any).color === 'string' &&
                        typeof (estadoInfoRaw as any).label === 'string'
                      ) {
                        color = (estadoInfoRaw as any).color;
                        label = (estadoInfoRaw as any).label;
                      }
                      return (
                        <AnimatedCard key={index} className="bg-black/30 backdrop-blur-sm border border-purple-500/30">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="aspect-video bg-black/50 rounded-lg overflow-hidden border border-purple-500/30 relative">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className={`px-2 py-1 text-xs rounded-full bg-${color}-500/20 text-${color}-300 border border-${color}-500/30`}>
                                    {label}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-sm text-purple-200">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{project.period}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                <p className="text-purple-100 mb-4">{project.description}</p>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-1">{t('proyectosPersonalesLabels.reto')}</h4>
                                  <p className="text-sm text-purple-100">{project.challenge}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-1">{t('proyectosPersonalesLabels.solucion')}</h4>
                                  <p className="text-sm text-purple-100">{project.solution}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-1">{t('proyectosPersonalesLabels.impacto')}</h4>
                                  <p className="text-sm text-purple-100">{project.impact}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-2">{t('proyectosPersonalesLabels.tecnologias')}</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {Array.isArray(project.technologies) &&
                                      project.technologies.map((tech: any, idx: number) => (
                                        <Badge key={idx} className="bg-purple-900 text-purple-100">{typeof tech === 'string' ? tech : tech.label || JSON.stringify(tech)}</Badge>
                                      ))
                                    }
                                  </div>
                                </div>

                                <div className="flex space-x-4 pt-2">
                                  {project.links.github && (
                                    <a
                                      href={project.links.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-purple-300 hover:text-purple-100 transition-colors flex items-center space-x-1"
                                    >
                                      <Github className="h-4 w-4" />
                                      <span className="text-sm">GitHub</span>
                                    </a>
                                  )}
                                  {project.links.demo && (
                                    <a
                                      href={project.links.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-purple-300 hover:text-purple-100 transition-colors flex items-center space-x-1"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="text-sm">Demo</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </AnimatedCard>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Certificaciones Section */}
              <section id="certificaciones" className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {t('certificaciones.titulo')}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {certifications.map((cert, index) => (
                      <AnimatedCard key={index} className="bg-black/30 backdrop-blur-sm border border-yellow-500/30">
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            <img src={cert.logo} alt={cert.name} className="w-12 h-12 object-contain" />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-1">{cert.name}</h3>
                              <p className="text-yellow-300 text-sm mb-1">{cert.issuer}</p>
                              <p className="text-yellow-200 text-xs">{cert.date}</p>
                            </div>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </section>

              {/* Habilidades Section */}
              <section id="habilidades" className="py-16 px-4 relative">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {t('habilidades.titulo')}
                    </h2>
                    <p className="text-lg text-yellow-200 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm p-4 rounded-lg">
                      {t('habilidades.intro')}
                    </p>
                  </div>

                  <div className="grid gap-6 md:gap-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Frontend */}
                      <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-400/50 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-yellow-500/30 flex items-center">
                          <span className="text-xl mr-2">🎨</span>
                          {t('habilidades.frontend')}
                        </h3>
                        <div className="space-y-3 mt-4">
                          {skills.frontend.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 text-yellow-100 p-2 rounded hover:bg-yellow-500/10 transition-colors">
                              <TechIcon name={skill.name} className="w-5 h-5" />
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Backend */}
                      <div className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 hover:border-green-400/50 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-green-500/30 flex items-center">
                          <span className="text-xl mr-2">⚙️</span>
                          {t('habilidades.backend')}
                        </h3>
                        <div className="space-y-3 mt-4">
                          {skills.backend.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 text-green-100 p-2 rounded hover:bg-green-500/10 transition-colors">
                              <TechIcon name={skill.name} className="w-5 h-5" />
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Database */}
                      <div className="bg-black/30 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/50 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-blue-500/30 flex items-center">
                          <span className="text-xl mr-2">🗄️</span>
                          {t('habilidades.database')}
                        </h3>
                        <div className="space-y-3 mt-4">
                          {skills.database.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 text-blue-100 p-2 rounded hover:bg-blue-500/10 transition-colors">
                              <TechIcon name={skill.name} className="w-5 h-5" />
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cloud */}
                      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 hover:border-purple-400/50 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-purple-500/30 flex items-center">
                          <span className="text-xl mr-2">☁️</span>
                          {t('habilidades.cloud')}
                        </h3>
                        <div className="space-y-3 mt-4">
                          {skills.cloud.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 text-purple-100 p-2 rounded hover:bg-purple-500/10 transition-colors">
                              <TechIcon name={skill.name} className="w-5 h-5" />
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tools */}
                      <div className="bg-black/30 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 hover:border-red-400/50 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-red-500/30 flex items-center">
                          <span className="text-xl mr-2">🛠️</span>
                          {t('habilidades.tools')}
                        </h3>
                        <div className="space-y-3 mt-4">
                          {skills.tools.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 text-red-100 p-2 rounded hover:bg-red-500/10 transition-colors">
                              <TechIcon name={skill.name} className="w-5 h-5" />
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Soft Skills */}
                      <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300 md:col-span-2 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-cyan-500/30 flex items-center">
                          <span className="text-xl mr-2">🌟</span>
                          {t('habilidades.soft')}
                        </h3>
                        <div className="grid grid-cols-1 gap-3 mt-4">
                          {skills.soft.map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2 text-cyan-100 p-2 rounded hover:bg-cyan-500/10 transition-colors">
                              <span className="text-lg">{skill.icon}</span>
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contacto Section - con transición de fondo */}
              <section id="contacto" className="py-20 px-4 relative bg-gradient-to-b from-transparent via-black/70 to-black">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 font-mono">
                      $ ./contact.sh
                    </h2>
                    <p className="text-lg text-green-300 font-mono">
                      establishing secure connection...
                    </p>
                  </div>

                  <AnimatedCard className="bg-black/90 border border-green-500/50 p-0 overflow-hidden backdrop-blur-sm">
                    {/* Terminal header */}
                    <div className="bg-green-900/20 px-4 py-2 border-b border-green-500/30 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-green-400 text-sm ml-4 font-mono">terminal@josegalvan:~$</span>
                    </div>

                    {/* Terminal content */}
                    <div className="p-6 font-mono text-green-400 relative">
                      <div className="space-y-4">
                        <p className="animate-pulse">$ establishing secure connection...</p>
                        <p className="text-green-300">$ connection established ✓</p>
                        <p>$ loading contact protocols...</p>
                        <p className="text-green-300">$ protocols loaded ✓</p>
                        <p>$ initializing encryption...</p>
                        <p className="text-green-300">$ encryption active ✓</p>

                        <div className="mt-8 space-y-6">
                          <div className="flex items-center space-x-4 group">
                            <span className="text-green-500">$</span>
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                placeholder="enter your name..."
                                value={contactName}
                                onChange={e => setContactName(e.target.value)}
                                disabled={sending}
                                className="w-full bg-transparent border-none outline-none text-green-400 placeholder-green-600 p-2 rounded transition-all duration-300 group-hover:bg-green-500/10 focus:bg-green-500/20 focus:ring-2 focus:ring-green-500/30"
                              />
                              <div className="absolute inset-0 border border-green-500/20 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 group">
                            <span className="text-green-500">$</span>
                            <div className="flex-1 relative">
                              <input
                                type="email"
                                placeholder="enter your email@domain.com"
                                value={contactEmail}
                                onChange={e => setContactEmail(e.target.value)}
                                disabled={sending}
                                className="w-full bg-transparent border-none outline-none text-green-400 placeholder-green-600 p-2 rounded transition-all duration-300 group-hover:bg-green-500/10 focus:bg-green-500/20 focus:ring-2 focus:ring-green-500/30"
                              />
                              <div className="absolute inset-0 border border-green-500/20 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4 group">
                            <span className="text-green-500 mt-1">$</span>
                            <div className="flex-1 relative">
                              <textarea
                                placeholder="type your message..."
                                rows={4}
                                value={contactMessage}
                                onChange={e => setContactMessage(e.target.value)}
                                disabled={sending}
                                className="w-full bg-transparent border-none outline-none text-green-400 placeholder-green-600 p-2 rounded transition-all duration-300 group-hover:bg-green-500/10 focus:bg-green-500/20 focus:ring-2 focus:ring-green-500/30 resize-none"
                              />
                              <div className="absolute inset-0 border border-green-500/20 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          </div>
                          <div className="flex space-x-4 pt-4">
                            <button
                              className="px-6 py-2 bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30 transition-all duration-300 font-mono hover:scale-105 hover:shadow-green-500/25"
                              onClick={handleSendMessage}
                              disabled={sending}
                            >
                              {sending ? "$ sending..." : "$ execute_message.sh"}
                            </button>

                            <div className="flex space-x-4 text-green-500 items-center">
                              <a href="mailto:pepegdlt02@gmail.com" className="hover:text-green-300 transition-colors hover:scale-110 transform duration-300">
                                [mail]
                              </a>
                              <a href="https://github.com/PepeGdlT" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors hover:scale-110 transform duration-300">
                                [git]
                              </a>
                              <a href="https://www.linkedin.com/in/jose-galvan-de-la-torre/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors hover:scale-110 transform duration-300">
                                [in]
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Matrix rain effect */}
                        <MatrixRainEffect count={40} />
                        {/* Cursor animation */}
                        <div className="absolute bottom-4 right-4">
                          <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                  {/* Additional info */}
                  <div className="mt-8 text-center">
                    <AnimatedCard className="bg-black/30 backdrop-blur-sm border border-green-500/30 inline-block px-6 py-3">
                      <p className="text-green-300 text-sm font-mono">
                        $ response_time: 24-48h | $ status: online
                      </p>
                    </AnimatedCard>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Componente MatrixRainEffect para evitar SSR hydration error

function Footer() {
  const { t } = useTranslation();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="py-8 px-4 border-t border-blue-500/30 bg-black/90 text-gray-400 backdrop-blur-sm relative">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-gray-400">
          &copy; {year} José Galván. {t('footer.derechos')}
        </p>
      </div>
    </footer>
  );
}
