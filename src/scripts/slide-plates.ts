import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSlidePlates() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-slide-host]').forEach((host) => {
    const panes = [...host.querySelectorAll<HTMLElement>(':scope > [data-slide]')];
    if (!panes.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: host,
        start: 'top 82%',
        once: true,
      },
    });

    panes.forEach((pane, i) => {
      tl.from(
        pane,
        {
          xPercent: pane.dataset.slide === 'right' ? 100 : -100,
          duration: 1.15,
          ease: 'power3.out',
        },
        i === 0 ? 0 : 0.06,
      );
    });

    tl.add(() => {
      host.querySelectorAll('.is-scroll').forEach((el) => {
        el.classList.add('is-auto');
      });
    });
  });
}
