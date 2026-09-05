"use client";

import { ArrowDown, ArrowUpRight, Check, Github, Info } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SiteHeader from "@/components/site-header";
import { copy, links, tennisMetrics } from "@/data/portfolio";
import { usePortfolioLanguage } from "@/hooks/use-portfolio-language";

const externalProps = { target: "_blank", rel: "noreferrer" } as const;

export default function TennisCaseStudy() {
  const { language } = usePortfolioLanguage();
  const content = copy[language];
  const project = content.tennisCase;

  const modelLabels = {
    ensemble: project.evaluation.model,
    elo: project.evaluation.elo,
    ranking: project.evaluation.ranking,
  } as const;

  const formatMetric = (metric: "accuracy" | "auc" | "logLoss" | "brier", value: number) => {
    if (metric === "accuracy") {
      return new Intl.NumberFormat(language, { style: "percent", minimumFractionDigits: 2 }).format(value);
    }
    return value.toFixed(4).replace(".", language === "es" ? "," : ".");
  };

  const comparisonMetrics = [
    { key: "accuracy", label: project.evaluation.accuracy, direction: project.evaluation.higher },
    { key: "auc", label: project.evaluation.auc, direction: project.evaluation.higher },
    { key: "logLoss", label: project.evaluation.logLoss, direction: project.evaluation.lower },
    { key: "brier", label: project.evaluation.brier, direction: project.evaluation.lower },
  ] as const;

  return (
    <>
      <a className="skip-link" href="#case-content">{content.skip}</a>
      <SiteHeader content={content} caseStudy />

      <main id="case-content" className="case-study">
        <section className="case-hero" aria-labelledby="case-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="shell case-hero-layout">
            <div>
              <p className="eyebrow"><span />{project.eyebrow}</p>
              <h1 id="case-title">{project.title}</h1>
              <p className="case-lead">{project.summary}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#results">
                  {project.snapshot}<ArrowDown aria-hidden="true" size={18} />
                </a>
                <a className="button button-secondary" href={links.tennis} {...externalProps}>
                  <Github aria-hidden="true" size={18} />{project.repo}
                </a>
              </div>
            </div>

            <div className="court-visual" aria-hidden="true">
              <div className="court-lines">
                <span className="court-net" />
                <span className="ball ball-one" />
                <span className="ball ball-two" />
              </div>
              <div className="court-caption">
                <span>ATP / ML</span>
                <span>STRICTLY FUTURE TEST</span>
              </div>
            </div>
          </div>
        </section>

        <section className="case-snapshot" aria-labelledby="snapshot-title">
          <div className="shell">
            <div className="snapshot-heading">
              <h2 id="snapshot-title">{project.snapshot}</h2>
              <span>{project.snapshotNote}</span>
            </div>
            <div className="snapshot-grid">
              <div><strong>{tennisMetrics.protocol.trainMatches}</strong><span>{project.metrics.train}</span></div>
              <div><strong>{tennisMetrics.protocol.testMatches}</strong><span>{project.metrics.test}</span></div>
              <div><strong>{tennisMetrics.protocol.features}</strong><span>{project.metrics.features}</span></div>
              <div><strong className="date-value">{tennisMetrics.protocol.testWindow}</strong><span>{project.metrics.window}</span></div>
            </div>
          </div>
        </section>

        <section className="case-section" aria-labelledby="problem-title">
          <Reveal className="shell case-two-column">
            <div>
              <p className="eyebrow"><span />{project.problem.eyebrow}</p>
              <h2 id="problem-title">{project.problem.title}</h2>
            </div>
            <p className="case-body">{project.problem.body}</p>
          </Reveal>
        </section>

        <section className="case-section case-tinted" aria-labelledby="data-title">
          <Reveal className="shell">
            <div className="case-two-column">
              <div>
                <p className="eyebrow"><span />{project.data.eyebrow}</p>
                <h2 id="data-title">{project.data.title}</h2>
              </div>
              <p className="case-body">{project.data.body}</p>
            </div>
            <div className="feature-grid">
              {project.data.features.map((feature, index) => (
                <article key={feature.title}>
                  <span>0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="case-section" aria-labelledby="approach-title">
          <Reveal className="shell">
            <div className="case-two-column">
              <div>
                <p className="eyebrow"><span />{project.approach.eyebrow}</p>
                <h2 id="approach-title">{project.approach.title}</h2>
              </div>
              <p className="case-body">{project.approach.body}</p>
            </div>
            <ol className="approach-steps">
              {project.approach.steps.map((step, index) => (
                <li key={step.title}>
                  <span>0{index + 1}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                  {index < project.approach.steps.length - 1 && <ArrowDown aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="case-section results-section" id="results" aria-labelledby="evaluation-title">
          <Reveal className="shell">
            <div className="case-two-column">
              <div>
                <p className="eyebrow"><span />{project.evaluation.eyebrow}</p>
                <h2 id="evaluation-title">{project.evaluation.title}</h2>
              </div>
              <p className="case-body">{project.evaluation.body}</p>
            </div>

            <div className="comparison-grid">
              {comparisonMetrics.map((metric) => (
                <article className="metric-comparison" key={metric.key}>
                  <div className="comparison-heading"><h3>{metric.label}</h3><span>{metric.direction}</span></div>
                  <div className="bar-list">
                    {tennisMetrics.results.map((result) => {
                      const value = result[metric.key];
                      return (
                        <div className={`bar-row ${result.key === "ensemble" ? "is-model" : ""}`} key={result.key}>
                          <div><span>{modelLabels[result.key]}</span><strong>{formatMetric(metric.key, value)}</strong></div>
                          <div className="bar-track"><span style={{ width: `${value * 100}%` }} /></div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>

            <div className="result-table-wrap">
              <table className="result-table">
                <caption className="sr-only">External test comparison across four metrics</caption>
                <thead>
                  <tr>
                    <th scope="col">Model</th>
                    {comparisonMetrics.map((metric) => <th scope="col" key={metric.key}>{metric.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tennisMetrics.results.map((result) => (
                    <tr className={result.key === "ensemble" ? "is-model" : ""} key={result.key}>
                      <th scope="row">{modelLabels[result.key]}</th>
                      {comparisonMetrics.map((metric) => <td key={metric.key}>{formatMetric(metric.key, result[metric.key])}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="caveat-note">
              <Info aria-hidden="true" />
              <p>{project.evaluation.caveat}</p>
            </aside>
          </Reveal>
        </section>

        <section className="case-section" aria-labelledby="technology-title">
          <Reveal className="shell case-two-column">
            <div>
              <p className="eyebrow"><span />{project.technology.eyebrow}</p>
              <h2 id="technology-title">{project.technology.title}</h2>
            </div>
            <div>
              <ul className="case-tech-list">
                {project.technology.items.map((technology) => (
                  <li key={technology}><Check aria-hidden="true" size={16} />{technology}</li>
                ))}
              </ul>
              <p className="case-body technology-closing">{project.technology.closing}</p>
              <a className="button button-primary" href={links.tennis} {...externalProps}>
                <Github aria-hidden="true" size={18} />{project.repo}<ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </Reveal>
        </section>

        <nav className="case-footer shell" aria-label="Case study footer navigation">
          <Link href="/#projects">← {content.common.backHome}</Link>
          <a href={links.tennis} {...externalProps}>{project.repo} <ArrowUpRight aria-hidden="true" size={16} /></a>
        </nav>
      </main>
    </>
  );
}
