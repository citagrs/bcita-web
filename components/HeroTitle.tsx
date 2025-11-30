"use client";
import { useState, useEffect, useRef } from "react";


// ---------------------------------------------------------
//  FONDO ANIMADO (CANVAS)
// ---------------------------------------------------------
function BackgroundFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w: number, h: number;
    let particles: { x: number; y: number; vx: number; vy: number }[];

    function init() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = 300; // altura del fondo detrás del título

      particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(0,102,179,0.25)";

      particles.forEach((p1) => {
        particles.forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            ctx.globalAlpha = 1 - dist / 160;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    ></canvas>
  );
}



// ---------------------------------------------------------
//  TYPING EFFECT
// ---------------------------------------------------------
function TypingLine() {
  const text = "Automatización e Inteligencia Artificial";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;

      if (index > text.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-[#003862]">
      {displayedText}
      <span className="border-r-4 border-[#0066B3] animate-pulse ml-1" />
    </h1>
  );
}



// ---------------------------------------------------------
//  WORD SWITCH
// ---------------------------------------------------------
function WordSwitchLine() {
  const base = "Soluciones en";
  const words = [
    "Power Platform",
    "SharePoint Online",
    "n8n",
    "IA aplicada",
    "Automatización Empresarial",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      1800
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-700">
      {base}{" "}
      <span className="text-[#0066B3] transition-all duration-500 ease-in-out">
        {words[index]}
      </span>
    </h2>
  );
}



// ---------------------------------------------------------
//  COMPONENTE FINAL (CON FONDO)
// ---------------------------------------------------------
export default function HeroTitle() {
  return (
    <div className="relative flex flex-col items-center text-center py-10">
      <BackgroundFlow />

      <TypingLine />
      <WordSwitchLine />
    </div>
  );
}
