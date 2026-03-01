(function(){
  const canvas = document.getElementById('hero-canvas');
  const warning = document.getElementById('webgl-warning');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  function resize(){
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
  }

  // Try WebGL2 first
  let gl = null;
  try { gl = canvas.getContext('webgl2'); } catch(e) { gl = null; }

  if(!gl){
    // Fallback to 2D animated gradient
    warning.hidden = false;
    const ctx = canvas.getContext('2d');
    function drawGradient(t){
      const w = canvas.width, h = canvas.height;
      const g = ctx.createLinearGradient(0,0,w, h);
      const c1 = Math.floor((Math.sin(t*0.0007)+1)/2*255);
      const c2 = Math.floor((Math.cos(t*0.0005)+1)/2*255);
      g.addColorStop(0, `rgb(${c1},${150},${200})`);
      g.addColorStop(1, `rgb(${60},${c2},${180})`);
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);
    }
    function loop(t){ drawGradient(t); requestAnimationFrame(loop); }
    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(loop);
  } else {
    // Minimal WebGL2 demo: clear with animated color
    let start = performance.now();
    function resizeGL(){
      canvas.width = canvas.clientWidth * (window.devicePixelRatio||1);
      canvas.height = canvas.clientHeight * (window.devicePixelRatio||1);
      gl.viewport(0,0,canvas.width,canvas.height);
    }
    function loop(t){
      const dt = (t - start) * 0.001;
      const r = (Math.sin(dt*0.6)*0.5)+0.5;
      const gcol = (Math.cos(dt*0.7)*0.5)+0.5;
      const b = (Math.sin(dt*0.9)*0.5)+0.5;
      gl.clearColor(r*0.12, gcol*0.18, b*0.25, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      requestAnimationFrame(loop);
    }
    window.addEventListener('resize', resizeGL);
    resizeGL();
    requestAnimationFrame(loop);
  }

  // Navigation toggle & accessibility
  function initNav(){
    if(!navToggle || !navLinks) return;
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    }));
    // Close on Escape
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); } });
  }
  document.addEventListener('DOMContentLoaded', initNav);
})();
