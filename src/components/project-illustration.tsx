type Project = "trilingo" | "appchat" | "nanofiles" | "mythology" | "entregaVia" | "iadj";

// Concept illustrations, rather than screenshots of the applications.
export default function ProjectIllustration({ project }: { project: Project }) {
  return (
    <div className={`project-illustration illustration-${project}`} aria-hidden="true">
      <span className="illustration-caption">{({ trilingo: "LANGUAGE / LEARNING", appchat: "PEOPLE / CONVERSATIONS", nanofiles: "PEER / TO / PEER", mythology: "KNOWLEDGE / CONNECTIONS", entregaVia: "VISION / COMPUTER VISION", iadj: "AGENTS / STEERING" })[project]}</span>
      <svg viewBox="0 0 520 260" fill="none" focusable="false">
        {project === "trilingo" && <>
          <circle cx="260" cy="140" r="96" className="art-orbit" />
          <g className="art-float art-back"><rect x="108" y="66" width="112" height="142" rx="15" fill="#213b32" stroke="#63836c" transform="rotate(-14 164 137)" /><text x="138" y="143" transform="rotate(-14 164 137)">Hola</text></g>
          <g className="art-float art-front"><rect x="294" y="66" width="112" height="142" rx="15" fill="#293b38" stroke="#63836c" transform="rotate(14 350 137)" /><text x="307" y="140" transform="rotate(14 350 137)">Salut</text></g>
          <g className="art-center"><rect x="196" y="44" width="128" height="166" rx="16" fill="#15251e" stroke="#b7edb0" /><path d="M217 70H244M217 178H301" stroke="#749d75" strokeWidth="2" /><text x="218" y="131" className="art-word">Hello.</text><path d="m275 69 5 5 10-12" stroke="#b7edb0" strokeWidth="2" /></g>
          <circle cx="388" cy="54" r="4" fill="currentColor" />
        </>}
        {project === "appchat" && <>
          <ellipse cx="260" cy="143" rx="173" ry="95" className="art-orbit" />
          <g className="art-float art-back"><rect x="92" y="60" width="228" height="82" rx="18" fill="#24233e" stroke="#66648d" /><path d="m118 142-9 17 35-17" fill="#24233e" stroke="#66648d" /><circle cx="125" cy="92" r="12" fill="#65618c" /><path d="M150 86H275M150 101H239" stroke="#b5b2d4" strokeWidth="5" strokeLinecap="round" /></g>
          <g className="art-float art-front"><rect x="214" y="139" width="212" height="69" rx="17" fill="#35324e" stroke="#a4a0d2" /><path d="m394 208 12 15-35-15" fill="#35324e" stroke="#a4a0d2" /><path d="M236 162H374M236 178H331" stroke="#d5cff2" strokeWidth="5" strokeLinecap="round" /><path d="m383 184 4 4 8-9m-2 9 8-9" stroke="#b7edb0" strokeWidth="1.5" /></g>
          <g className="typing-dots" fill="#c4bafa"><circle cx="126" cy="190" r="4" /><circle cx="143" cy="190" r="4" /><circle cx="160" cy="190" r="4" /></g>
        </>}
        {project === "nanofiles" && <>
          <path className="network-path" d="m112 76 148 57 147-57M112 205l148-72 147 72M112 76v129m295-129v129" stroke="#7dadd2" strokeDasharray="5 8" />
          <circle cx="260" cy="133" r="56" className="art-orbit" />
          <rect x="230" y="103" width="60" height="60" rx="14" fill="#1e3448" stroke="#99c5e8" />
          <path d="M247 123h25m-25 10h25m-25 10h25" stroke="#a8cee9" strokeWidth="3" strokeLinecap="round" />
          {[[112,76],[407,76],[112,205],[407,205]].map(([x,y], index) => <g key={index} className={`file-node file-node-${index}`}><rect x={x-25} y={y-25} width="50" height="50" rx="12" fill="#15232e" stroke="#6286a1" /><path d={`M${x-8} ${y-12}h11l6 6v19h-17zM${x+3} ${y-12}v6h6`} stroke="#a8cee9" strokeWidth="1.5" /></g>)}
          <circle className="data-packet" cx="184" cy="104" r="4" fill="#bde3ff" /><circle className="data-packet packet-two" cx="333" cy="169" r="4" fill="#bde3ff" />
        </>}
        {project === "mythology" && <>
          <circle cx="260" cy="134" r="93" className="art-orbit" />
          <path className="network-path" d="M136 71 260 48l123 23-10 133-113 24-126-24zM136 71l124 63 123-63M134 204l126-70 113 70" stroke="#b7976f" strokeOpacity=".55" strokeDasharray="3 7" />
          <g className="art-center" stroke="#dcc29a" strokeWidth="2"><path d="m188 108 72-43 72 43z" fill="#3d3224" /><path d="M194 118h132M190 193h140M183 202h154" /><path d="M208 128v54m15-54v54m29-54v54m16-54v54m29-54v54m15-54v54" /><circle cx="260" cy="92" r="6" /></g>
          {[[136,71],[383,71],[373,204],[134,204]].map(([x,y],index) => <g key={index} className={`file-node file-node-${index}`}><circle cx={x} cy={y} r="12" fill="#2d261e" stroke="#c6a579" /><circle cx={x} cy={y} r="3" fill="#e0be8c" /></g>)}
        </>}
        {project === "entregaVia" && <>
          <rect x="92" y="50" width="336" height="176" rx="15" fill="#27231e" stroke="#c9ab7d" strokeWidth="2" />
          <path d="M112 195 177 123l42 37 51-67 139 102" stroke="#967956" strokeWidth="2" />
          <circle cx="164" cy="96" r="15" fill="#d5ae79" fillOpacity=".35" stroke="#e0bd89" strokeWidth="2" />
          <rect x="260" y="88" width="90" height="82" rx="5" stroke="#b7edb0" strokeWidth="2" strokeDasharray="6 5" />
          <path d="M271 103h18m-18 0v18m60-18h-18m18 0v18m-60 36h18m-18 0v-18m60 18h-18m18 0v-18" stroke="#b7edb0" strokeWidth="2" />
          <text x="274" y="187" fill="#b7edb0" fontSize="10" fontFamily="monospace">VISION MODEL</text>
          <path className="network-path" d="M74 75 106 89M415 216l35 13" stroke="#b7edb0" strokeDasharray="4 7" />
          <circle className="data-packet" cx="74" cy="75" r="5" fill="#b7edb0" />
        </>}
        {project === "iadj" && <>
          <path d="M98 198 260 64l162 134" stroke="#99c5e8" strokeOpacity=".4" strokeDasharray="4 7" />
          <circle cx="260" cy="136" r="58" className="art-orbit" />
          <g className="art-center"><path d="M260 95 292 115v42l-32 20-32-20v-42z" fill="#2b4558" stroke="#a8cee9" strokeWidth="2" /><circle cx="248" cy="133" r="4" fill="#b7edb0" /><circle cx="272" cy="133" r="4" fill="#b7edb0" /><path d="M247 149q13 10 26 0" stroke="#b7edb0" strokeWidth="2" /></g>
          <g className="agent-node"><circle cx="118" cy="96" r="28" fill="#1d3040" stroke="#90bce0" /><path d="m105 96 10 10 18-21" stroke="#b7edb0" strokeWidth="2" /></g>
          <g className="agent-node node-target"><circle cx="402" cy="183" r="28" fill="#1d3040" stroke="#90bce0" /><path d="M389 183h26m-13-13v26" stroke="#b7edb0" strokeWidth="2" /></g>
          <path className="network-path" d="M145 105Q220 116 228 125M292 150Q342 166 374 177" stroke="#b7edb0" strokeDasharray="5 7" />
        </>}
      </svg>
      <span className="illustration-corner">↗</span>
    </div>
  );
}
