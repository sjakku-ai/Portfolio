const btn = document.getElementById('themeBtn');
if (!document.body.classList.contains('light')) btn.textContent = '☀ LIGHT';

window.toggleTheme = function () {
  const isLight = document.body.classList.contains('light');
  document.body.classList.toggle('light', !isLight);
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
  btn.textContent = isLight ? '☀ LIGHT' : '☀ DARK';
  renderDiagrams();
};

let mermaidMod;
async function renderDiagrams() {
  const isDark = !document.body.classList.contains('light');
  if (!mermaidMod) {
    mermaidMod = (await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')).default;
  }
  mermaidMod.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'neutral',
    fontFamily: 'Geist, sans-serif',
    fontSize: 14,
  });
  document.querySelectorAll('.diagram').forEach(async (el, i) => {
    const src = el.querySelector('script[type="text/mermaid"]')?.textContent?.trim();
    if (!src) return;
    const out = el.querySelector('.diagram-svg');
    if (!out) return;
    try {
      const id = 'mg' + i + '_' + Math.random().toString(36).slice(2, 8);
      const { svg } = await mermaidMod.render(id, src);
      out.innerHTML = svg;
      const s = out.querySelector('svg');
      if (s) { s.style.width = '100%'; s.style.height = 'auto'; }
    } catch (e) {
      out.style.cssText = 'text-align:left;font-family:monospace;font-size:12px;color:var(--muted);white-space:pre-wrap';
      out.textContent = src;
    }
  });
}
renderDiagrams();
