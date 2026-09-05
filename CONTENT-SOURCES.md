# Content and asset sources

Reviewed 5 September 2026. English and Spanish copy live in `src/data/portfolio.ts`.

## Personal and professional facts

- `public/CV-JoseGalvan.pdf`: primary source for EGOS (March 2026–present), OdinS (January–July 2025), responsibilities, degree, thesis, publication and cloud courses. The PDF was read in full with `pdftotext`.
- https://es.linkedin.com/in/jose-galvan-de-la-torre: public search-indexed profile confirms OdinS, UMU, languages and the July 2025 AWS / Google Cloud courses. The public extract is older than the CV; it does not replace the CV's more recent employment information. Posts marked as liked or recommended were not treated as José's own work.
- https://github.com/PepeGdlT: public profile and repository listing. No additional social accounts were confidently identified.
- https://github.com/PepeGdlT/ProyectoRC: public repository confirms the academic Java networking project and NanoFiles source directory.

The United States experience claim was removed because it was not supported by the CV or accessible profile. Courses are presented as cloud training, not as AWS Certified Cloud Practitioner or employment at Amazon/Google. The master's is left as upcoming because its actual start was not independently confirmed.

## Existing project and research information

Project descriptions and the ATP case study existed before this revision. The homepage now introduces the ATP problem and approach; numerical results remain in the case study. GitHub API access returned 403, raw README requests returned 404, and several repository pages could not be fetched. Their full implementation and saved metrics could not be revalidated in this session. No new performance figures were added.

The publication title, co-authors, venue and article number are in the supplied CV. Direct publisher access returned 429; DOI resolution was unavailable in the browsing tool. Publication status is supported by the CV, not a fresh publisher verification.

## Recovered project notes and collaborators

The old portfolio data in commit `4858831` contained these course grades: AppChat 9.5, Greek Mythology Intelligent System 9.75, NanoFiles 10.0 and Trilingo 9.0. It also listed Eduardo Meca Valles on NanoFiles, Eduardo Meca Valles and Juan Antonio Mendoza Perez on the mythology project, and Sergio Maiquez Noguera plus Pablo Sánchez Albaladejo on Trilingo. Those notes and teammate links are restored in the project cards; the LinkedIn URLs are only added where a matching public profile was found. Juan's URL was preserved from the old portfolio.

The new `iadj` repository was inspected directly as a Unity 2023.1.22f1 project. Its scenes and scripts cover steering behaviours such as seek, flee, arrive, align, face, wander, path following, wall avoidance, formations and pathfinding. `Entrega-Via` was supplied as a private Python repository; because its source is not accessible without credentials, the card identifies it as private and does not invent a description beyond its language and project name.

The IADJ gallery uses the five screenshots supplied by José in the conversation (`public/projects/iadj/`). They show the playable map, combat state, steering debug view and autonomous battles. VIA is labelled as computer vision because that is the clarification supplied by José; no narrower algorithm or application claim is made.

## Local brand assets

- EGOS: https://www.clinicaegos.com/icon.svg (official symbol).
- OdinS: https://odins.es/wp-content/uploads/2023/04/logo.svg (official logo).
- Technology and training logos: Devicon v2.17.0, https://github.com/devicons/devicon/tree/v2.17.0/icons, downloaded from the pinned jsDelivr mirror. Devicon is MIT licensed; brand marks retain their respective owners' rights. License: https://github.com/devicons/devicon/blob/v2.17.0/LICENSE.

Assets are served from `public/brands`, so visitors do not make third-party image requests. The orbital and tennis illustrations are decorative CSS/SVG compositions, not screenshots of project interfaces.
