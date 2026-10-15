"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollNavigation() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(100, Math.max(0, window.scrollY / distance * 100)) : 0);
      setVisible(window.scrollY > 300);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  function backToTop() {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    document.querySelector<HTMLAnchorElement>(".site-header .brand")?.focus({ preventScroll: true });
  }

  return <>
    <div className="reading-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
      <div style={{ transform: `scaleX(${progress / 100})` }}/>
    </div>
    {visible && <button type="button" className="back-to-top" onClick={backToTop} aria-label="Back to top" title="Back to top"><ArrowUp aria-hidden="true"/></button>}
  </>;
}
