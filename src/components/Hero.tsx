import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  age: number;
  size: number;
  mode?: "scatter" | "gather";
  tx?: number;
  ty?: number;
  ax?: number;
  ay?: number;
  hue?: number;
};

export const Hero = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>(".letter"));
    const special = root.querySelector<HTMLElement>(".letter[data-char='X']");
    const logo = root.querySelector<HTMLElement>(".logo");
    const meta = root.querySelector<HTMLElement>(".meta");
    const canvas = root.querySelector<HTMLCanvasElement>(".particles");

    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      letters.forEach((l) => l.classList.add("show"));
      logo?.classList.add("floating", "snap");
      meta?.classList.add("show");
      return;
    }

    // groups (I n f l e c t i v e X)
    const groupRight = [0, 1, 2, 3];
    const groupLeft = [4, 5, 6, 7, 8, 9];

    groupLeft.forEach((i) => letters[i]?.classList.add("from-left"));
    groupRight.forEach((i) => letters[i]?.classList.add("from-right"));
    if (special) special.style.opacity = "0";

    // overlay X centered
    const overlay = document.createElement("div");
    overlay.className = "overlay-x x-large";
    overlay.textContent = special?.textContent || "X";
    document.body.appendChild(overlay);

    // small screen flash element (for reformation)
    const flash = document.createElement("div");
    flash.className = "x-flash";
    document.body.appendChild(flash);

    // canvas setup
    const ctx = canvas?.getContext("2d") || null;
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // particles array and helpers
    const particles: Particle[] = [];

    function spawnParticles(n: number, ox?: number, oy?: number, mode: Particle["mode"] = "scatter") {
      const cx = ox ?? innerWidth / 2;
      const cy = oy ?? innerHeight / 2;
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 6 + 2) * (mode === "scatter" ? 1 : 0.6);
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.6 - (mode === "scatter" ? 2 : 0),
          life: 800 + Math.random() * 600,
          age: 0,
          size: 1 + Math.random() * 3,
          mode,
          hue: 120 + Math.random() * 40,
        });
      }
    }

    // scatterX: converts overlay X into particles that fly outward
    function scatterX() {
      // overlay center
      const rect = overlay.getBoundingClientRect();
      const ox = rect.left + rect.width / 2;
      const oy = rect.top + rect.height / 2;
      // spawn many particles
      spawnParticles(80, ox, oy, "scatter");

      // wipe overlay visually with a short dissolve (overlay will be removed later)
      overlay.style.transition = "opacity 520ms ease";
      overlay.style.opacity = "0";

      // set existing in-flow X invisible until reformed
      if (special) special.style.opacity = "0";
    }

    // gatherToFinalX: particles fly back to the real X position and form it
    function gatherToFinalX() {
      // compute target position for in-flow X (center)
      const xEl = root.querySelector<HTMLElement>('.letter[data-char="X"]');
      const r = xEl?.getBoundingClientRect();
      const targetX = r ? r.left + r.width / 2 : innerWidth / 2;
      const targetY = r ? r.top + r.height / 2 : innerHeight / 2;

      // if there are not enough particles, spawn from edges
      if (particles.length < 80) {
        // spawn some from edges randomly
        const edgeCount = 80 - particles.length;
        for (let i = 0; i < edgeCount; i++) {
          const fromEdge = Math.random();
          let sx = 0,
            sy = 0;
          if (fromEdge < 0.25) {
            sx = Math.random() * innerWidth;
            sy = -10;
          } else if (fromEdge < 0.5) {
            sx = Math.random() * innerWidth;
            sy = innerHeight + 10;
          } else if (fromEdge < 0.75) {
            sx = -10;
            sy = Math.random() * innerHeight;
          } else {
            sx = innerWidth + 10;
            sy = Math.random() * innerHeight;
          }
          spawnParticles(1, sx, sy, "gather");
        }
      }

      // assign target to each particle and switch to gather mode
      particles.forEach((p) => {
        p.mode = "gather";
        p.tx = targetX + (Math.random() - 0.5) * 4; // small jitter
        p.ty = targetY + (Math.random() - 0.5) * 4;
        p.ax = 0;
        p.ay = 0;
        // reduce life to keep them alive long enough for gather
        p.life = Math.max(p.life, 1000);
      });

      // play recharge audio & brief flash
      playRecharge();
      flash.classList.add("flash-on");
      setTimeout(() => flash.classList.remove("flash-on"), 140);

      // after gather completes, reveal real X with bounce
      // we'll observe particles arriving in step loop and finalize there
    }

    // audio helpers
    function playSpark() {
      try {
        const Ac = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ac = new Ac();
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = "sawtooth";
        o.frequency.setValueAtTime(1500, ac.currentTime);
        o.frequency.exponentialRampToValueAtTime(700, ac.currentTime + 0.16);
        g.gain.setValueAtTime(0.0001, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.18, ac.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.16);
        o.connect(g);
        g.connect(ac.destination);
        o.start();
        o.stop(ac.currentTime + 0.16);
      } catch (e) {}
    }
    function playRecharge() {
      try {
        const Ac = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ac = new Ac();
        const o1 = ac.createOscillator();
        const o2 = ac.createOscillator();
        const g = ac.createGain();
        o1.type = "sine";
        o2.type = "sawtooth";
        o1.frequency.setValueAtTime(600, ac.currentTime);
        o2.frequency.setValueAtTime(1200, ac.currentTime);
        o1.frequency.exponentialRampToValueAtTime(1200, ac.currentTime + 0.18);
        o2.frequency.exponentialRampToValueAtTime(800, ac.currentTime + 0.18);
        g.gain.setValueAtTime(0.0001, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.2, ac.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.22);
        o1.connect(g);
        o2.connect(g);
        g.connect(ac.destination);
        o1.start();
        o2.start();
        o1.stop(ac.currentTime + 0.22);
        o2.stop(ac.currentTime + 0.22);
      } catch (e) {}
    }

    // main step loop - updates scatter / gather physics + draws
    let lastTime = performance.now();
    let gathering = false;
    let gatherComplete = false;
    function step(now: number) {
      const dt = Math.min(40, now - lastTime); // clamp dt
      lastTime = now;

      // physics and drawing
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.age += dt;
          if (p.age >= p.life) {
            particles.splice(i, 1);
            continue;
          }

          if (p.mode === "scatter") {
            // normal ballistic with slight drag
            p.vx *= 0.996;
            p.vy += 0.04;
            p.vy *= 0.998;
            p.x += p.vx * (dt / 16);
            p.y += p.vy * (dt / 16);
          } else if (p.mode === "gather") {
            // steering behavior toward (tx,ty)
            if (p.tx !== undefined && p.ty !== undefined) {
              const toX = p.tx - p.x;
              const toY = p.ty - p.y;
              const dist = Math.max(1, Math.hypot(toX, toY));
              // acceleration magnitude depends on dist (magnetic)
              const accel = Math.min(0.6, 2000 / (dist + 200));
              // curve a bit: add perpendicular component for organic trail
              const perpFactor = 0.04 * Math.sign(Math.random() - 0.5);
              p.vx += (toX / dist) * accel + (-toY / dist) * perpFactor;
              p.vy += (toY / dist) * accel + (toX / dist) * perpFactor;
              // apply damping
              p.vx *= 0.94;
              p.vy *= 0.94;
              p.x += p.vx * (dt / 16);
              p.y += p.vy * (dt / 16);
            } else {
              p.x += p.vx * (dt / 16);
              p.y += p.vy * (dt / 16);
            }
          } else {
            p.x += p.vx * (dt / 16);
            p.y += p.vy * (dt / 16);
          }

          // draw glowing particle
          const alpha = Math.max(0, 1 - p.age / p.life);
          ctx.beginPath();
          ctx.fillStyle = `rgba(57,255,20,${alpha})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // check gather completion: when many particles near target
        if (!gatherComplete && particles.length > 0 && particles[0].mode === "gather") {
          // compute average distance to target (use first particle target if any)
          const any = particles.find((p) => p.tx !== undefined && p.ty !== undefined);
          if (any) {
            const tx = any.tx!;
            const ty = any.ty!;
            let close = 0;
            for (const p of particles) {
              if (!p.tx || !p.ty) continue;
              const d = Math.hypot(p.x - tx, p.y - ty);
              if (d < 8) close++;
            }
            // if sufficient particles reached (60% of initial), finalize
            if (close >= Math.max(32, Math.floor(particles.length * 0.6))) {
              gatherComplete = true;
              // reveal real X with a smooth, organic gain (scale + fade + deblur)
              if (special) {
                // ensure it's in the shown state so layout is correct
                special.classList.add("show");
                // start from invisible / blown-out state
                special.style.opacity = "0";
                // animate with Web Animations API for a smooth gain
                special.animate(
                  [
                    { opacity: 0, transform: "scale(1.6)", filter: "blur(6px) brightness(2)" },
                    { opacity: 1, transform: "scale(1.03)", filter: "blur(0px) brightness(1.3)" },
                    { opacity: 1, transform: "scale(1)", filter: "none" },
                  ],
                  { duration: 640, easing: "cubic-bezier(.2,.9,.2,1)", fill: "forwards" }
                );
                // ensure final inline styles are set after animation
                setTimeout(() => {
                  special.style.opacity = "1";
                  special.style.filter = "";
                }, 660);
              }
              // micro particle merge effect at the target
              spawnParticles(36, any.tx, any.ty, "gather");
              // remove remaining canvas particles after the reveal finishes
              setTimeout(() => {
                particles.length = 0;
              }, 520);
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);

    // timeline and integration with existing letter fly-ins
    const phase1 = 800; // overlay explode / initial spark
    const phase2Start = phase1; // 800ms - start scattering and letters fly
    const letterStagger = 120;
    const scatterAt = phase2Start; // scatter overlay into particles at 0.8s
    const gatherAt = 2000; // gather back at 2.0s
    const finalizeAt = 2600; // finalize at 2.6s
    const floatingAt = 2800; // floating start
    const metaShowAt = 3000;

    const timers: number[] = [];

    // initial spark + overlay explode already played by parent code (keep)
    // schedule letters fly-in but keep overlay scatter simultaneously
    timers.push(
      window.setTimeout(() => {
        // fly in left group
        groupLeft.forEach((idx, i) => {
          timers.push(
            window.setTimeout(() => {
              letters[idx].classList.add("show");
              letters[idx].classList.remove("from-left");
            }, i * letterStagger)
          );
        });
        // fly in right group
        groupRight.forEach((idx, i) => {
          timers.push(
            window.setTimeout(() => {
              letters[idx].classList.add("show");
              letters[idx].classList.remove("from-right");
            }, i * letterStagger)
          );
        });

        // scatter overlay X into particles
        scatterX();
      }, scatterAt)
    );

    // schedule gather -> particles fly back to final X
    timers.push(
      window.setTimeout(() => {
        gatherToFinalX();
      }, gatherAt)
    );

    // safety/fallback: ensure the final "X" is revealed even if gather detection misses
    timers.push(
      window.setTimeout(() => {
        if (special) {
          special.classList.add("show");
          special.style.opacity = "1";
          special.animate(
            [
              { transform: "scale(1.18)", filter: "brightness(1.5)" },
              { transform: "scale(0.96)" },
              { transform: "scale(1)" },
            ],
            { duration: 420, easing: "cubic-bezier(.2,.9,.2,1)" }
          );
        }
        // clear any lingering particles so the word looks clean
        particles.length = 0;
        // remove overlay if still present
        try { overlay.remove(); } catch {}
      }, finalizeAt)
    );

    // finalize: logo snap + floating + reveal meta
    timers.push(
      window.setTimeout(() => {
        logo?.classList.add("snap");
        logo?.classList.add("floating");
      }, floatingAt)
    );

    timers.push(
      window.setTimeout(() => {
        meta?.classList.add("show");
      }, metaShowAt)
    );

    // initial small spark play (on mount)
    playSpark();

    // cleanup on unmount
    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        overlay.remove();
      } catch {}
      try {
        flash.remove();
      } catch {}
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero"
      aria-labelledby="hero-logo"
      style={{
        backgroundImage: `radial-gradient(1200px 500px at 50% 20%, rgba(57,255,20,0.02), transparent 10%), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-overlay" aria-hidden />

      <div className="inner" aria-hidden={false}>
        <h1 id="hero-logo" className="logo" aria-label="InflectiveX">
          <span className="letter" data-char="I">
            I
          </span>
          <span className="letter" data-char="n">
            n
          </span>
          <span className="letter" data-char="f">
            f
          </span>
          <span className="letter" data-char="l">
            l
          </span>
          <span className="letter" data-char="e">
            e
          </span>
          <span className="letter" data-char="c">
            c
          </span>
          <span className="letter" data-char="t">
            t
          </span>
          <span className="letter" data-char="i">
            i
          </span>
          <span className="letter" data-char="v">
            v
          </span>
          <span className="letter" data-char="e">
            e
          </span>
          <span className="letter" data-char="X">
            X
          </span>
        </h1>

        <div className="meta">
          <p className="subtitle">Empowering Innovation Through Technology</p>
          <p className="subtitle-2">Where Ideas Transform into Digital Reality</p>

          <div className="actions">
            <Button size="lg" className="btn btn-primary">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="btn btn-outline">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>

      <canvas className="particles" />

      <div className="scroll-indicator" aria-hidden>
        <ChevronDown className="chev" />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

        :root {
          --neon: #39FF14;
          --bg: #03040a;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: var(--bg);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.6));
          z-index: 0;
        }

        .inner {
          position: relative;
          z-index: 5;
          text-align: center;
          width: 100%;
          max-width: 1200px;
          padding: clamp(18px, 4vw, 60px);
          box-sizing: border-box;
        }

        /* Logo typography: changed to Orbitron to match provided image */
        .logo {
          font-family: 'Orbitron', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-weight: 800;
          font-size: 140px;
          line-height: 1;
          letter-spacing: 6px;
          display: inline-flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.02ch;
          white-space: nowrap;
          margin: 0 auto;
          pointer-events: none;
          transform-origin: center;
        }

        @media (max-width: 640px) {
          .logo {
            font-size: 80px;
          }
        }

        .letter {
          display: inline-block;
          vertical-align: baseline;
          color: var(--neon);
          opacity: 0;
          transform-origin: center;
          -webkit-text-stroke: 0.6px rgba(0,0,0,0.2);
          text-shadow:
            0 0 10px #39FF14,
            0 0 20px #39FF14,
            0 0 40px #39FF14,
            0 0 80px #39FF14;
          transition: transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease, text-shadow 420ms ease;
          will-change: transform, opacity;
        }

        .from-left { transform: translateX(-300px) translateY(6px) scale(0.98); }
        .from-right { transform: translateX(300px) translateY(6px) scale(0.98); }
        .letter.show { opacity: 1; transform: translateX(0) translateY(0) scale(1); }

        .overlay-x {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(1.8);
          z-index: 30;
          color: var(--neon);
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          pointer-events: none;
          text-shadow:
            0 0 10px #39FF14,
            0 0 20px #39FF14,
            0 0 40px #39FF14,
            0 0 80px #39FF14;
          transition: transform 760ms cubic-bezier(.22,.9,.34,1), opacity 520ms ease;
        }

        .x-large { font-size: clamp(120px, 28vw, 320px); }
        @media (max-width:640px) { .x-large { font-size: clamp(80px, 30vw, 160px); } }

        .overlay-x.explode { animation: overlayExplode 820ms cubic-bezier(.2,.9,.2,1) forwards; }
        @keyframes overlayExplode {
          0% { transform: translate(-50%,-50%) scale(0.6); opacity:0; }
          40% { transform: translate(-50%,-50%) scale(2.4); opacity:1; }
          80% { transform: translate(-50%,-50%) scale(1.12); }
          100% { transform: translate(-50%,-50%) scale(1); opacity:1; }
        }

        .x-flash {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(closest-side, rgba(57,255,20,0.06), rgba(0,0,0,0));
          opacity: 0;
          z-index: 40;
          transition: opacity 160ms ease;
        }
        .x-flash.flash-on { opacity: 0.65; transition: opacity 120ms ease; }

        .logo.snap { letter-spacing: 4px; }
        .letter.x-final { transform: scale(0.985); transition: transform 260ms ease; }
        .logo.floating { animation: logoFloat 6000ms ease-in-out infinite; }
        @keyframes logoFloat { 0% { transform: translateY(0); } 50% { transform: translateY(-7px); } 100% { transform: translateY(0); } }

        .bg-pulse .bg-overlay { animation: bgPulse 800ms ease-in-out; }
        @keyframes bgPulse { 0% { filter: none; opacity: 1; } 50% { filter: brightness(1.14) saturate(1.12); opacity: 0.92; } 100% { filter: none; opacity: 1; } }

        .meta { margin-top: 22px; opacity: 0; transform: translateY(8px); transition: opacity 420ms ease, transform 420ms ease; pointer-events:none; }
        .meta.show { opacity: 1; transform: none; pointer-events:auto; }
        .subtitle { font-family: 'Rajdhani', sans-serif; font-weight: 500; font-size: 32px; letter-spacing: 2px; color: #d7ffd6; margin: 0; }
        .subtitle-2 { margin-top: 8px; color: rgba(230,255,230,0.85); font-size: 18px; font-weight: 500; }

        .actions { display:flex; gap:12px; justify-content:center; margin-top:18px; flex-wrap:wrap; }
        .btn { padding: 12px 22px; border-radius: 10px; font-weight: 700; }
        .btn-primary { background: linear-gradient(180deg, rgba(57,255,20,0.12), rgba(57,255,20,0.06)); color: var(--neon); border: 1px solid rgba(57,255,20,0.24); }
        .btn-outline { background: transparent; color: #eafee3; border: 1px solid rgba(255,255,255,0.12); }

        .particles { position: fixed; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; z-index: 20; }

        .scroll-indicator { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 6; opacity: 0.95; }
        .chev { width: 36px; height: 36px; color: var(--neon); filter: drop-shadow(0 6px 26px rgba(57,255,20,0.08)); }

        @media (prefers-reduced-motion: reduce) {
          .logo, .letter, .overlay-x, .bg-overlay, .particles { animation: none !important; transition: none !important; transform: none !important; }
          .letter { opacity: 1 !important; }
          .meta { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
     <style>{`
       /* smoother per-letter reveal support for X */
       .letter.smooth-reveal {
         transition: transform 640ms cubic-bezier(.2,.9,.2,1), opacity 420ms ease, filter 640ms ease;
         will-change: transform, opacity, filter;
       }
     `}</style>
     </section>
   );
 };
