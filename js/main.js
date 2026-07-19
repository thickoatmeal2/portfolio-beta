// ===========================================================
// Dark mode toggle
// ===========================================================
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "jb-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // Storage unavailable (e.g. private browsing, sandboxed preview) — theme
      // still works for the current page load, it just won't persist.
    }
  }

  // Theme is already set by the inline script in <head> to prevent a flash;
  // this just syncs the toggle button's state and wires up the click handler.
  if (toggle) {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(current === "dark"));

    toggle.addEventListener("click", () => {
      const now = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = now === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      toggle.setAttribute("aria-pressed", String(next === "dark"));
      storeTheme(next);
    });
  }
})();

// ===========================================================
// Footer year
// ===========================================================
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// ===========================================================
// Mobile nav toggle
// ===========================================================
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");
if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMobile.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===========================================================
// Hero cursor coordinate readout (signature element)
// ===========================================================
const heroCoords = document.getElementById("heroCoords");
if (heroCoords) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    document.addEventListener("mousemove", (e) => {
      const x = String(Math.round(e.clientX)).padStart(3, "0");
      const y = String(Math.round(e.clientY)).padStart(3, "0");
      heroCoords.textContent = `X: ${x} Y: ${y}`;
    });
  } else {
    heroCoords.textContent = "";
  }
}

// ===========================================================
// Journal list rendering (blog.html)
// ===========================================================
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

const journalList = document.getElementById("journalList");
if (journalList && typeof POSTS !== "undefined") {
  const journalEmpty = document.getElementById("journalEmpty");

  if (!POSTS.length) {
    if (journalEmpty) journalEmpty.hidden = false;
  } else {
    journalList.innerHTML = POSTS.map((post) => {
      const thumb = post.cover
        ? `<img class="journal-entry-thumb" src="${escapeHtml(
            post.cover
          )}" alt="" loading="lazy">`
        : "";
      return `
        <a class="journal-entry" href="post.html?slug=${encodeURIComponent(
          post.slug
        )}">
          <span class="journal-entry-date mono">${escapeHtml(post.date)}</span>
          <div class="journal-entry-main">
            <span class="journal-entry-tag mono">${escapeHtml(post.tag)}</span>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.excerpt)}</p>
          </div>
          ${thumb}
        </a>
      `;
    }).join("");
  }
}

// ===========================================================
// Single post rendering (post.html)
// ===========================================================
const postRoot = document.getElementById("postRoot");
if (postRoot && typeof POSTS !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const post = POSTS.find((p) => p.slug === slug);

  const postMeta = document.getElementById("postMeta");
  const postTitle = document.getElementById("postTitle");
  const postBody = document.getElementById("postBody");
  const postTitleTag = document.getElementById("postTitleTag");

  if (!post) {
    if (postMeta) postMeta.textContent = "Not found";
    if (postTitle) postTitle.textContent = "This entry doesn't exist.";
    if (postBody) {
      postBody.innerHTML =
        '<p><a href="blog.html">← Back to all entries</a></p>';
    }
  } else {
    if (postTitleTag) postTitleTag.textContent = `${post.title} — Journal`;
    if (postMeta) postMeta.textContent = `${post.date} — ${post.tag}`;
    if (postTitle) postTitle.textContent = post.title;
    if (postBody) {
      const imagePattern = /^!\[(.*?)\]\((.*?)\)$/;
      postBody.innerHTML = post.body
        .map((block) => {
          if (block.startsWith("## ")) {
            return `<h2>${escapeHtml(block.slice(3))}</h2>`;
          }
          const imageMatch = block.match(imagePattern);
          if (imageMatch) {
            const [, alt, src] = imageMatch;
            return `<figure class="post-image"><img src="${escapeHtml(
              src
            )}" alt="${escapeHtml(alt)}" loading="lazy"></figure>`;
          }
          return `<p>${escapeHtml(block)}</p>`;
        })
        .join("");
    }
  }
}
