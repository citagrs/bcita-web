"use client";

const ROW_A = [
  "Power Automate",
  "Power Apps",
  "SharePoint",
  "Dataverse",
  "Azure Functions",
  "AI Builder",
  "Copilot Studio",
];

const ROW_B = [
  "n8n",
  "Make",
  "Zapier",
  "APIs REST",
  "Claude API",
  "Azure OpenAI",
  "Webhooks",
];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="tsm">
      <div className={`tsm__track ${reverse ? "tsm__track--rev" : ""}`}>
        {doubled.map((label, i) => (
          <span className="tsm__chip" key={`${label}-${i}`}>
            {label}
          </span>
        ))}
      </div>

      <style jsx>{`
        .tsm {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            #000 8%,
            #000 92%,
            transparent
          );
          mask-image: linear-gradient(
            90deg,
            transparent,
            #000 8%,
            #000 92%,
            transparent
          );
        }
        .tsm__track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: scroll 34s linear infinite;
        }
        .tsm__track--rev {
          animation-direction: reverse;
        }
        .tsm:hover .tsm__track {
          animation-play-state: paused;
        }
        .tsm__chip {
          flex-shrink: 0;
          padding: 0.7rem 1.3rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #d7e6f2;
          font-size: 0.92rem;
          font-weight: 600;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .tsm__chip:hover {
          border-color: rgba(52, 211, 153, 0.6);
          color: #fff;
          background: rgba(5, 150, 105, 0.15);
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tsm__track {
            animation: none;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      className="py-20 sm:py-24 bg-[#0a1220]"
      aria-labelledby="stack-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="stack-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
          >
            Las herramientas que dominamos
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Elegimos la herramienta según tu problema — no al revés.
          </p>
        </div>

        <div className="space-y-4">
          <Marquee items={ROW_A} />
          <Marquee items={ROW_B} reverse />
        </div>
      </div>
    </section>
  );
}
