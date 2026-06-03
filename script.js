// year
document.getElementById('year').textContent = new Date().getFullYear();

// nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// mobile menu
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links.classList.toggle('open');
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
  })
);

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// animate delivery bars when section enters view
const delivery = document.getElementById('delivery');
if (delivery) {
  const bars = delivery.querySelectorAll('.zone-bar i');
  const widths = Array.from(bars).map(b => b.style.width);
  bars.forEach(b => (b.style.width = '0'));
  const dio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach((b, i) => setTimeout(() => (b.style.width = widths[i]), 200 + i * 150));
        dio.disconnect();
      }
    });
  }, { threshold: 0.3 });
  dio.observe(delivery);
}
