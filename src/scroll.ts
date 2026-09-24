export function setupScroll(canvas: HTMLCanvasElement, nav: HTMLElement, hero: HTMLElement) {
  let target = 0;
  let current = 0;
  let frame = 0;
  const update = () => {
    const max = Math.max(1, hero.offsetHeight - window.innerHeight * 0.25);
    target = Math.min(1, Math.max(0, window.scrollY / max));
    nav.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.55);
  };
  const animate = () => {
    current += (target - current) * 0.075;
    canvas.style.opacity = String(1 - current * 0.82);
    canvas.style.transform = `scale(${1 + current * 0.055})`;
    frame = requestAnimationFrame(animate);
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
  animate();
  return () => { window.removeEventListener("scroll", update); cancelAnimationFrame(frame); };
}