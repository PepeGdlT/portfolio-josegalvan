import Image from "next/image";
import { ArrowUpRight, Braces, BrainCircuit, Cloud, Database, Layers3 } from "lucide-react";
import type { Language } from "@/data/portfolio";

export function Brand({ name, size = 32 }: { name: string; size?: number }) {
  return <Image className={`brand-icon brand-${name}`} src={`/brands/${name}.svg`} alt="" width={size} height={size} />;
}

export function ProfileVisual({ language }: { language: Language }) {
  return (
    <div className="profile-visual" aria-hidden="true">
      <div className="visual-topline"><span>JG / ENGINEERING</span><span className="status-dot" /></div>
      <div className="orbital-system">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
        <div className="orbital-core"><Braces size={52} strokeWidth={1} /><span>build. learn. repeat.</span></div>
        <div className="orbit-node node-software"><Braces /><span>Software</span></div>
        <div className="orbit-node node-data"><Database /><span>Data</span></div>
        <div className="orbit-node node-ai"><BrainCircuit /><span>AI / ML</span></div>
        <i className="orbital-spark spark-one" /><i className="orbital-spark spark-two" />
      </div>
      <div className="visual-bottomline"><span>{language === "es" ? "Del código a la investigación" : "From code to research"}</span><ArrowUpRight size={16} /></div>
    </div>
  );
}

export function TennisVisual({ language }: { language: Language }) {
  return (
    <div className="tennis-art" aria-hidden="true">
      <div className="tennis-art-label"><span>ATP / MATCH INTELLIGENCE</span><span>01</span></div>
      <div className="court-perspective">
        <svg viewBox="0 0 460 300" fill="none">
          <path d="M55 30H405V270H55Z" fill="#164a43" stroke="#b9ddc4" strokeWidth="1.5" />
          <path d="M55 60H405M55 240H405M140 60V240M320 60V240M140 150H320" stroke="#b9ddc4" strokeWidth="1.5" />
          <path d="M230 22V278" stroke="#ecf1da" strokeWidth="2" strokeDasharray="3 3" />
          <path className="ball-path" d="M105 195Q210 20 355 105" stroke="#d5f477" strokeWidth="2" strokeDasharray="5 7" />
          <circle cx="105" cy="195" r="5" fill="#d5f477" />
          <circle className="tennis-ball" cx="355" cy="105" r="10" fill="#d5f477" />
          <path d="M347 99Q358 103 354 115" stroke="#496b32" strokeWidth="1.3" />
        </svg>
      </div>
      <div className="tennis-tag tag-data"><Database size={16} />{language === "es" ? "Historial → variables" : "History → features"}</div>
      <div className="tennis-tag tag-model"><BrainCircuit size={16} />ELO + Machine Learning</div>
      <div className="tennis-art-footer"><span>{language === "es" ? "Antes del primer saque." : "Before the first serve."}</span><span>PYTHON / ATP</span></div>
    </div>
  );
}

const groups = [
  { icon: Braces, title: { es: "Aplicaciones y backend", en: "Applications & backend" }, note: { es: "Interfaces, lógica de negocio e integraciones.", en: "Interfaces, business logic and integrations." }, items: [["react", "React"], ["typescript", "TypeScript"], ["java", "Java"]], extra: "REST APIs · JPA · SQL" },
  { icon: BrainCircuit, title: { es: "Machine learning y datos", en: "Machine learning & data" }, note: { es: "Predicción ATP e investigación en ensembles.", en: "ATP prediction and ensemble research." }, items: [["python", "Python"], ["scikitlearn", "scikit-learn"], ["pandas", "pandas"]], extra: "NumPy · XGBoost · Jupyter" },
  { icon: Cloud, title: { es: "Cloud y desarrollo", en: "Cloud & development" }, note: { es: "Servicios AWS en EGOS y herramientas de desarrollo.", en: "AWS services at EGOS and development tools." }, items: [["aws", "AWS"], ["docker", "Docker"], ["git", "Git"]], extra: "Amplify · AppSync · DynamoDB · Cognito · Lambda" },
] as const;

export function Stack({ language }: { language: Language }) {
  return (
    <section className="section stack-section" id="stack" aria-labelledby="stack-title">
      <div className="shell">
        <div className="section-heading split-heading">
          <div><p className="eyebrow"><span />Stack</p><h2 id="stack-title">{language === "es" ? "Las herramientas detrás del trabajo." : "The tools behind the work."}</h2></div>
          <p>{language === "es" ? "Cada proyecto pide algo distinto. Estas son las tecnologías que conectan mi experiencia profesional, mis proyectos y mi investigación." : "Each project asks for something different. These technologies connect my professional experience, projects and research."}</p>
        </div>
        <div className="stack-grid">
          {groups.map(({ icon: Icon, title, note, items, extra }, index) => (
            <article className="stack-card" key={title.en}>
              <div className="stack-card-top"><Icon size={22} /><span>0{index + 1}</span></div>
              <h3>{title[language]}</h3><p>{note[language]}</p>
              <ul className="stack-tools">{items.map(([id, name]: readonly [string, string]) => <li key={id}><span className="stack-logo"><Brand name={id} /></span><span>{name}</span></li>)}</ul>
              <div className="stack-extra"><Layers3 size={15} /><span>{extra}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
