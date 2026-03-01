Igloo — Inspired Clone

This is a simple static, original site inspired by https://www.igloo.inc/ for learning and prototyping purposes.

How to run

Open `index.html` in your browser (double-click or run a simple local server):

For Python 3.x:

```bash
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Features added

- Responsive navigation with a mobile toggle.
- Google `Inter` font included.
- Canvas-based hero with WebGL2 fallback to an animated gradient.
- Smooth scrolling and accessibility improvements (skip-link, keyboard Escape to close nav).

Notes

- This project is intentionally original and does not copy proprietary assets or text from the target site.
- The hero uses a canvas and falls back to a 2D animated gradient when WebGL2 isn't available.