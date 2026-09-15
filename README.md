# andeliero.github.io

My CV, served at [andeliero.github.io](https://andeliero.github.io/).

One page, hand written, no framework and no build step. Screen, print and machine
readers all render from the same `index.html`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All content, plus the schema.org JSON-LD block that ATS and crawlers read |
| `style.css` | Design tokens, layout, dark mode, and the A4 print sheet |
| `photo.avif` / `photo.webp` / `photo.jpg` | Portrait, served best format first |
| `scripts/build-pdf.mjs` | Renders `index.html` to `cv.pdf` through the print stylesheet |
| `.github/workflows/cv-pdf.yml` | Rebuilds and commits `cv.pdf` on every push that touches the CV |

## Updating

Edit `index.html`. That is the whole workflow. Pushing to `master` publishes the
page and regenerates `cv.pdf` automatically.

Anything still highlighted in yellow is marked `class="todo"` and needs real
content. Those placeholders stay visible in print on purpose, so a half finished
CV cannot be exported as a PDF by accident. Delete the `todo` class once the text
is real.

## Checking the print layout

`Cmd+P` in the browser, or locally:

```sh
npm install --no-save puppeteer
node scripts/build-pdf.mjs
```

## Replacing the portrait

```sh
avifenc -q 62 --speed 0 photo.jpg photo.avif
cwebp -q 78 photo.jpg -o photo.webp
```
