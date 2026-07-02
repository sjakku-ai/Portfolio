---
name: add-blog-post
description: Convert a summary file into a new blog post on the portfolio site, matching the existing house style, and wire it into the blog index and homepage. Use when the user asks to add/publish a blog post from a summary, notes file, or draft.
---

# Add Blog Post

Turns a summary/notes file into a fully published post at `blog/public/blog/<slug>.html`, updates the post list that drives both `/blog` and the homepage, and cross-links it with the previous latest post.

## Ground rules (read this first)

- **Do not explore the whole repo.** Everything needed lives under `blog/`. Only touch these files:
  - `blog/app/blog/utils.ts` — the single source of truth for post metadata (title, slug, publishedAt, summary). The homepage and `/blog` redirect both read from this array. No database, no CMS.
  - `blog/public/blog/<slug>.html` — the actual rendered post (static HTML, not MDX — `app/blog/posts/*.mdx` exists but is dead/unreferenced, ignore it).
  - `blog/public/blog/<previous-latest-slug>.html` — only its `more-posts` section, to link forward to the new post.
- **Don't read every existing post.** Read `blog/app/blog/utils.ts` (short, gives you the ordered post list) and just the **single most recently published** post's HTML file as your style template. That's enough context — do not open the other seven-plus post files.
- The user will give you a path to a summary file (their notes / draft / bullet points on what the post should cover). Read *that* file fully — it's the input.

## Steps

1. **Read the input.** Read the summary file path the user gives you. If they don't give one, ask for it.
2. **Read `blog/app/blog/utils.ts`.** This tells you: the current most-recent post (sort by `publishedAt` desc) and the exact metadata shape to append to.
3. **Read the most-recent post's HTML** at `blog/public/blog/<that-slug>.html`. This is your style template for:
   - `<head>` block (title suffix ` — Sireesha Jakku`, meta description, theme toggle scripts, any page-specific `<style>` block for callouts/tables/figures — only include what the new post actually needs)
   - header nav (`home` / `blog` / `AI Engineer Roadmap`) and theme button — copy verbatim
   - article structure: `.eyebrow` (small caps category line), `.post-date`, `<h1>`, `.post-summary`, `<hr>`, then body sections as `<h2>` + `<p>`/`<ol>`/`<ul>` blocks separated by `<hr>`
   - optional `.callout` div for a pull-quote/key-point (use sparingly, only if the summary content calls for one)
   - optional `sources` section (`// references` with links) if the summary file lists sources
   - closing `more-posts` section (`// more posts`, 3 cards: title + formatted date, linking to the 3 most recent *other* posts) and the trailing `<script type="module" src="/blog/post.js"></script>`
4. **Draft the new post:**
   - `slug`: kebab-case, derived from the title, matching the casing style of recent slugs (e.g. `gpt-from-scratch-part-1`, `llm-building-blocks-glossary`) — lowercase with hyphens, no underscores (older posts used underscores; don't copy that, follow the recent convention).
   - `publishedAt`: today's date (`YYYY-MM-DD`) unless the user specifies otherwise.
   - Voice/tone: match the reference post — direct, first-person ("I"/"we"), plain-English explanations, em-dashes and curly quotes (`&mdash;`, `&rsquo;`, `&rdquo;`) exactly as HTML entities like the template, short paragraphs, `<h2>` section breaks separated by `<hr>`.
   - Write the full HTML file to `blog/public/blog/<slug>.html`.
5. **Update the previous latest post's `more-posts` section** in `blog/public/blog/<previous-slug>.html`: prepend a card linking to the new post, and drop the oldest of the existing three cards if there were already three.
6. **Update `blog/app/blog/utils.ts`:** add a new entry to the `posts` array (position doesn't matter functionally since it's sorted at render time, but add it near the top for readability) with `slug`, `title`, `publishedAt`, `summary` matching what you wrote into the HTML `<h1>`/`.post-summary`/meta description.
7. **Report back** with the new post's URL path (`/blog/<slug>.html`) and confirm the homepage `// writing` list and `/blog` redirect will now point to it (since both derive from `utils.ts`, no further wiring is needed).

## What "update the main page" means here

The homepage (`blog/app/page.tsx`) renders `<BlogPosts />`, which calls `getBlogPosts()` from `utils.ts` and sorts by `publishedAt`. So step 6 (updating `utils.ts`) *is* the main-page update — there's no separate homepage file to touch.
