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
import dynamic from 'next/dynamic';
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import ScrollAnimator from "@/components/scroll-animator";
import Image from 'next/image';
import MagneticButton from "../components/magnetic-button";
import AnimatedHeading from '@/components/animated-heading';
import AnimatedText from '@/components/animated-text';

// estilos personalizados para las animaciones del sistema solar y terminal
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
  const { t, i18n } = useTranslation();
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
        team: t('proyectos.lista.mitologia.equipo', { returnObjects: true }),

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
        team: t('proyectos.lista.nanofiles.equipo', { returnObjects: true }),

        links: {
        github: "https://github.com/PepeGdlT/ProyectoRC",
        demo: null
      },
      image: "/project3.jpg"
    },
    {
      title: t('proyectos.lista.trilingo.titulo'),
      subtitle: t('proyectos.lista.trilingo.subtitulo'),
      institution: t('proyectos.lista.trilingo.institucion'),
      period: t('proyectos.lista.trilingo.periodo'),
      grade: t('proyectos.lista.trilingo.nota'),
      challenge: t('proyectos.lista.trilingo.reto'),
      solution: t('proyectos.lista.trilingo.solucion'),
      impact: t('proyectos.lista.trilingo.impacto'),
      technologies: t('proyectos.lista.trilingo.tecnologias', { returnObjects: true }),
      team: t('proyectos.lista.trilingo.equipo', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/PDS-2025",
        demo: null
      },
      image: "/project6.jpg"
    }
  ];

  type PersonalProject = {
    title: string;
    subtitle: string;
    description: string;
    challenge: string;
    solution: string;
    impact: string;
    technologies: any;
    links: { github: string; demo: null | string };
    image: string;
    period: string;
    estado: string;
    grade?: string;
  };


    const personalProjects: PersonalProject[] = [
    {
      title: t('proyectosPersonales.lista.portfolio.titulo'),
      subtitle: t('proyectosPersonales.lista.portfolio.subtitulo'),
      description: t('proyectosPersonales.lista.portfolio.descripcion'),
      challenge: t('proyectosPersonales.lista.portfolio.reto'),
      solution: t('proyectosPersonales.lista.portfolio.solucion'),
      impact: t('proyectosPersonales.lista.portfolio.impacto'),
      technologies: t('proyectosPersonales.lista.portfolio.tecnologias', { returnObjects: true }),
      links: {
        github: "",
        demo: null
      },
      image: "/project4.jpg",
      period: t('proyectosPersonales.lista.portfolio.periodo'),
      estado: t('proyectosPersonales.lista.portfolio.estado'),
      grade: undefined
    },
    {
      title: t('proyectosPersonales.lista.tennisPredictor.titulo'),
      subtitle: t('proyectosPersonales.lista.tennisPredictor.subtitulo'),
      description: t('proyectosPersonales.lista.tennisPredictor.descripcion'),
      challenge: t('proyectosPersonales.lista.tennisPredictor.reto'),
      solution: t('proyectosPersonales.lista.tennisPredictor.solucion'),
      impact: t('proyectosPersonales.lista.tennisPredictor.impacto'),
      technologies: t('proyectosPersonales.lista.tennisPredictor.tecnologias', { returnObjects: true }),
      links: {
        github: "https://github.com/PepeGdlT/TenisPredictorML",
        demo: null
      },
      image: "/project5.jpg",
      period: t('proyectosPersonales.lista.tennisPredictor.periodo'),
      estado: t('proyectosPersonales.lista.tennisPredictor.estado'),
      grade: undefined
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
    if (element) {
      const headerOffset = 48; // h-12 en Tailwind = 48px
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
    }
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

  // Obtener labels globales para proyectos
  const globalProjectLabels = {
    reto: t('proyectosPersonales.proyectosPersonalesLabels.reto'),
    solucion: t('proyectosPersonales.proyectosPersonalesLabels.solucion'),
    impacto: t('proyectosPersonales.proyectosPersonalesLabels.impacto'),
    tecnologias: t('proyectosPersonales.proyectosPersonalesLabels.tecnologias'),
  };

  // Scroll automático entre secciones principales
  useEffect(() => {
    if (isLoading) return;
    const sectionIds = [
      'hero',
      'sobre-mi',
      'experiencia',
      'proyectos',
      'proyectos-personales',
      'certificaciones',
      'contacto'
    ];
    const shortSections = [
      'hero',
      'sobre-mi',
      'experiencia',
      'contacto'
    ];
    let isScrolling = false;
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      // Detecta la sección actual
      const scrollY = window.scrollY;
      let currentIdx = 0;
      let currentSectionEl: HTMLElement | null = null;
      let currentSectionId = '';
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollY + 100 >= offsetTop && scrollY + 100 < offsetTop + offsetHeight) {
            currentIdx = i;
            currentSectionEl = el;
            currentSectionId = sectionIds[i];
            break;
          }
        }
      }
      // Solo scroll automático en secciones cortas
      if (!shortSections.includes(currentSectionId)) {
        return; // Permite scroll manual en secciones largas
      }
      const direction = e.deltaY > 0 ? 1 : -1;
      let nextIdx = currentIdx + direction;
      if (nextIdx < 0 || nextIdx >= sectionIds.length) return;
      const nextEl = document.getElementById(sectionIds[nextIdx]);
      if (nextEl) {
        isScrolling = true;
        nextEl.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 800);
      }
      e.preventDefault();
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isLoading]);

  // @ts-ignore
    return (
    <>
      <SimpleLoading isLoading={isLoading} />
      <ScrollAnimator />
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
              <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black dark:from-[#020617] dark:via-[#0f172a] dark:to-black">
                <div id="hero-inner" className="max-w-5xl mx-auto text-center relative z-10 will-change-transform">
                  <div className="space-y-12" style={{ opacity: 1 }}>
                    {/* Nombre minimalista */}
                    <div className="space-y-4" data-hero-stagger>
                      <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white bg-clip-text" data-hero-stagger>
                        {t('nombre')}
                      </h1>
                      <AnimatedText
                        text={t('profesion')}
                        className="text-xl md:text-2xl text-gray-400 font-light inline-block"
                        delay={0}
                      />
                    </div>

                    {/* Propuesta de Valor Única - Realista */}
                    <div className="max-w-3xl mx-auto" data-hero-stagger>
                      <p
                        className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
                        dangerouslySetInnerHTML={{ __html: t('hero.valor') }}
                      ></p>
                    </div>

                    {/* Métricas Reales */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8" data-hero-stagger>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">4º</div>
                        <div className="text-sm text-gray-400">{t('hero.metricas.curso')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">6</div>
                        <div className="text-sm text-gray-400">{t('hero.metricas.mesesExperiencia')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">5</div>
                        <div className="text-sm text-gray-400">{t('hero.metricas.proyectosDestacados')}</div>
                      </div>
                    </div>

                    {/* CTA Minimalista */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-12" data-hero-stagger>
                      <MagneticButton>
                        <Button
                          size="lg"
                          onClick={() => scrollToSection('proyectos')}
                          className="px-8 py-4 bg-white text-black hover:bg-gray-100 font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/30"
                        >
                          {t('hero.cta.verProyectos')}
                        </Button>
                      </MagneticButton>
                      <MagneticButton>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => window.open(i18n.language === 'es' ? '/CV-JoseGalvan.pdf' : '/CV-JoseGalvan-en.pdf', '_blank')}
                          className="px-8 py-4 border border-gray-600 text-gray-200 hover:bg-gray-800 font-medium text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-cyan-500/30"
                        >
                          {i18n.language === 'es' ? 'Descargar CV' : 'Download CV'}
                        </Button>
                      </MagneticButton>
                    </div>

                    {/* Iconos de redes sociales minimalistas */}
                    <div className="flex justify-center space-x-8 pt-8" data-hero-stagger>
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
                        <Linkedin className="h-6 w-6 mb-[2px]" />
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
                <div className="absolute inset-0 opacity-[var(--hero-opacity,1)] pointer-events-none" aria-hidden="true" />
              </section>

              {/* Sobre Mí Section */}
              <section id="sobre-mi" data-animate="fade-lux" data-animate-once="true" className="min-h-screen py-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <AnimatedHeading
                      as="h2"
                      text={t('sobreMi.titulo')}
                      className="text-3xl md:text-4xl font-bold mb-4 text-white"
                      variant="letters-up"
                      delay={80}
                    />
                  </div>

                  <AnimatedCard className="bg-black/30 backdrop-blur-sm border border-purple-500/30" data-animate="fade-lux" data-animate-once="true">
                    <div className="p-8 space-y-6">
                      <p className="text-lg leading-relaxed text-purple-100" data-animate="fade-lux" data-animate-delay="50">{t('sobreMi.descripcion1')}</p>
                      <p className="text-lg leading-relaxed text-purple-100" data-animate="fade-lux" data-animate-delay="120">{t('sobreMi.descripcion2')}</p>
                      <p className="text-lg leading-relaxed text-purple-100" data-animate="fade-lux" data-animate-delay="190">{t('sobreMi.descripcion3')}</p>
                    </div>
                  </AnimatedCard>
                </div>
              </section>

              {/* Experiencia Section */}
              <section id="experiencia" data-animate="fade-lux" data-animate-once="true" className="min-h-screen py-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <AnimatedHeading
                      as="h2"
                      text={t('experiencia.titulo')}
                      className="text-3xl md:text-4xl font-bold mb-4 text-white"
                      variant="letters-wipe"
                      delay={60}
                    />
                    <p className="text-lg text-green-200 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm p-4 rounded-lg" data-animate="fade-lux" data-animate-delay="180">
                      {t('experiencia.descripcion')}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {experiences.filter(exp => exp.title.includes("Prácticas")).map((exp, index) => (
                      <AnimatedCard key={index} data-animate="fade-up" data-animate-once="true" className="bg-black/30 backdrop-blur-sm border border-green-500/30">
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
              <section id="proyectos" data-animate="fade-lux" data-animate-once="true" className="min-h-screen py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <AnimatedHeading
                      as="h2"
                      text={t('proyectos.titulo')}
                      className="text-3xl md:text-4xl font-bold mb-4 text-white"
                      variant="gradient-slide"
                      delay={40}
                    />
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm p-4 rounded-lg" data-animate="fade-lux" data-animate-delay="160">
                      {t('proyectos.descripcion')}
                    </p>
                  </div>

                  <div className="grid gap-8 md:gap-12" data-animate-stagger="120">
                    {projects.map((project, index) => (
                      <AnimatedCard key={index} data-animate="fade-up" data-animate-once="true" className="bg-black/30 backdrop-blur-sm border border-blue-500/30">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="aspect-video bg-black/50 rounded-lg overflow-hidden border border-blue-500/30 relative">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width:768px) 100vw, 50vw"
                                priority={index < 1}
                              />
                            </div>
                            <div className="flex items-center justify-between text-sm text-blue-200">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{project.period}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4" />
                                <span>{t('proyectosPersonales.nota')}: {project.grade}</span>
                              </div>
                            </div>
                            {/* Mostrar equipo debajo de la imagen y fecha/nota */}
                            {Array.isArray(project.team) && project.team.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-blue-300">Equipo</h4>
                                <ul className="list-disc list-inside ml-4">
                                  {project.team.map((member: any, idx: number) => (
                                    <li key={idx} className="text-blue-100 text-sm flex items-center gap-2">
                                      {typeof member === 'string' ? member : member.label}
                                      {member.linkedin && (
                                        <a
                                          href={member.linkedin}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-400 hover:text-blue-600"
                                          title="LinkedIn"
                                        >
                                          <Linkedin className="h-4 w-4 mb-[2px]" />
                                        </a>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
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
                                <h4 className="font-semibold text-sm text-blue-300 mb-1">{globalProjectLabels.reto}</h4>
                                <p className="text-sm text-blue-100">{project.challenge}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-blue-300 mb-1">{globalProjectLabels.solucion}</h4>
                                <p className="text-sm text-blue-100">{project.solution}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-blue-300 mb-1">{globalProjectLabels.impacto}</h4>
                                <p className="text-sm text-blue-100">{project.impact}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-blue-300">{globalProjectLabels.tecnologias}</h4>
                              <div className="flex flex-wrap gap-2">
                                {Array.isArray(project.technologies) &&
                                  project.technologies.map((tech: any, idx: number) => (
                                    <Badge key={idx} className="bg-blue-900 text-blue-100">{typeof tech === 'string' ? tech : tech.label || JSON.stringify(tech)}</Badge>
                                  ))
                                }
                              </div>
                            </div>


                            <div className="flex space-x-4">
                              <MagneticButton className="bg-blue-900/40 hover:bg-blue-900/70 p-2 rounded-lg">
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 text-sm text-blue-300 hover:text-white transition-colors"
                                >
                                  <Github className="h-4 w-4" />
                                  <span>GitHub</span>
                                </a>
                              </MagneticButton>
                              {project.links.demo && (
                                <MagneticButton className="bg-blue-900/40 hover:bg-blue-900/70 p-2 rounded-lg">
                                  <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-sm text-blue-300 hover:text-white transition-colors"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>Demo</span>
                                  </a>
                                </MagneticButton>
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
              <section id="proyectos-personales" data-animate="fade-lux" data-animate-once="true" className="min-h-screen py-20 px-4 relative">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    <AnimatedHeading
                      as="h2"
                      text={t('menu.proyectosPersonales')}
                      className="text-3xl md:text-4xl font-bold mb-4 text-white"
                      variant="letters-up"
                      delay={40}
                    />
                    <p className="text-lg text-purple-200 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm p-4 rounded-lg" data-animate="fade-lux" data-animate-delay="140">
                      {t('proyectosPersonales.intro')}
                    </p>
                  </div>

                  <div className="grid gap-8 md:gap-12" data-animate-stagger="120">
                    {personalProjects.map((project, index) => {
                      // Mapeo de color y label para los estados
                      let color = 'gray';
                      let label = project.estado;
                      if (project.estado === 'completo') {
                        color = 'green';
                        label = t('proyectosPersonalesEstados.completo', { defaultValue: 'Completado' });
                      } else if (project.estado === 'enDesarrollo') {
                        color = 'yellow';
                        label = t('proyectosPersonalesEstados.enDesarrollo', { defaultValue: 'En desarrollo' });
                      }
                      return (
                        <AnimatedCard key={index} data-animate="fade-up" data-animate-once="true" className="bg-black/30 backdrop-blur-sm border border-purple-500/30">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="aspect-video bg-black/50 rounded-lg overflow-hidden border border-purple-500/30 relative">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className="object-cover transition-transform duration-500 hover:scale-105"
                                  sizes="(max-width:768px) 100vw, 50vw"
                                  priority={index < 1}
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
                                {/* Etiqueta de nota/grade si existe */}
                                {project.grade && (
                                  <div className="flex items-center space-x-2">
                                    <Award className="h-4 w-4" />
                                    <span>{t('proyectosPersonales.nota')}: {project.grade}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                <p className="text-purple-100 mb-4">{project.description}</p>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-1">{t('proyectosPersonales.proyectosPersonalesLabels.reto')}</h4>
                                  <p className="text-sm text-purple-100">{project.challenge}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-1">{t('proyectosPersonales.proyectosPersonalesLabels.solucion')}</h4>
                                  <p className="text-sm text-purple-100">{project.solution}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-1">{t('proyectosPersonales.proyectosPersonalesLabels.impacto')}</h4>
                                  <p className="text-sm text-purple-100">{project.impact}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-semibold text-sm text-purple-300 mb-2">{t('proyectosPersonales.proyectosPersonalesLabels.tecnologias')}</h4>
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
                                    <MagneticButton className="bg-purple-900/40 hover:bg-purple-900/70 p-2 rounded-lg">
                                      <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-300 hover:text-purple-100 transition-colors flex items-center space-x-1"
                                      >
                                        <Github className="h-4 w-4" />
                                        <span className="text-sm">GitHub</span>
                                      </a>
                                    </MagneticButton>
                                  )}
                                  {project.links.demo && (
                                    <MagneticButton className="bg-purple-900/40 hover:bg-purple-900/70 p-2 rounded-lg">
                                      <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-300 hover:text-purple-100 transition-colors flex items-center space-x-1"
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                        <span className="text-sm">Demo</span>
                                      </a>
                                    </MagneticButton>
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
              <section id="certificaciones" data-animate="fade-lux" data-animate-once="true" className="min-h-screen py-10 px-4 relative flex items-center justify-center">
                <div className="max-w-4xl mx-auto w-full">
                  <div className="text-center mb-16">
                    <AnimatedHeading
                      as="h2"
                      text={t('certificaciones.titulo')}
                      className="text-3xl md:text-4xl font-bold mb-4 text-white"
                      variant="letters-wipe"
                      delay={50}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {certifications.map((cert, index) => (
                      <AnimatedCard key={index} data-animate="fade-up" data-animate-once="true" className="bg-black/30 backdrop-blur-sm border border-yellow-500/30">
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



              {/* Contacto Section - con transición de fondo */}
              <section id="contacto" data-animate="fade-lux" data-animate-once="true" className="min-h-screen py-10 px-4 relative bg-gradient-to-b from-transparent via-black/70 to-black flex items-center justify-center">
                <div className="max-w-4xl mx-auto w-full mt-16">
                  <div className="text-center mb-16">
                    <AnimatedHeading
                      as="h2"
                      text="$ ./contact.sh"
                      className="text-3xl md:text-4xl font-bold mb-4 text-green-400 font-mono"
                      variant="letters-up"
                      delay={40}
                    />
                    <p className="text-lg text-green-300 font-mono" data-animate="fade-lux" data-animate-delay="160">
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
                        {t('contacto.response_time')} | {t('contacto.status_online')}
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
