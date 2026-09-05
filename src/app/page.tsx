"use client";

import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Database,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Network,
} from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SiteHeader from "@/components/site-header";
import { Brand, ProfileVisual, Stack, TennisVisual } from "@/components/portfolio-visuals";
import ProjectIllustration from "@/components/project-illustration";
import IadjGallery from "@/components/iadj-gallery";
import { copy, links, supportingProjects } from "@/data/portfolio";
import { usePortfolioLanguage } from "@/hooks/use-portfolio-language";

const externalProps = { target: "_blank", rel: "noreferrer" } as const;

export default function Portfolio() {
  const { language } = usePortfolioLanguage();
  const content = copy[language];

  return (
    <>
      <a className="skip-link" href="#main-content">{content.skip}</a>
      <SiteHeader content={content} />

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span />SOFTWARE ENGINEER · AI / ML</p>
              <h1 id="hero-title">José Galván<span>{content.hero.title}</span></h1>
              <p className="hero-intro">{content.hero.intro}</p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  {content.hero.primaryCta}
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
                <a className="button button-secondary" href={links.cv} {...externalProps}>
                  <FileText aria-hidden="true" size={17} />{content.contact.cv}
                </a>
              </div>

              <div className="social-row" aria-label="Professional links">
                <a href={links.github} {...externalProps}><Github aria-hidden="true" />GitHub</a>
                <a href={links.linkedin} {...externalProps}><Linkedin aria-hidden="true" />LinkedIn</a>
                <a href={links.email}><Mail aria-hidden="true" />Email</a>
              </div>
            </div>

            <ProfileVisual language={language} />
          </div>

        </section>

        <section className="section profile-section" aria-labelledby="profile-title">
          <Reveal className="shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow"><span />{content.profile.eyebrow}</p>
                <h2 id="profile-title">{content.profile.title}</h2>
              </div>
              <div className="profile-copy">
                <p>{content.profile.body}</p>
                <p>{content.profile.note}</p>
              </div>
            </div>

            <div className="focus-grid">
              {content.profile.areas.map((area, index) => (
                <article key={area.title}>
                  <span>0{index + 1}</span>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <Reveal className="shell">
            <div className="section-heading">
              <p className="eyebrow"><span />{content.experience.eyebrow}</p>
              <h2 id="experience-title">{content.experience.title}</h2>
            </div>
            <div className="experience-list">
              {content.experience.roles.map((role, index) => (
                <article className={`experience-card ${index === 0 ? "is-current" : ""}`} key={role.company}>
                  <div className="experience-meta">
                    <a className="company-mark" href={index === 0 ? "https://www.clinicaegos.com/" : "https://odins.es/"} aria-label={role.company} {...externalProps}><Brand name={index === 0 ? "egos" : "odins"} size={72} /></a>
                    <div>
                      <span className="role-status">{role.current}</span>
                      <strong>{role.company}</strong>
                      <span>{role.role}</span>
                      <span>{role.period}</span>
                    </div>
                  </div>
                  <div className="experience-content">
                    <p>{role.summary}</p>
                    <ul className="role-technologies">{(index === 0 ? ["React", "TypeScript", "AWS"] : ["GNU Taler", "PrestaShop", "REST", "GitLab CI/CD"]).map((tech) => <li key={tech}>{tech}</li>)}</ul>
                    <ul>
                      {role.details.map((detail) => (
                        <li key={detail}><Check aria-hidden="true" size={17} />{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section projects-section" id="projects" aria-labelledby="projects-title">
          <Reveal className="shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow"><span />{content.projects.eyebrow}</p>
                <h2 id="projects-title">{content.projects.title}</h2>
              </div>
              <p>{content.projects.intro}</p>
            </div>

            <article className="featured-project">
              <div className="featured-copy">
                <div className="project-kicker">
                  <span>{content.common.featured}</span>
                  <span>{content.projects.tennis.label}</span>
                </div>
                <h3>{content.projects.tennis.title}</h3>
                <p>{content.projects.tennis.summary}</p>
                <ul className="featured-technologies"><li><Brand name="python" size={20} />Python</li><li><Brand name="scikitlearn" size={24} />scikit-learn</li><li>XGBoost</li></ul>
                <div className="project-actions">
                  <Link className="button button-primary" href="/projects/tennis-predictor/">
                    {content.common.learnMore}<ArrowUpRight aria-hidden="true" size={18} />
                  </Link>
                  <a className="text-link" href={links.tennis} {...externalProps}>
                    <Github aria-hidden="true" size={18} />{content.common.viewCode}
                  </a>
                </div>
              </div>

              <TennisVisual language={language} />
            </article>

            <div className="supporting-heading">
              <h3>{content.projects.supportingTitle}</h3>
              <span>06</span>
            </div>
            <div className="supporting-grid">
              {supportingProjects.map((project, index) => {
                const item = content.projects.supporting[project.key];
                const metadata = project as typeof project & { grade?: string; private?: boolean; team?: readonly (string | { name: string; linkedin?: string })[] };
                const icons = [Code2, Database, Network, BookOpen];
                const Icon = icons[index] ?? Code2;
                return (
                  <article className={`project-card project-${project.key}`} key={project.key}>
                    {project.key === "iadj" ? <IadjGallery language={language} /> : <ProjectIllustration project={project.key as "trilingo" | "appchat" | "nanofiles" | "mythology" | "entregaVia" | "iadj"} />}
                    <div className="project-card-top">
                      <Icon aria-hidden="true" />
                      <span>0{index + 1}</span>
                    </div>
                    <p className="project-category">{item.category}</p>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <ul className="tech-list" aria-label="Technologies">
                      {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                    {(metadata.grade || metadata.team) && <div className="project-meta-note">
                      {metadata.grade && <span className="project-grade">{language === "es" ? "Nota" : "Grade"}: {metadata.grade}</span>}
                      {metadata.team && <span className="project-team"><strong>{language === "es" ? "Equipo" : "Team"}</strong>{metadata.team.map((member) => <span className="team-member" key={typeof member === "string" ? member : member.name}>{typeof member === "string" ? member : member.name}{typeof member !== "string" && member.linkedin && <a className="team-linkedin" href={member.linkedin} {...externalProps} aria-label={`LinkedIn: ${member.name}`}><Linkedin size={13} /></a>}</span>)}</span>}
                    </div>}
                    <a className="card-link" href={project.href} {...externalProps}>
                      {metadata.private ? (language === "es" ? "Repositorio privado" : "Private repository") : content.common.viewCode}<ArrowUpRight aria-hidden="true" size={17} />
                    </a>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="section research-section" id="research" aria-labelledby="research-title">
          <Reveal className="shell research-layout">
            <div className="research-intro">
              <p className="eyebrow research-eyebrow"><span />{content.research.eyebrow}</p>
              <h2 id="research-title">{content.research.title}</h2>
              <p>{content.research.summary}</p>
            </div>
            <article className="publication-card">
              <div className="publication-index">A / 2026</div>
              <p className="publication-label">{content.research.publicationLabel}</p>
              <h3>{content.research.publicationTitle}</h3>
              <p className="publication-authors">{content.research.authors}</p>
              <div className="publication-meta">
                <span>{content.research.venue}</span>
                <span>{content.research.doi}</span>
              </div>
              <div className="publication-actions">
                <a className="button publication-button" href={links.publication} {...externalProps}>
                  <FileText aria-hidden="true" size={18} />{content.research.articleCta}
                </a>
                <a className="text-link warm-link" href={links.publicationCode} {...externalProps}>
                  <Github aria-hidden="true" size={18} />{content.research.codeCta}
                </a>
              </div>
            </article>
          </Reveal>
        </section>

        <Stack language={language} />

        <section className="section" id="background" aria-labelledby="background-title">
          <Reveal className="shell">
            <div className="section-heading">
              <p className="eyebrow"><span />{content.background.eyebrow}</p>
              <h2 id="background-title">{content.background.title}</h2>
            </div>
            <div className="background-grid">
              <article className="background-card education-card">
                <GraduationCap aria-hidden="true" />
                <span>{content.background.educationLabel}</span>
                <div className="education-list">
                  {content.background.education.map((item) => (
                    <div key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                      <small>{item.institution} · {item.period}</small>
                    </div>
                  ))}
                </div>
              </article>
              <article className="background-card courses-card">
                <BookOpen aria-hidden="true" />
                <span>{content.background.certificationLabel}</span>
                <ul className="certification-list">
                  {content.background.certifications.map((certification) => (
                    <li key={certification.title}>
                      <span className="course-brand"><Brand name={certification.provider === "Amazon Web Services" ? "aws" : "google"} size={30} /></span>
                      <div>
                      <strong>{certification.title}</strong>
                      <small>{certification.provider} · {certification.date}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </Reveal>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <Reveal className="shell contact-layout">
            <div>
              <p className="eyebrow"><span />{content.contact.eyebrow}</p>
              <h2 id="contact-title">{content.contact.title}</h2>
              <p>{content.contact.body}</p>
            </div>
            <div className="contact-links">
              <a className="contact-link primary-contact" href={links.email}>
                <Mail aria-hidden="true" />
                <span><strong>{content.contact.email}</strong><small>pepegdlt02@gmail.com</small></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-link" href={links.github} {...externalProps}>
                <Github aria-hidden="true" /><strong>{content.contact.github}</strong><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-link" href={links.linkedin} {...externalProps}>
                <Linkedin aria-hidden="true" /><strong>{content.contact.linkedin}</strong><ArrowUpRight aria-hidden="true" />
              </a>
              <a className="contact-link" href={links.cv} {...externalProps}>
                <FileText aria-hidden="true" /><strong>{content.contact.cv}</strong><ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <span>© {new Date().getFullYear()} José Galván</span>
          <span>{content.footer}</span>
        </div>
      </footer>
    </>
  );
}
