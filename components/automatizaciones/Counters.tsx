"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Stat = {
  prefix?: string;
  value: number;
  suffix?: string;
  caption: string;
};

const STATS: Stat[] = [
  { prefix: "De 2 días a ", value: 10, suffix: " min", caption: "Renovaciones que antes tomaban días" },
  { value: 300, suffix: " págs", caption: "Leídas por IA en 4 minutos" },
  { prefix: "+", value: 800, caption: "Usuarios en soluciones en producción" },
  { value: 5, caption: "Países con proyectos implementados" },
];

function CountUp({ target, run }: { target: number; run: boolean }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduce]);

  return <>{n.toLocaleString("es-CO")}</>;
}

export default function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-[#0a1220] py-16 sm:py-20" aria-label="Cifras de BCITA">
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center"
      >
        {STATS.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white leading-none">
              {s.prefix && (
                <span className="text-emerald-400">{s.prefix}</span>
              )}
              <span>
                <CountUp target={s.value} run={inView} />
                {s.suffix}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400 max-w-[22ch]">
              {s.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
