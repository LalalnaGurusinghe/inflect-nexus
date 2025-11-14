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
  buildingX?: boolean;
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

    // Function to generate X shape points for particles to form
    function generateXShapePoints(
      centerX: number,
      centerY: number,
      size: number
    ) {
      const points = [];
      const halfSize = size / 2;
      const thickness = 4; // thickness of the X lines

      // Generate points along the two diagonal lines of the X
      for (let i = 0; i <= 20; i++) {
        const t = i / 20; // parameter from 0 to 1

        // First diagonal (top-left to bottom-right)
        const x1 = centerX - halfSize + t * size;
        const y1 = centerY - halfSize + t * size;

        // Add multiple points around the line for thickness
        for (let j = -thickness; j <= thickness; j++) {
          points.push({
            x: x1 + j * Math.cos(Math.PI / 4),
            y: y1 - j * Math.sin(Math.PI / 4),
          });
        }

        // Second diagonal (top-right to bottom-left)
        const x2 = centerX + halfSize - t * size;
        const y2 = centerY - halfSize + t * size;

        // Add multiple points around the line for thickness
        for (let j = -thickness; j <= thickness; j++) {
          points.push({
            x: x2 + j * Math.cos(-Math.PI / 4),
            y: y2 - j * Math.sin(-Math.PI / 4),
          });
        }
      }

      return points;
    }

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      letters.forEach((l) => l.classList.add("show"));
      logo?.classList.add("floating", "snap");
      meta?.classList.add("show");
      return;
    }

    // groups (I n f l e c t i v e X)
    const groupRight = [0, 1, 2, 3];
    const groupLeft = [4, 5, 6, 7, 8, 9];

    // Initially hide all letters
    letters.forEach((l) => (l.style.opacity = "0"));

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

    function spawnParticles(
      n: number,
      ox?: number,
      oy?: number,
      mode: Particle["mode"] = "scatter"
    ) {
      const cx = ox ?? innerWidth / 2;
      const cy = oy ?? innerHeight / 2;
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 12 + 6) * (mode === "scatter" ? 1 : 0.6);
        const size = 1.5 + Math.random() * 3.5;
        const hue = 100 + Math.random() * 80; // wider green to yellow range
        const saturation = 85 + Math.random() * 15;
        const lightness = 45 + Math.random() * 25;

        particles.push({
          x: cx + (Math.random() - 0.5) * 20, // slight initial spread
          y: cy + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.8 - (mode === "scatter" ? 4 : 0),
          life: 1200 + Math.random() * 1000,
          age: 0,
          size,
          mode,
          hue,
          ax: 0, // acceleration components
          ay: mode === "scatter" ? 0.08 : 0, // gravity for scatter
        });
      }
    }

    // scatterX: converts overlay X into particles that fly outward with enhanced explosion
    function scatterX() {
      // Create a gradual, organic black background transition that feels like it's forming from particles
      try {
        // Start immediate gradual fading - no delay to avoid lag
        root.classList.add("bg-forming");

        // Faster transition to intermediate stage for smoother progression
        setTimeout(() => {
          root.classList.add("bg-darkening");
        }, 150);

        // Final black stage after particles have spread more
        setTimeout(() => {
          root.classList.remove("bg-forming");
          root.classList.add("bg-black");
        }, 600);
      } catch (e) {}
      // overlay center with slight randomization for more natural effect
      const rect = overlay.getBoundingClientRect();
      const ox = rect.left + rect.width / 2 + (Math.random() - 0.5) * 10;
      const oy = rect.top + rect.height / 2 + (Math.random() - 0.5) * 10;

      // Create multiple waves of particles for more dramatic effect
      const totalParticles = 400;
      const waves = 3;

      for (let wave = 0; wave < waves; wave++) {
        setTimeout(() => {
          const particlesPerWave = Math.floor(totalParticles / waves);
          spawnParticles(particlesPerWave, ox, oy, "scatter");

          // Add some particles with different initial velocities for variety
          for (let i = 0; i < particlesPerWave * 0.2; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 15 + 8;
            particles.push({
              x: ox,
              y: oy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed * 0.6 - 6,
              life: 1400 + Math.random() * 800,
              age: 0,
              size: 1 + Math.random() * 2,
              mode: "scatter",
              hue: 120 + Math.random() * 60,
              ax: 0,
              ay: 0.12, // stronger gravity for these
            });
          }
        }, wave * 50); // stagger waves
      }

      // Enhanced dissolve effect
      overlay.style.transition =
        "opacity 600ms cubic-bezier(.4,0,.2,1), transform 600ms cubic-bezier(.4,0,.2,1)";
      overlay.style.transform = "translate(-50%, -50%) scale(0.8)";
      overlay.style.opacity = "0";

      // set existing in-flow X invisible until reformed
      if (special) special.style.opacity = "0";
    }

    // gatherToFinalX: particles fly back to the real X position and form it
    function gatherToFinalX() {
      // compute target positions for all letters
      const letters = Array.from(root.querySelectorAll<HTMLElement>(".letter"));
      const targets = letters.map((letter) => {
        const rect = letter.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });

      // if there are not enough particles, spawn from edges
      if (particles.length < 300) {
        // spawn some from edges randomly
        const edgeCount = 300 - particles.length;
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

      // Special handling for X letter - assign more particles to build the X
      const xLetter = letters.find((l) => l.getAttribute("data-char") === "X");
      const xIndex = letters.findIndex(
        (l) => l.getAttribute("data-char") === "X"
      );

      if (xLetter && xIndex !== -1) {
        const xTarget = targets[xIndex];

        // Create detailed X shape points for particles to form
        const xShapePoints = generateXShapePoints(xTarget.x, xTarget.y, 40); // 40px X size

        // Assign 60% of particles to build the X specifically
        const xParticleCount = Math.floor(particles.length * 0.6);
        let xPointIndex = 0;

        particles.forEach((p, index) => {
          p.mode = "gather";
          p.ax = 0;
          p.ay = 0;
          p.life = Math.max(p.life, 1500); // longer life for X building

          if (index < xParticleCount) {
            // Particles for building the X
            const xPoint = xShapePoints[xPointIndex % xShapePoints.length];
            p.tx = xPoint.x + (Math.random() - 0.5) * 8; // tighter grouping
            p.ty = xPoint.y + (Math.random() - 0.5) * 8;
            p.buildingX = true; // special flag for X building particles
            xPointIndex++;
          } else {
            // Remaining particles for other letters
            const otherLetterIndex = index % (targets.length - 1);
            const actualIndex =
              otherLetterIndex >= xIndex
                ? otherLetterIndex + 1
                : otherLetterIndex;
            p.tx = targets[actualIndex].x + (Math.random() - 0.5) * 20;
            p.ty = targets[actualIndex].y + (Math.random() - 0.5) * 20;
          }
        });
      } else {
        // Fallback to original behavior if X not found
        let targetIndex = 0;
        particles.forEach((p) => {
          p.mode = "gather";
          p.tx = targets[targetIndex].x + (Math.random() - 0.5) * 20;
          p.ty = targets[targetIndex].y + (Math.random() - 0.5) * 20;
          p.ax = 0;
          p.ay = 0;
          p.life = Math.max(p.life, 1200);
          targetIndex = (targetIndex + 1) % targets.length;
        });
      }

      // Start revealing letters early during gathering phase with enhanced visibility
      // But keep X hidden until particles build it
      letters.forEach((letter, i) => {
        const isX = letter.getAttribute("data-char") === "X";

        if (!isX) {
          setTimeout(() => {
            // Add gathering class for pulsing effect
            letter.classList.add("gathering");

            letter.animate(
              [
                {
                  opacity: 0,
                  transform: "scale(1.5) translateY(20px)",
                  filter: "blur(8px) brightness(1.5)",
                  textShadow:
                    "0 0 12px rgba(57,255,20,1), 0 0 20px rgba(57,255,20,0.6)",
                },
                {
                  opacity: 0.85,
                  transform: "scale(1.02) translateY(0px)",
                  filter: "blur(0px) brightness(1.2)",
                  textShadow:
                    "0 0 10px rgba(57,255,20,1), 0 0 15px rgba(57,255,20,0.6), 0 0 4px rgba(57,255,20,1)",
                },
              ],
              {
                duration: 900,
                easing: "cubic-bezier(.25,.46,.45,.94)",
                fill: "forwards",
              }
            );
          }, i * 70); // Faster stagger for more dynamic effect
        } else {
          // Keep X completely hidden initially - it will be built by particles
          letter.style.opacity = "0";
        }
      });

      // play recharge audio & brief flash
      playRecharge();
      flash.classList.add("flash-on");
      setTimeout(() => flash.classList.remove("flash-on"), 140);

      // after gather completes, reveal letters with stagger
      // we'll observe particles arriving in step loop and finalize there
    }

    // audio helpers
    function playSpark() {
      try {
        const Ac =
          (window as any).AudioContext || (window as any).webkitAudioContext;
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
        const Ac =
          (window as any).AudioContext || (window as any).webkitAudioContext;
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
            // Enhanced physics: gravity, air resistance, and slight turbulence
            p.ay = p.ay || 0.08; // gravity
            p.vx += p.ax || 0;
            p.vy += p.ay;

            // air resistance (drag)
            p.vx *= 0.995;
            p.vy *= 0.992;

            // add slight turbulence for more natural movement
            p.vx += (Math.random() - 0.5) * 0.1;
            p.vy += (Math.random() - 0.5) * 0.05;

            p.x += p.vx * (dt / 16);
            p.y += p.vy * (dt / 16);

            // boundary check - particles fade out at edges
            if (p.x < -50 || p.x > innerWidth + 50 || p.y > innerHeight + 50) {
              p.age = p.life; // mark for removal
            }
          } else if (p.mode === "gather") {
            // Enhanced steering behavior with more visible particle streams
            if (p.tx !== undefined && p.ty !== undefined) {
              const toX = p.tx - p.x;
              const toY = p.ty - p.y;
              const dist = Math.max(1, Math.hypot(toX, toY));

              // Enhanced acceleration for more dramatic gathering
              const accel = Math.min(3.5, 6000 / (dist * dist + 150));

              // Smooth steering with enhanced organic variation for visible trails
              const steerX = (toX / dist) * accel;
              const steerY = (toY / dist) * accel;

              // Enhanced perpendicular component for more dramatic trailing effect
              const perpFactor =
                0.12 * Math.sin(p.age * 0.012) * Math.max(0, 1 - dist / 120);
              p.ax = steerX + (-toY / dist) * perpFactor;
              p.ay = steerY + (toX / dist) * perpFactor;

              // Apply acceleration with enhanced momentum
              p.vx += p.ax;
              p.vy += p.ay;

              // Adaptive damping - less aggressive for more visible movement
              const damping = dist < 40 ? 0.88 : 0.96;
              p.vx *= damping;
              p.vy *= damping;

              // Enhanced maximum speed for more dramatic gathering
              const maxSpeed = Math.min(12, dist * 0.15 + 3);
              const currentSpeed = Math.hypot(p.vx, p.vy);
              if (currentSpeed > maxSpeed) {
                p.vx = (p.vx / currentSpeed) * maxSpeed;
                p.vy = (p.vy / currentSpeed) * maxSpeed;
              }

              p.x += p.vx * (dt / 16);
              p.y += p.vy * (dt / 16);

              // Add particle trail effect for gathering
              if (Math.random() < 0.15 && dist > 50) {
                particles.push({
                  x: p.x - p.vx * 0.3,
                  y: p.y - p.vy * 0.3,
                  vx: p.vx * 0.5,
                  vy: p.vy * 0.5,
                  life: 300,
                  age: 0,
                  size: p.size * 0.5,
                  mode: "gather",
                  hue: p.hue,
                  tx: p.tx,
                  ty: p.ty,
                  ax: 0,
                  ay: 0,
                });
              }
            } else {
              // Fallback movement
              p.vx *= 0.98;
              p.vy *= 0.98;
              p.x += p.vx * (dt / 16);
              p.y += p.vy * (dt / 16);
            }
          }

          // Enhanced particle rendering with professional glow effects
          const alpha = Math.max(0, 1 - Math.pow(p.age / p.life, 0.6)); // slower fade for better visibility
          const hue = p.hue || 120;

          // Special rendering for X-building particles
          const isXBuilding = p.buildingX === true;
          const saturation = isXBuilding ? 100 : p.mode === "gather" ? 95 : 90; // brightest for X building
          const lightness = isXBuilding ? 75 : p.mode === "gather" ? 65 : 55; // brightest for X building

          // Create multiple layers for depth and glow - enhanced for X building
          const glowMultiplier = isXBuilding ? 4 : p.mode === "gather" ? 3 : 2;
          const glowSize =
            p.size * (glowMultiplier + Math.sin(p.age * 0.03) * 0.4); // more intense pulsing glow
          const coreSize =
            p.size * (isXBuilding ? 1.0 : p.mode === "gather" ? 0.8 : 0.6); // largest core for X building

          // Outer glow layer
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glowSize
          );
          gradient.addColorStop(
            0,
            `hsla(${hue}, ${saturation}%, ${lightness + 20}%, ${alpha * 0.4})`
          );
          gradient.addColorStop(
            0.3,
            `hsla(${hue}, ${saturation}%, ${lightness + 10}%, ${alpha * 0.6})`
          );
          gradient.addColorStop(
            0.7,
            `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.3})`
          );
          gradient.addColorStop(
            1,
            `hsla(${hue}, ${saturation}%, ${lightness - 10}%, 0)`
          );

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.beginPath();
          ctx.fillStyle = `hsla(${hue}, ${saturation + 10}%, ${
            lightness + 30
          }%, ${alpha * 0.9})`;
          ctx.arc(p.x, p.y, coreSize, 0, Math.PI * 2);
          ctx.fill();

          // Add sparkle effect for larger particles
          if (p.size > 2.5 && Math.random() < 0.1) {
            ctx.beginPath();
            ctx.fillStyle = `hsla(${hue + 30}, 100%, 90%, ${alpha * 0.8})`;
            ctx.arc(
              p.x + (Math.random() - 0.5) * p.size,
              p.y + (Math.random() - 0.5) * p.size,
              p.size * 0.2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }

        // Enhanced gather completion: more sophisticated convergence detection
        if (
          !gatherComplete &&
          particles.length > 0 &&
          particles[0].mode === "gather"
        ) {
          // Calculate convergence metrics with improved thresholds
          let totalDist = 0;
          let count = 0;
          let convergedCount = 0;
          const convergenceThreshold = 15; // slightly more lenient

          for (const p of particles) {
            if (p.tx !== undefined && p.ty !== undefined) {
              const d = Math.hypot(p.x - p.tx, p.y - p.ty);
              totalDist += d;
              count++;
              if (d < convergenceThreshold) convergedCount++;
            }
          }

          const avgDist = count > 0 ? totalDist / count : 0;
          const convergenceRatio = count > 0 ? convergedCount / count : 0;

          // More responsive trigger completion when particles are close to targets
          if (avgDist < 25 && convergenceRatio > 0.75) {
            gatherComplete = true;

            // Enhanced letter reveal with professional animation
            const letters = Array.from(
              root.querySelectorAll<HTMLElement>(".letter")
            );

            // Create a dramatic name reveal effect
            letters.forEach((letter, i) => {
              setTimeout(() => {
                // Remove gathering class and add show class
                letter.classList.remove("gathering");
                letter.classList.add("show");

                // Enhanced reveal animation with more dramatic effects
                letter.animate(
                  [
                    {
                      opacity: 0.85,
                      transform: "scale(1.1) rotate(6deg) translateY(8px)",
                      filter: "blur(0px) brightness(1.3) saturate(1.2)",
                      textShadow:
                        "0 0 15px rgba(57,255,20,0.8), 0 0 25px rgba(57,255,20,0.5)",
                    },
                    {
                      opacity: 1,
                      transform: "scale(1.4) rotate(-3deg) translateY(-8px)",
                      filter: "blur(0px) brightness(2) saturate(1.5)",
                      textShadow:
                        "0 0 35px rgba(57,255,20,1), 0 0 50px rgba(57,255,20,0.8), 0 0 15px rgba(57,255,20,1)",
                    },
                    {
                      opacity: 1,
                      transform: "scale(1) rotate(0deg) translateY(0px)",
                      filter: "blur(0px) brightness(1.3) saturate(1.2)",
                      textShadow:
                        "0 0 8px rgba(57,255,20,1), 0 0 12px rgba(57,255,20,0.7), 0 0 4px rgba(57,255,20,1)",
                    },
                  ],
                  {
                    duration: 1400,
                    easing: "cubic-bezier(.25,.46,.45,.94)",
                    fill: "forwards",
                  }
                );

                // Add multiple pulse effects to make the name more prominent
                setTimeout(() => {
                  letter.animate(
                    [
                      {
                        transform: "scale(1)",
                        textShadow:
                          "0 0 12px rgba(57,255,20,1), 0 0 18px rgba(57,255,20,0.7), 0 0 5px rgba(57,255,20,1)",
                        filter: "brightness(1.3) saturate(1.2)",
                      },
                      {
                        transform: "scale(1.12)",
                        textShadow:
                          "0 0 20px rgba(57,255,20,1), 0 0 35px rgba(57,255,20,0.9), 0 0 10px rgba(57,255,20,1)",
                        filter: "brightness(1.6) saturate(1.4)",
                      },
                      {
                        transform: "scale(1)",
                        textShadow:
                          "0 0 12px rgba(57,255,20,1), 0 0 18px rgba(57,255,20,0.7), 0 0 5px rgba(57,255,20,1)",
                        filter: "brightness(1.3) saturate(1.2)",
                      },
                    ],
                    {
                      duration: 600,
                      easing: "ease-in-out",
                    }
                  );
                }, 500);

                // Second pulse for emphasis
                setTimeout(() => {
                  letter.animate(
                    [
                      {
                        transform: "scale(1)",
                        textShadow:
                          "0 0 12px rgba(57,255,20,1), 0 0 18px rgba(57,255,20,0.7), 0 0 5px rgba(57,255,20,1)",
                        filter: "brightness(1.3) saturate(1.2)",
                      },
                      {
                        transform: "scale(1.08)",
                        textShadow:
                          "0 0 18px rgba(57,255,20,1), 0 0 28px rgba(57,255,20,0.8), 0 0 8px rgba(57,255,20,1)",
                        filter: "brightness(1.5) saturate(1.3)",
                      },
                      {
                        transform: "scale(1)",
                        textShadow:
                          "0 0 12px rgba(57,255,20,1), 0 0 18px rgba(57,255,20,0.7), 0 0 5px rgba(57,255,20,1)",
                        filter: "brightness(1.3) saturate(1.2)",
                      },
                    ],
                    {
                      duration: 500,
                      easing: "ease-in-out",
                    }
                  );
                }, 900);

                // Ensure final styles with enhanced glow and full opacity
                setTimeout(() => {
                  letter.style.opacity = "1";
                  letter.style.transform =
                    "scale(1) rotate(0deg) translateY(0px)";
                  letter.style.filter = "brightness(1.3) saturate(1.2)";
                  letter.style.textShadow =
                    "0 0 5px #39FF14, 0 0 8px #39FF14, 0 0 3px #39FF14, 0 0 10px rgba(57,255,20,0.5)";
                  letter.classList.add("final-reveal");
                }, 1410);
              }, i * 120); // Slightly faster stagger for more impact
            });

            // Create convergence spark effects
            particles.forEach((p) => {
              if (p.tx && p.ty && Math.random() < 0.3) {
                // Spawn mini spark particles at convergence points
                for (let i = 0; i < 5; i++) {
                  const angle = Math.random() * Math.PI * 2;
                  const speed = Math.random() * 3 + 1;
                  particles.push({
                    x: p.tx,
                    y: p.ty,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 400 + Math.random() * 200,
                    age: 0,
                    size: 0.5 + Math.random() * 1,
                    mode: "scatter",
                    hue: 140 + Math.random() * 40,
                    ax: 0,
                    ay: 0.05,
                  });
                }
              }
            });

            // Clear particles after reveal completes
            setTimeout(() => {
              particles.length = 0;
            }, 1200);

            // Smoothly restore the hero background after the X has reformed
            try {
              // short delay so the reveal animations read nicely before restoring
              setTimeout(() => {
                root.classList.remove("bg-black", "bg-darkening");
                root.classList.add("bg-revealed");
                // remove the temporary revealed marker after the transition finishes
                setTimeout(() => root.classList.remove("bg-revealed"), 1400); // match CSS transition time
              }, 600);
            } catch (e) {}
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
    const finalizeAt = 3200; // finalize at 3.2s (adjusted for stagger)
    const floatingAt = 3800; // floating start
    const metaShowAt = 4000;

    const timers: number[] = [];

    // initial spark + overlay explode already played by parent code (keep)
    // schedule scatter overlay X into particles
    timers.push(
      window.setTimeout(() => {
        // scatter overlay X into particles
        scatterX();
      }, scatterAt)
    );

    // schedule gather -> particles fly back to final letters
    timers.push(
      window.setTimeout(() => {
        gatherToFinalX();
      }, gatherAt)
    );

    // safety/fallback: ensure the final letters are revealed even if gather detection misses
    timers.push(
      window.setTimeout(() => {
        if (!gatherComplete) {
          const letters = Array.from(
            root.querySelectorAll<HTMLElement>(".letter")
          );
          letters.forEach((letter, i) => {
            setTimeout(() => {
              letter.classList.add("show");
              letter.style.opacity = "1";
              letter.animate(
                [
                  { transform: "scale(1.2)", filter: "brightness(1.5)" },
                  { transform: "scale(1)" },
                ],
                { duration: 400, easing: "cubic-bezier(.2,.9,.2,1)" }
              );
            }, i * 120);
          });
          // clear any lingering particles so the word looks clean
          particles.length = 0;
        }
        // remove overlay if still present
        try {
          overlay.remove();
        } catch {}
        try {
          // ensure background is restored in the fallback finalization
          root.classList.remove("bg-black", "bg-forming", "bg-darkening");
          root.classList.add("bg-revealed");
          setTimeout(() => root.classList.remove("bg-revealed"), 1400); // match CSS transition time
        } catch {}
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
      className="hero font-heading"
      id="home"
      aria-labelledby="hero-logo"
      style={
        {
          "--hero-bg": `url(${heroBg})`,
          backgroundImage: `radial-gradient(1200px 500px at 50% 20%, rgba(57,255,20,0.02), transparent 10%), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        } as React.CSSProperties & { "--hero-bg": string }
      }
    >
      <div className="bg-overlay" aria-hidden />

      <div className="inner" aria-hidden={false}>
        <h1
          id="hero-logo"
          className="logo brand-highlight"
          aria-label="InflectiveX"
        >
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
          <p className="subtitle-2">
            Where Ideas Transform into Digital Reality
          </p>

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

        /* Initial forming stage - very light darkening starts immediately */
        .hero.bg-forming {
          background-image: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.6) 100%), 
                           radial-gradient(1200px 500px at 50% 20%, rgba(57,255,20,0.02), transparent 10%), 
                           url(var(--hero-bg));
          background-size: 100% 100%, cover, cover;
          background-position: center, center, center;
          transition: background-image 300ms cubic-bezier(.25,.1,.25,1), 
                     background-size 300ms cubic-bezier(.25,.1,.25,1);
        }

        /* Gradual overlay darkening */
        .hero.bg-forming .bg-overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.7));
          opacity: 0.9;
          transition: background 300ms cubic-bezier(.25,.1,.25,1), 
                     opacity 300ms cubic-bezier(.25,.1,.25,1);
        }

        /* Intermediate darkening stage - more pronounced */
        .hero.bg-darkening {
          background-image: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.8) 65%, rgba(0,0,0,0.95) 100%), 
                           radial-gradient(1200px 500px at 50% 20%, rgba(57,255,20,0.01), transparent 10%), 
                           url(var(--hero-bg));
          background-size: 110% 110%, cover, cover;
          background-position: center, center, center;
        }

        /* Enhanced darkening on overlay */
        .hero.bg-darkening .bg-overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.9));
          opacity: 0.95;
        }

        /* Full black backdrop after particles have scattered */
        .hero.bg-black {
          background-image: none !important;
          background-color: #000 !important;
          transition: background-color 500ms cubic-bezier(.25,.1,.25,1), 
                     background-image 500ms cubic-bezier(.25,.1,.25,1);
        }

        /* Completely hide overlay when fully black */
        .hero.bg-black .bg-overlay {
          opacity: 0;
          transition: opacity 500ms cubic-bezier(.25,.1,.25,1);
        }

        /* Smooth restoration when particles gather back */
        .hero.bg-revealed {
          transition: background-color 1400ms cubic-bezier(.25,.46,.45,.94), 
                     background-image 1400ms cubic-bezier(.25,.46,.45,.94);
        }

        /* Enhanced overlay restoration */
        .hero.bg-revealed .bg-overlay {
          transition: opacity 1400ms cubic-bezier(.25,.46,.45,.94), 
                     background 1400ms cubic-bezier(.25,.46,.45,.94);
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

        /* Logo typography: use project's heading font (Tailwind font-heading) */
        .logo {
          font-weight: 900;
          font-size: 140px;
          line-height: 1;
          letter-spacing: 2px;
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
          background: linear-gradient(45deg, #39FF14, #00FF88, #39FF14);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transform-origin: center;
          -webkit-text-stroke: 0.5px rgba(0,0,0,0.2);
          text-shadow:
            0 0 2px rgba(57,255,20,0.8);
          transition: transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease, text-shadow 420ms ease, filter 420ms ease;
          will-change: transform, opacity, filter, text-shadow;
        }

        .letter.gathering {
          opacity: 0.9;
          filter: blur(0px) brightness(1.1);
          text-shadow: 0 0 3px rgba(57,255,20,0.8), 0 0 5px rgba(57,255,20,0.4);
          animation: letterGatherPulse 1.2s ease-in-out infinite;
        }

        @keyframes letterGatherPulse {
          0%, 100% { 
            opacity: 0.85;
            text-shadow: 0 0 2px rgba(57,255,20,0.7), 0 0 4px rgba(57,255,20,0.3);
            transform: scale(1);
            filter: blur(0px) brightness(1.05);
          }
          50% { 
            opacity: 1;
            text-shadow: 0 0 3px rgba(57,255,20,0.9), 0 0 6px rgba(57,255,20,0.5);
            transform: scale(1.02);
            filter: blur(0px) brightness(1.2);
          }
        }

        .from-left { transform: translateX(-300px) translateY(6px) scale(0.98); }
        .from-right { transform: translateX(300px) translateY(6px) scale(0.98); }
        .letter.show { opacity: 1; transform: translateX(0) translateY(0) scale(1); }

        .letter.final-reveal {
          opacity: 1 !important;
          filter: brightness(1.1) saturate(1.1) !important;
          text-shadow: 0 0 2px #39FF14, 0 0 4px rgba(57,255,20,0.6) !important;
          animation: finalGlow 2.5s ease-in-out infinite;
        }

        @keyframes finalGlow {
          0%, 100% { 
            text-shadow: 0 0 5px #39FF14, 0 0 8px #39FF14, 0 0 3px #39FF14, 0 0 10px rgba(57,255,20,0.6);
            filter: brightness(1.3) saturate(1.2);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 6px #39FF14, 0 0 10px #39FF14, 0 0 3px #39FF14, 0 0 12px rgba(57,255,20,0.8);
            filter: brightness(1.5) saturate(1.3);
            transform: scale(1.01);
          }
        }

        .overlay-x {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(1.8);
          z-index: 30;
          background: linear-gradient(45deg, #39FF14, #00FF88, #39FF14);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          pointer-events: none;
          text-shadow:
            0 0 3px #39FF14,
            0 0 6px #39FF14;
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

        .logo.snap { letter-spacing: 6px; }
        .letter[data-char="X"] {
          animation: xGlow 3s ease-in-out infinite;
        }

        @keyframes xGlow {
          0%, 100% { 
            text-shadow: 0 0 5px #39FF14, 0 0 8px #39FF14, 0 0 3px #39FF14, 0 0 10px rgba(57,255,20,0.6);
          }
          50% { 
            text-shadow: 0 0 10px #39FF14, 0 0 15px #39FF14, 0 0 5px #39FF14, 0 0 20px rgba(57,255,20,0.8);
          }
        }
        .logo.floating { 
          animation: logoFloat 8000ms ease-in-out infinite, logoBreath 4s ease-in-out infinite; 
        }
        @keyframes logoFloat { 
          0% { transform: translateY(0) rotateX(0deg); } 
          25% { transform: translateY(-3px) rotateX(1deg); }
          50% { transform: translateY(-6px) rotateX(0deg); } 
          75% { transform: translateY(-3px) rotateX(-1deg); }
          100% { transform: translateY(0) rotateX(0deg); } 
        }
        @keyframes logoBreath {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-1px) scale(1.01); }
          100% { transform: translateY(0) scale(1); }
        }

        .bg-pulse .bg-overlay { animation: bgPulse 1000ms ease-in-out; }
        @keyframes bgPulse { 
          0% { filter: none; opacity: 1; } 
          50% { filter: brightness(1.08) saturate(1.06) hue-rotate(5deg); opacity: 0.95; } 
          100% { filter: none; opacity: 1; } 
        }

        .meta { 
          margin-top: 30px; 
          opacity: 0; 
          transform: translateY(20px) scale(0.95); 
          transition: opacity 600ms cubic-bezier(.25,.46,.45,.94), transform 600ms cubic-bezier(.25,.46,.45,.94); 
          pointer-events:none; 
        }
        .meta.show { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
          pointer-events:auto;
          animation: subtitleFade 1.5s ease-out;
        }

        @keyframes subtitleFade {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .subtitle { 
          font-weight: 600; 
          font-size: 28px; 
          letter-spacing: 1px; 
          color: #d7ffd6; 
          margin: 0;
          text-transform: uppercase;
        }
        .subtitle-2 { 
          margin-top: 12px; 
          color: rgba(230,255,230,0.8); 
          font-size: 16px; 
          font-weight: 300;
          letter-spacing: 1px;
        }

        .actions { display:flex; gap:12px; justify-content:center; margin-top:18px; flex-wrap:wrap; }
        .btn { 
          padding: 12px 22px; 
          border-radius: 10px; 
          font-weight: 700; 
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .btn:hover::before {
          left: 100%;
        }
        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(57,255,20,0.2);
        }
        .btn-primary { 
          background: linear-gradient(180deg, rgba(57,255,20,0.12), rgba(57,255,20,0.06)); 
          color: var(--neon); 
          border: 1px solid rgba(57,255,20,0.24); 
        }
        .btn-primary:hover {
          background: linear-gradient(180deg, rgba(57,255,20,0.2), rgba(57,255,20,0.1));
          border-color: rgba(57,255,20,0.5);
        }
        .btn-outline { 
          background: transparent; 
          color: #eafee3; 
          border: 1px solid rgba(255,255,255,0.12); 
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(57,255,20,0.3);
          color: var(--neon);
        }

        .particles { position: fixed; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; z-index: 20; }

        .scroll-indicator { 
          position: absolute; 
          bottom: 28px; 
          left: 50%; 
          transform: translateX(-50%); 
          z-index: 6; 
          opacity: 0.95; 
          animation: indicatorFade 3s ease-in-out infinite;
        }
        .chev { 
          width: 36px; 
          height: 36px; 
          color: var(--neon); 
          filter: drop-shadow(0 6px 26px rgba(57,255,20,0.08)); 
          animation: chevronBounce 2s ease-in-out infinite;
        }

        @keyframes indicatorFade {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 0.6; }
        }
        @keyframes chevronBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-2px); }
        }

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
