import { useEffect, useRef } from 'react';

type TargetCursorProps = {
  hoverDuration?: number;
};

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-target]';

export default function TargetCursor({ hoverDuration = 0.95 }: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const auraCurrent = useRef({ x: 0, y: 0, size: 120 });
  const trailCurrent = useRef({ x: 0, y: 0, width: 170, height: 46 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const trailRotation = useRef(0);
  const auraSizeTarget = useRef(120);
  const activeTarget = useRef(false);
  const visible = useRef(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const aura = auraRef.current;
    const trail = trailRef.current;
    if (!cursor || !aura || !trail) return;

    const onMouseMove = (event: MouseEvent) => {
      mouseTarget.current.x = event.clientX;
      mouseTarget.current.y = event.clientY;
      if (!visible.current) {
        visible.current = true;
        cursor.style.opacity = '1';
        aura.style.opacity = '1';
        trail.style.opacity = '0.78';
      }

      const el = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      const interactive = el?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        activeTarget.current = true;
        auraSizeTarget.current = Math.min(230, Math.max(130, Math.max(rect.width, rect.height) + 70));
      } else {
        activeTarget.current = false;
        auraSizeTarget.current = 120;
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      cursor.style.opacity = '0';
      aura.style.opacity = '0';
      trail.style.opacity = '0';
    };

    const animate = () => {
      const cursorFollow = 0.55;
      const auraFollow = 0.18;
      const trailFollow = 0.14;
      const sizeFollow = 0.16;

      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * cursorFollow;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * cursorFollow;

      auraCurrent.current.x += (mouseTarget.current.x - auraCurrent.current.x) * auraFollow;
      auraCurrent.current.y += (mouseTarget.current.y - auraCurrent.current.y) * auraFollow;
      auraCurrent.current.size += (auraSizeTarget.current - auraCurrent.current.size) * sizeFollow;

      const dx = mouseTarget.current.x - lastMouse.current.x;
      const dy = mouseTarget.current.y - lastMouse.current.y;
      const speed = Math.min(1, Math.hypot(dx, dy) / 24);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      trailRotation.current += (angle - trailRotation.current) * 0.22;
      lastMouse.current.x = mouseTarget.current.x;
      lastMouse.current.y = mouseTarget.current.y;

      const trailWidthTarget =
        auraCurrent.current.size * (activeTarget.current ? 1.9 : 1.55) + speed * 36;
      const trailHeightTarget = (activeTarget.current ? 60 : 44) + speed * 22;
      trailCurrent.current.width += (trailWidthTarget - trailCurrent.current.width) * 0.16;
      trailCurrent.current.height += (trailHeightTarget - trailCurrent.current.height) * 0.2;
      trailCurrent.current.x += (mouseCurrent.current.x - trailCurrent.current.x) * trailFollow;
      trailCurrent.current.y += (mouseCurrent.current.y - trailCurrent.current.y) * trailFollow;

      const cx = mouseCurrent.current.x;
      const cy = mouseCurrent.current.y;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;

      aura.style.transform = `translate(${auraCurrent.current.x}px, ${auraCurrent.current.y}px) rotate(${trailRotation.current * 0.2}deg)`;
      aura.style.width = `${auraCurrent.current.size}px`;
      aura.style.height = `${auraCurrent.current.size}px`;

      trail.style.transform = `translate(${trailCurrent.current.x}px, ${trailCurrent.current.y}px) rotate(${trailRotation.current}deg)`;
      trail.style.width = `${trailCurrent.current.width}px`;
      trail.style.height = `${trailCurrent.current.height}px`;
      trail.style.opacity = `${0.55 + speed * 0.3}`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    document.body.classList.add('target-cursor-enabled');
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.body.classList.remove('target-cursor-enabled');
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden md:block">
      <div
        ref={trailRef}
        className="target-cursor-aurora-trail"
        style={{
          transitionDuration: `${hoverDuration}s`,
        }}
      />
      <div
        ref={auraRef}
        className="target-cursor-aurora"
        style={{
          transitionDuration: `${hoverDuration}s`,
        }}
      />
      <div
        ref={cursorRef}
        className="target-cursor-core"
        style={{
          transitionDuration: `${hoverDuration}s`,
        }}
      >
        <span className="target-cursor-dot" />
      </div>
    </div>
  );
}
