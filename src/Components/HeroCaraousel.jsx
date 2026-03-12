import { useState, useEffect, useCallback } from "react";

const images = ["/images/hero_banner_1.webp", "/images/hero_banner_2.webp", "/images/hero_banner_3.webp"];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const TIMER = 3000; // 3 seconds

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % images.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + images.length) % images.length);
    setProgress(0);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
    setProgress(0);
  };

  // Auto-advance every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, TIMER);

    return () => clearInterval(interval); // cleanup on unmount or re-run
  }, [next]);

  // Progress bar animation
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / TIMER) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(frame);
    };

    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  return (
    <div className="w-full flex flex-col">

      {/* CAROUSEL WRAPPER */}
      <div
        className="
          relative w-full overflow-hidden
          h-[220px] sm:h-[300px] md:h-[420px] lg:h-[560px] xl:h-[685px]
        "
      >
        {/* SLIDES */}
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}

        {/* DOT indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
             className={`
               rounded-full transition-all duration-300
               ${
                 i === current
                   ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/60 hover:bg-white/80"
                 }
                `}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};