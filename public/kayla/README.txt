Photos of Kayla
===============

Any image you place in THIS folder automatically appears in the photo gallery
on the Memorial page (/memorial). No code changes needed — just add files and
redeploy.

  - Supported types: .jpg .jpeg .png .webp .avif .gif
  - Photos show in alphabetical order by filename. To control the order,
    prefix names with numbers, e.g.:
        01-portrait.jpg
        02-with-friends.jpg
        03-family.jpg

Special files (keep these exact names):
  kayla-portrait.jpg      — Story-page portrait + social share (Open Graph)
                            image, and the first gallery tile.
  buckle-up-poster.jpg    — the "Seat Belts Save Lives" campaign poster.
                            When present, it's featured on the /buckle-up page
                            (shown in full, not in the gallery grid).

Event photos (Memorial page → "Recent Events" tab):
  Put an event's photos in a subfolder named after that event's slug:
      public/kayla/events/carwash-2008/
      public/kayla/events/scholarships-2008/
      public/kayla/events/memorial-plaque-2008/
      public/kayla/events/foundation-launch-2007/
  (The slugs are defined in lib/events.ts — edit that file to add events or
  change text/dates.)

Tip: web-friendly photos are ~1200px on the long edge and under ~500 KB each.
