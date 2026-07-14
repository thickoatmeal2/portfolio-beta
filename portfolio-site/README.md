# Jacob Baldwin — Portfolio & Journal

A minimal, static portfolio + blog site. No build step, no framework —
just HTML, CSS, and vanilla JS, so it's easy to edit and cheap/free to host.

## File map

```
index.html        Home page (hero, work, about, resume, contact)
blog.html          Journal list page
post.html          Single journal entry page (reads ?slug=... from the URL)
css/styles.css     All styling (colors/fonts are defined as CSS variables at the top)
js/posts.js        <-- Your blog/journal content lives here
js/main.js         Nav toggle, hero cursor readout, blog rendering logic
resume.pdf         Optional — add later, see "Resume" instructions below
```

## Things to replace with your real content

- **`index.html`**
  - Hero lede paragraph
  - Work cards under `#work` are currently empty (dashed outline boxes) since
    there's no project content yet. When you have a project ready, replace one
    `<article class="work-card work-card-empty"></article>` with a filled-in
    card like this:

    ```html
    <article class="work-card">
      <div class="work-card-top">
        <span class="tag mono">Product Design</span>
      </div>
      <h3>Project Title</h3>
      <p>One or two sentences on the problem, your role, and the outcome.</p>
      <a href="#" class="work-link">View project →</a>
    </article>
    ```
  - About section bio (two paragraphs) and focus-area list
  - Resume section is currently three empty dashed rows (no fake job history).
    When ready, replace a `<div class="resume-item-empty"></div>` with:

    ```html
    <div class="resume-item">
      <div class="resume-item-head">
        <h3>Job Title, Company Name</h3>
        <span class="mono resume-date">2023 — Present</span>
      </div>
      <p>One or two lines on scope and impact in this role.</p>
    </div>
    ```

  - To add a downloadable PDF later: drop `resume.pdf` in the project root,
    then add this button back below the `.resume-list` in `index.html`:

    ```html
    <a href="resume.pdf" class="btn btn-ghost resume-download">Download Résumé (PDF) ↓</a>
    ```
- **Contact email and social links** (currently placeholders: `#`)

## Adding a new journal/blog entry

Open `js/posts.js` and copy one of the existing objects to the **top** of
the `POSTS` array (newest first), then edit the fields:

```js
{
  slug: "my-new-post",              // unique, URL-safe
  date: "August 1, 2026",
  tag: "Design",                    // short label, e.g. Design / AI / Journal / Photo
  title: "My New Post Title",
  excerpt: "One or two sentence teaser shown in the list view.",
  cover: "images/my-photo.jpg",      // optional thumbnail in the list view — leave "" for text-only posts
  body: [
    "First paragraph.",
    "## An optional subheading",
    "![Alt text describing the photo](images/my-photo.jpg)",
    "Another paragraph after the photo.",
  ],
},
```

That's it — no rebuild step. The list page and the individual post page
both read from this same file automatically.

### Adding photos

1. Put your image files in the `images/` folder (already created for you).
2. Reference them by path, e.g. `images/beach-trip.jpg`.
3. Use `cover` on a post object to show a small thumbnail next to it in the
   journal list.
4. Use an image line inside `body` — `![alt text](images/beach-trip.jpg)` —
   to show it full-width inside the post itself. You can mix as many text
   paragraphs and images in `body` as you like, in any order.

## Design tokens (css/styles.css, top of file)

```css
--ink: #0e0e10;         /* primary text */
--paper: #ffffff;       /* background */
--mist: #8a8a8e;        /* secondary text */
--hairline: #e6e6e9;    /* dividers/borders */
--signal: #3d5afe;      /* accent color */
--signal-tint: #edf0ff; /* accent background tint */
```

Change `--signal` to swap the accent color site-wide.

## Running it locally

Just open `index.html` in a browser — no server required. If you want a
local server (useful for some browsers' handling of relative paths):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

Any static host works. Two easy, free options:

- **Netlify / Vercel**: drag-and-drop the whole folder onto their web
  dashboard, or connect a GitHub repo for auto-deploys.
- **GitHub Pages**: push this folder to a GitHub repo, then enable Pages
  in the repo settings (Settings → Pages → deploy from branch).

## Notes

- Fully responsive down to mobile; includes a mobile nav menu.
- Respects `prefers-reduced-motion` (disables the hero cursor readout).
- Keyboard focus states are visible throughout for accessibility.
