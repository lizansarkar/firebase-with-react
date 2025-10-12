// src/components/MagicEffect.jsx
import React, { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import "./MagicEffect.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

/* small helper to create tiny particle DOM elements */
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateGlowVars = (el, mouseX, mouseY, glow, radius) => {
  const r = el.getBoundingClientRect();
  const rx = ((mouseX - r.left) / r.width) * 100;
  const ry = ((mouseY - r.top) / r.height) * 100;
  el.style.setProperty("--glow-x", `${rx}%`);
  el.style.setProperty("--glow-y", `${ry}%`);
  el.style.setProperty("--glow-intensity", glow.toString());
  el.style.setProperty("--glow-radius", `${radius}px`);
};

/* Particle wrapper that wraps any child and gives it hover/particle/tilt/magnetism/click ripple */
const ParticleWrapper = ({
  children,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  enableStars = true,
  disableAnimations = false,
}) => {
  const ref = useRef(null);
  const memoParticles = useRef([]);
  const particlesMounted = useRef([]);
  const timeouts = useRef([]);
  const particlesInit = useRef(false);

  const initParticles = useCallback(() => {
    if (!ref.current || particlesInit.current || !enableStars) return;
    const { width, height } = ref.current.getBoundingClientRect();
    memoParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInit.current = true;
  }, [particleCount, glowColor, enableStars]);

  const startParticles = useCallback(() => {
    if (disableAnimations || !enableStars || !ref.current) return;
    if (!particlesInit.current) initParticles();

    memoParticles.current.forEach((p, i) => {
      const id = setTimeout(() => {
        if (!ref.current) return;
        const clone = p.cloneNode(true);
        ref.current.appendChild(clone);
        particlesMounted.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: "back.out(1.7)"
        });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.8,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, i * 80);
      timeouts.current.push(id);
    });
  }, [initParticles, disableAnimations, enableStars]);

  useEffect(() => {
    startParticles(); // 🟢 সবসময় particle চালু
  }, [startParticles]);

  return (
    <div ref={ref} className="card particle-container card--border-glow" style={{ "--glow-color": glowColor }}>
      {children}
    </div>
  );
};

/* Global spotlight that follows mouse */
const GlobalSpotlight = ({ containerRef, disabled = false, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotRef = useRef(null);

  useEffect(() => {
    if (disabled || !containerRef?.current) return;
    const spot = document.createElement("div");
    spot.className = "global-spotlight";
    spot.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(${glowColor},0.12) 0%, rgba(${glowColor},0.06) 20%, transparent 60%);
      z-index: 200;
      opacity: 0;
      transform: translate(-50%,-50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spot);
    spotRef.current = spot;

    const handleMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) {
        gsap.to(spotRef.current, { opacity: 0, duration: 0.25 });
        return;
      }
      gsap.to(spotRef.current, { left: e.clientX, top: e.clientY, opacity: 0.8, duration: 0.08 });
    };

    document.addEventListener("mousemove", handleMove);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      spotRef.current?.parentNode?.removeChild(spotRef.current);
    };
  }, [containerRef, disabled, spotlightRadius, glowColor]);

  return null;
};

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const MagicEffect = ({
  children,
  enableStars = true,
  enableSpotlight = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const containerRef = useRef(null);
  const isMobile = useMobile();
  const shouldDisable = disableAnimations || isMobile;

  const wrappedChildren = React.Children.map(children, (child) => (
    <ParticleWrapper
      particleCount={particleCount}
      glowColor={glowColor}
      enableStars={enableStars}
      disableAnimations={shouldDisable}
    >
      {child}
    </ParticleWrapper>
  ));

  return (
    <div ref={containerRef} className="magic-effect-wrapper bento-section">
      {enableSpotlight && (
        <GlobalSpotlight
          containerRef={containerRef}
          disabled={!enableSpotlight || shouldDisable}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      <div className="card-grid">
        {wrappedChildren}
      </div>
    </div>
  );
};

export default MagicEffect;