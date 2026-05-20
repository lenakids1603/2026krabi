import { useRef, MouseEvent } from 'react';

/**
 * A hook to enable smooth desktop click-and-drag horizontal scrolling
 * for scroll containers, while fully preserving normal click events on child elements.
 */
export function useDragToScroll() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // Only drag with left click
    if (e.button !== 0) return;

    const element = ref.current;
    if (!element) return;

    const startX = e.pageX - element.offsetLeft;
    const scrollLeft = element.scrollLeft;
    let hasMoved = false;

    // Change cursor style to 'grabbing' on document body during active drag
    document.body.style.cursor = 'grabbing';
    element.style.cursor = 'grabbing';
    // Temporarily disable scroll snapping during active manual drag for smooth movement
    element.style.scrollSnapType = 'none';

    const onMouseMove = (moveEvent: MouseEvent | globalThis.MouseEvent) => {
      const x = moveEvent.pageX - element.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag sensitivity multiplier

      if (Math.abs(walk) > 5) {
        hasMoved = true;
      }

      element.scrollLeft = scrollLeft - walk;
    };

    const onMouseUpOrLeave = () => {
      // Clean up body styles
      document.body.style.cursor = '';
      if (element) {
        element.style.cursor = 'grab';
        element.style.removeProperty('scroll-snap-type');
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUpOrLeave);

      // If active dragging occurred, block the next 'click' event to prevent trigger clicks
      if (hasMoved) {
        const preventClick = (clickEvent: MouseEvent | globalThis.MouseEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
        };

        // Capture and prevent the click event
        document.addEventListener('click', preventClick, { capture: true, once: true });

        // Backup safety cleanup if no click event fires (e.g., dragging off-screen)
        setTimeout(() => {
          document.removeEventListener('click', preventClick, { capture: true });
        }, 50);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUpOrLeave);
  };

  return {
    ref,
    onMouseDown,
    style: { cursor: 'grab', userSelect: 'none' as const }
  };
}
