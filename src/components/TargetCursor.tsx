import { useEffect, useRef } from 'react';

type TargetCursorProps = {
  hoverDuration?: number;
};

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-target]';

export default function TargetCursor({ hoverDuration = 0.95 }: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });
  const targetCenter = useRef({ x: 0, y: 0 });
  const targetCurrent = useRef({ x: 0, y: 0, size: 34 });
  const targetSize = useRef(34);
  const activeTarget = useRef(false);
  const visible = useRef(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const target = targetRef.current;
    if (!cursor || !target) return;

    const onMouseMove = (event: MouseEvent) => {
      mouseTarget.current.x = event.clientX;
      mouseTarget.current.y = event.clientY;
      if (!visible.current) {
        visible.current = true;
        cursor.style.opacity = '1';
        target.style.opacity = '0.9';
      }

      const el = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      const interactive = el?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        activeTarget.current = true;
        targetCenter.current.x = rect.left + rect.width / 2;
        targetCenter.current.y = rect.top + rect.height / 2;
        targetSize.current = Math.max(34, Math.max(rect.width, rect.height) + 14);
      } else {
        activeTarget.current = false;
        targetCenter.current.x = event.clientX;
        targetCenter.current.y = event.clientY;
        targetSize.current = 34;
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      cursor.style.opacity = '0';
      target.style.opacity = '0';
    };

    const animate = () => {
      const follow = 0.52;
      const targetFollow = 0.42;
      const sizeFollow = 0.38;

      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * follow;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * follow;

      targetCurrent.current.x += (targetCenter.current.x - targetCurrent.current.x) * targetFollow;
      targetCurrent.current.y += (targetCenter.current.y - targetCurrent.current.y) * targetFollow;
      targetCurrent.current.size += (targetSize.current - targetCurrent.current.size) * sizeFollow;

      const cx = mouseCurrent.current.x;
      const cy = mouseCurrent.current.y;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;

      const tx = activeTarget.current ? targetCurrent.current.x : cx;
      const ty = activeTarget.current ? targetCurrent.current.y : cy;
      const size = activeTarget.current ? targetCurrent.current.size : targetCurrent.current.size;
      target.style.transform = `translate(${tx}px, ${ty}px)`;
      target.style.width = `${size}px`;
      target.style.height = `${size}px`;

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
        ref={targetRef}
        className="target-cursor-ring"
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
