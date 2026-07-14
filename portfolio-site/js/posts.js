/**
 * JOURNAL ENTRIES
 * ----------------
 * Add a new post by copying an object below and editing it.
 * - slug: unique, URL-safe id (used in the link, e.g. post.html?slug=my-slug)
 * - date: shown on the list and post pages (any readable string, e.g. "July 12, 2026")
 * - tag: short mono label, e.g. "Design", "AI", "Journal", "Photo"
 * - title: post title
 * - excerpt: 1-2 sentence teaser shown in the list view
 * - cover: (optional) path to an image shown as a thumbnail in the list view,
 *          e.g. "images/my-photo.jpg". Omit or leave "" for text-only posts.
 * - body: array of strings. Each string becomes one block:
 *         - starts with "## "                -> a subheading
 *         - starts with "![alt text](path)"  -> a full-width image
 *         - anything else                    -> a paragraph
 *
 * Newest posts should go at the TOP of the array.
 *
 * To use photos: put image files in the images/ folder, then reference
 * them as "images/your-file.jpg" in a cover field or an image body line.
 */

const POSTS = [
  {
    slug: "welcome-to-the-journal",
    date: "July 13, 2026",
    tag: "Journal",
    title: "Starting this journal",
    excerpt:
      "A quick note on why this space exists and what I plan to use it for.",
    cover: "",
    body: [
      "This is a placeholder first entry. Replace it with a real post, or delete it once you've published something of your own.",
      "The idea for this journal is to keep a mix of design write-ups, notes on things I'm building with AI, shorter personal entries, and photos — not everything needs to be a polished case study.",
      "## What to expect",
      "Expect posts on interface design decisions, lessons from building AI-powered tools, the occasional photo, and unstructured thoughts. New entries appear at the top of the list.",
      "## Adding a photo",
      "Example of an inline image (remove this line and the one below if you don't need it):",
      "![Example placeholder image](images/example.jpg)",
    ],
  },
  {
    slug: "example-design-note",
    date: "July 1, 2026",
    tag: "Design",
    title: "Example: a note on a design decision",
    excerpt:
      "Placeholder entry showing how a design-focused write-up might look in this format.",
    cover: "",
    body: [
      "This is an example entry to show the intended tone for design write-ups — a specific decision, why you made it, and what you'd do differently.",
      "Replace this with a real post any time, or use it as a template: describe the problem, the constraint that made it hard, and the choice you made.",
    ],
  },
];

// Sort defensively by array order (top = newest); exposed for main.js
if (typeof module !== "undefined") {
  module.exports = POSTS;
}
