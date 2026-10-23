FIRAT HAIR ARTIST — CINEMATIC LUXURY V2

OPEN
1. Extract the ZIP.
2. Open the folder in WebStorm.
3. Run index.html.

WHAT THIS VERSION ADDS
- Longer cinematic opening
- Full-screen hero video slot
- Advanced custom cursor
- Magnetic image movement
- Scroll-based hero zoom
- Horizontal editorial gallery
- Large masonry photo/video gallery
- Dedicated short-film gallery
- Fullscreen lightbox
- Interactive before-and-after comparison
- Infinite luxury text strip
- Responsive mobile experience
- Many media spaces ready for Firat's original files

MEDIA TO REQUEST
1. Hero video: 15–30 seconds, high quality, preferably 4K.
2. Firat portrait: one vertical professional portrait.
3. Micro Tape close-up: one sharp detail image.
4. Editorial photos: at least 6 high-quality final-result images.
5. Short videos: at least 6 clips, 5–12 seconds each.
6. Working photos: 2–3 images of Firat actually working.
7. Salon details: 2–4 clean photos.
8. Before/after sets: at least 3 pairs, same angle, distance and lighting.
9. Best full-width photo: one excellent landscape image.

FOLDER SETUP LATER
Create:
assets/images/
assets/videos/

Use original camera files, not screenshots or Instagram downloads.

HERO VIDEO REPLACEMENT
Replace:
<div class="hero-media media-placeholder" ...>

with:
<video class="hero-media" autoplay muted loop playsinline>
  <source src="assets/videos/hero.mp4" type="video/mp4">
</video>

PHOTO REPLACEMENT EXAMPLE
Replace:
<div class="portrait media-placeholder" ...></div>

with:
<img class="portrait real-media" src="assets/images/firat-portrait.jpg" alt="Firat Hair Artist">

Then add:
.real-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

IMPORTANT
The gallery currently opens a placeholder lightbox. Once the real media arrives, the JavaScript can be updated to open the exact photo or play the exact video.
