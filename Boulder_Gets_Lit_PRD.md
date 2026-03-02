# PRD: Boulder Gets Lit — Interactive Book Club Website

**Version:** 1.2
**Author:** Thomas Sloan
**Status:** Ready for Development
**Deployment Target:** Netlify or Vercel (free tier)

---

## 1. Project Overview

**Boulder Gets Lit** is a playful, personality-forward interactive website for a 12-person Boulder, CO book club. The site serves as a living archive of every book the club has read — 16 books across 2024–2025 — with member ratings, attendance data, and rich stats dashboards. It should feel like the club itself: fun, bold, a little irreverent, deeply human.

This is a **lightweight frontend-only project**. No backend required. All data lives in a single `src/data/books.js` file that can be updated manually when a new book is added.

---

## 2. Design Direction

### Aesthetic
**Clean, Warm, and Intuitive.** Prioritize clarity and ease of use above all. The site should feel like it was thoughtfully designed — not templated — but never at the expense of usability. Think warm tones, generous whitespace, and typography that has personality without being distracting. Playfulness should come through in the details (copy, small accents, data callouts), not in loud layouts or jarring color choices. Avoid anything that feels corporate or sterile, but equally avoid anything chaotic or hard to navigate.

### Skills to Apply
The coding agent **must** read and apply the following skill files before writing any code:
- `/Users/thomassloan/.claude/skills/frontend-taste`
- `/Users/thomassloan/.claude/skills/ux-ui-pro-max`
- `/Users/thomassloan/.claude/skills/react-best-practices`

Additionally, apply the `frontend-design` skill at `/mnt/skills/public/frontend-design/SKILL.md`. From this skill, prioritize:
- Intentional aesthetic direction — not generic AI aesthetics
- Distinctive but readable typography (no Inter, Roboto, Arial, or Space Grotesk)
- Subtle, purposeful motion (micro-interactions on hover, smooth transitions — not flashy animations)
- Clean spatial composition with consistent spacing
- Depth through shadow and subtle texture, not loud color

### Suggested Palette Direction
Warm and grounded. Think: deep forest green or slate blue as a primary, warm cream or off-white backgrounds, with a single accent color (burnt orange, mustard, or coral) used sparingly for highlights and ratings. Avoid bright neons or high-contrast color clashes. The palette should feel cohesive and calm — like a well-designed independent bookstore, not a festival poster.

### Typography
Pair a bold, characterful display font (for headings, book titles, club name) with a warm, readable body font. Consider something with a handmade or editorial feel. Source from Google Fonts.

---

## 3. Tech Stack

| Layer | Choice |
|---|---|
| Framework | React (single-page app) |
| Styling | Tailwind CSS + custom CSS variables |
| Charts | Recharts |
| Deployment | Netlify or Vercel |
| Data | Single `src/data/books.js` file |
| Book Covers | Google Books API (runtime fetch by title+author) |
| Build Tool | Vite |

> **Keep it lightweight.** No database, no CMS, no auth. If it can be solved with a data file and a component, do that.

---

## 4. Complete Club Data

Populate `src/data/books.js` with exactly this data:

```javascript
// src/data/books.js
// To add a new book: copy the object structure below, fill in the fields, and push to git.

export const clubData = {
  clubName: "Boulder Gets Lit",

  // Active members
  members: [
    { id: "sam",      name: "Sam",      avatar: "🌵", favBook: "Lonesome Dove",                        timesHosted: 2 },
    { id: "furlong",  name: "Furlong",  avatar: "🧙", favBook: "HP and the Goblet of Fire",            timesHosted: 2 },
    { id: "annie",    name: "Annie",    avatar: "✨", favBook: "A Wrinkle in Time",                    timesHosted: 2 },
    { id: "nick",     name: "Nick",     avatar: "🏔️", favBook: "The Prince of Tides",                 timesHosted: 2 },
    { id: "judge",    name: "Judge",    avatar: "⚖️", favBook: "The Pillars of the Earth",            timesHosted: 2 },
    { id: "thomas",   name: "Thomas",   avatar: "🐉", favBook: "The Hobbit",                           timesHosted: 2 },
    { id: "adrienne", name: "Adrienne", avatar: "🌙", favBook: "The Moon and Sixpence",                timesHosted: 1 },
    { id: "casey",    name: "Casey",    avatar: "🌊", favBook: "Letting Go",                           timesHosted: 1 },
    { id: "matt",     name: "Matt",     avatar: "🐻", favBook: "Hugh Glass, Mountain Man",             timesHosted: 1 },
    { id: "shay",     name: "Shay",     avatar: "🌶️", favBook: "The Hot Zone",                       timesHosted: 1 },
    { id: "hannah",   name: "Hannah",   avatar: "🎭", favBook: "The Song of Achilles",                 timesHosted: 0 },
    { id: "freddie",  name: "Freddie",  avatar: "🎸", favBook: "Lonesome Dove",                        timesHosted: 1 },
    { id: "jake",     name: "Jake",     avatar: "🚀", favBook: "The Hitchhiker's Guide to the Galaxy", timesHosted: 1 },
  ],

  // Alumni members (no longer active but have ratings on record)
  alumni: [
    { id: "laney",  name: "Laney",  avatar: "📚", favBook: "To Kill a Mockingbird",  timesHosted: 1 },
  ],

  books: [
    {
      id: 1,
      title: "Cannery Row",
      author: "John Steinbeck",
      meetingNumber: 1,
      nickname: "Origin Story",
      meetingDate: "2024-02-27",
      host: "Sam",
      location: "Sam's",
      genre: "Literary Fiction",
      ratings: {
        sam: 7.0, furlong: 5.0, annie: 6.5, nick: 4.0,
        judge: 6.0, thomas: 6.0, adrienne: 7.5, laney: 5.0
      }
    },
    {
      id: 2,
      title: "Demon Copperhead",
      author: "Barbara Kingsolver",
      meetingNumber: 2,
      nickname: "People Were Saying",
      meetingDate: "2024-04-09",
      host: "Judge",
      location: "Judge's",
      genre: "Literary Fiction",
      ratings: {
        sam: 7.5, furlong: 7.5, annie: 9.0, nick: 8.5,
        judge: 7.0, thomas: 8.0, adrienne: 8.0, casey: 8.5,
        laney: 8.0
      }
    },
    {
      id: 3,
      title: "Endure",
      author: "Alex Hutchinson",
      meetingNumber: 3,
      nickname: "We Endured",
      meetingDate: "2024-05-21",
      host: "Thomas",
      location: "Thomas's",
      genre: "Nonfiction",
      ratings: {
        sam: 4.0, furlong: 3.0, annie: 3.5, nick: 3.0,
        thomas: 6.5, adrienne: 3.5, casey: 4.0, matt: 4.0,
        shay: 3.0
      }
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      meetingNumber: 4,
      nickname: "Smorgasbord",
      meetingDate: "2024-06-18",
      host: "Adrienne & Casey",
      location: "NB Park",
      genre: "Speculative Fiction",
      ratings: {
        sam: 3.0, furlong: 4.0, annie: 5.0, nick: 3.0,
        judge: 3.0, thomas: 6.0, adrienne: 1.5, casey: 7.5,
        matt: 4.5, shay: 6.0, laney: 5.0
      }
    },
    {
      id: 5,
      title: "Euphoria",
      author: "Lily King",
      meetingNumber: 5,
      nickname: "Coulda Been GG",
      meetingDate: "2024-08-20",
      host: "Furlong & Annie",
      location: "Chautauqua",
      genre: "Literary Fiction",
      ratings: {
        sam: 6.0, furlong: 7.0, annie: 8.0, nick: 5.0,
        judge: 5.0, thomas: 4.0, adrienne: 6.0, casey: 6.0,
        matt: 5.5, hannah: 7.5
      }
    },
    {
      id: 6,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      meetingNumber: 6,
      nickname: "Hands",
      meetingDate: "2024-10-01",
      host: "Nick",
      location: "NB Park",
      genre: "Historical Fiction",
      ratings: {
        sam: 7.0, furlong: 7.5, annie: 8.0, nick: 8.0,
        judge: 8.0, thomas: 7.5, adrienne: 8.5, casey: 8.0,
        matt: 8.0, shay: 8.0, hannah: 10.0, laney: 9.0
      }
    },
    {
      id: 7,
      title: "Piranesi",
      author: "Susanna Clarke",
      meetingNumber: 7,
      nickname: "Cozy Vestibule",
      meetingDate: "2024-11-06",
      host: "Matt & Shay",
      location: "Matt's & Shay's",
      genre: "Fantasy",
      ratings: {
        sam: 7.0, furlong: 7.0, annie: 5.0, nick: 7.0,
        judge: 8.5, thomas: 8.5, adrienne: 5.5, casey: 8.0,
        matt: 9.0, shay: 6.0, hannah: 6.0, laney: 7.5
      }
    },
    {
      id: 8,
      title: "Homegoing",
      author: "Yaa Gyasi",
      meetingNumber: 8,
      nickname: "Trama",
      meetingDate: "2024-12-04",
      host: "Laney",
      location: "Laney's",
      genre: "Historical Fiction",
      ratings: {
        sam: 6.5, furlong: 7.0, annie: 7.0, judge: 4.0,
        adrienne: 7.0, casey: 7.0, matt: 4.0, freddie: 7.5,
        jake: 7.5, laney: 6.5
      }
    },
    {
      id: 9,
      title: "The Mountain in the Sea",
      author: "Ray Nayler",
      meetingNumber: 9,
      nickname: "Ability to Forget",
      meetingDate: "2025-02-11",
      host: "Sam",
      location: "Sam's",
      genre: "Sci-Fi",
      ratings: {
        sam: 6.5, nick: 7.0, thomas: 4.0, adrienne: 7.0,
        casey: 6.0, matt: 7.0, hannah: 6.0, freddie: 7.0,
        jake: 6.0
      }
    },
    {
      id: 10,
      title: "True Grit",
      author: "Charles Portis",
      meetingNumber: 10,
      nickname: "Snake Pit",
      meetingDate: "2025-03-25",
      host: "Freddie",
      location: "Highliners' House",
      genre: "Western",
      ratings: {
        sam: 8.0, furlong: 7.5, annie: 7.0, nick: 8.5,
        judge: 7.5, thomas: 7.5, adrienne: 7.5, matt: 8.0,
        hannah: 8.0, freddie: 9.0, jake: 8.0
      }
    },
    {
      id: 11,
      title: "Recursion",
      author: "Blake Crouch",
      meetingNumber: 11,
      nickname: "Nelson Mandela Died in Prison",
      meetingDate: "2025-04-30",
      host: "Thomas",
      location: "Thomas's",
      genre: "Sci-Fi",
      ratings: {
        sam: 6.5, furlong: 8.0, annie: 8.0, nick: 5.5,
        judge: 5.0, thomas: 6.5, adrienne: 7.0, casey: 7.0,
        matt: 6.0, hannah: 8.5, jake: 7.5
      }
    },
    {
      id: 12,
      title: "The Eye of the Needle",
      author: "Ken Follett",
      meetingNumber: 12,
      nickname: "Love Island",
      meetingDate: "2025-06-10",
      host: "Judge",
      location: "Parkside Park",
      genre: "Thriller",
      ratings: {
        sam: 7.5, furlong: 8.0, nick: 8.5, judge: 8.0,
        thomas: 7.5, adrienne: 7.5, casey: 7.5, matt: 8.5,
        shay: 8.0, hannah: 8.5, jake: 7.5
      }
    },
    {
      id: 13,
      title: "South of Broad",
      author: "Pat Conroy",
      meetingNumber: 13,
      nickname: "South of Baseline",
      meetingDate: "2025-07-15",
      host: "Nick",
      location: "Chautauqua",
      genre: "Literary Fiction",
      ratings: {
        sam: 6.5, furlong: 5.5, annie: 7.0, nick: 9.5,
        judge: 7.0, thomas: 6.5, adrienne: 8.5, casey: 7.5,
        matt: 6.5
      }
    },
    {
      id: 14,
      title: "Gone Girl",
      author: "Gillian Flynn",
      meetingNumber: 14,
      nickname: "iykyk",
      meetingDate: "2025-09-03",
      host: "Furlong & Annie",
      location: "NB Park",
      genre: "Thriller",
      ratings: {
        sam: 6.5, furlong: 9.0, annie: 8.5, judge: 6.0,
        thomas: 6.0, adrienne: 7.0, casey: 8.0, matt: 8.0,
        shay: 8.0, hannah: 8.0, jake: 7.5
      }
    },
    {
      id: 15,
      title: "Slaughterhouse-Five",
      author: "Kurt Vonnegut",
      meetingNumber: 15,
      nickname: "So it Goes",
      meetingDate: "2025-10-07",
      host: "Jake",
      location: "Jake's place",
      genre: "Literary Fiction",
      ratings: {
        sam: 7.5, furlong: 6.0, annie: 7.0, nick: 6.5,
        thomas: 6.5, casey: 6.5, matt: 6.5, hannah: 5.5,
        jake: 8.0
      }
    },
    {
      id: 16,
      title: "Sharp Objects",
      author: "Gillian Flynn",
      meetingNumber: 16,
      nickname: "Blunt Ratings",
      meetingDate: "2025-11-18",
      host: "Hannah & Casey",
      location: "Casey's Place",
      genre: "Thriller",
      ratings: {
        furlong: 7.0, annie: 9.0, nick: 7.0, judge: 5.0,
        thomas: 4.5, adrienne: 6.5, casey: 7.5, matt: 6.5,
        shay: 9.0, hannah: 8.5, freddie: 7.5
      }
    }
  ]
};

// Helper: compute average rating for a book
export const getAvgRating = (book) => {
  const vals = Object.values(book.ratings).filter(v => typeof v === "number");
  if (!vals.length) return null;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100;
};

// Helper: compute std deviation (for "most divisive" stat)
export const getStdDev = (book) => {
  const vals = Object.values(book.ratings).filter(v => typeof v === "number");
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  const variance = vals.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / vals.length;
  return Math.round(Math.sqrt(variance) * 100) / 100;
};

// Helper: get all-time average rating GIVEN by a member
export const getMemberAvgGiven = (memberId, books) => {
  const ratings = books.flatMap(b => b.ratings[memberId] != null ? [b.ratings[memberId]] : []);
  if (!ratings.length) return null;
  return Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 100) / 100;
};
```

---

## 5. Site Architecture

Single-page app with React Router. Four main sections:

1. **Home** — Hero + quick stats + next meeting + recent reads
2. **Books** — Full library with filters
3. **Stats** — Dashboard
4. **Members** — Member profiles

---

## 6. Page Specifications

### 6.1 — Home Page

- **Hero:** Large "Boulder Gets Lit 🔥" with playful tagline ("16 books. 13 readers. Zero consensus.")
- **Quick Stats Bar** (computed from data):
  - Total books read: **16**
  - All-time club average rating: **~6.8 / 10**
  - Top genre: **Literary Fiction** (5 books)
  - Most divisive book: computed dynamically (highest std dev across member ratings)
- **Next Meeting Card**
  - Prominently displayed on the Home page, below the stats bar
  - Shows: upcoming book cover (fetched from Google Books API), book title, author, and meeting date
  - Live countdown timer (days remaining until the meeting)
  - Current next meeting: *"11/22/63"* by Stephen King, **March 10, 2026**
  - Stored in `src/data/books.js` as a `nextMeeting` object (easy to update):
    ```javascript
    nextMeeting: {
      title: "11/22/63",
      author: "Stephen King",
      meetingDate: "2026-03-10"
    }
    ```
  - When the meeting date passes, this section should gracefully hide or show "See you next month!" until updated

- **Recent Reads Strip:** Last 4 books as horizontal scroll cards with cover + avg rating
- **"Harshest Critic" Callout:** Playful card computed dynamically from `getMemberAvgGiven`

### 6.2 — Books Page

**Filter/Sort Bar:**
- Filter by: Genre, Year (2024 / 2025), Rating range
- Sort by: Date, Average Rating, Title A–Z
- Search: title or author

**Book Grid:** Card per book showing cover image, title, author, avg rating badge, meeting date, genre tag, rater count.

**Book Detail (Modal):**
- Hero: cover + title + author + meeting nickname (e.g., *"Cozy Vestibule"*)
- Large avg rating display
- Host + location + date
- Rating section: avg by default → toggle to show all individual member ratings as a horizontal bar chart
- Callouts: highest rater, lowest rater, rater count
- Auto-generated "vibe descriptor":
  - avg ≥ 8.0 → "Universally Adored 🔥"
  - avg ≥ 7.0 → "Solid Read 👍"
  - avg ≥ 6.0 → "Mixed Bag 🤷"
  - avg < 6.0 → "We Endured It 💀"

### 6.3 — Stats Dashboard

All charts use Recharts. Give each chart a fun, personality-driven title.

**Chart 1: "The Critic Spectrum"** — Horizontal bar chart of each member's all-time average rating given (lowest to highest). Label extremes: "Harsh ←" and "→ Easy". Computed dynamically from data.

**Chart 2: "The Verdict"** — Top 5 and bottom 5 books by avg rating. Color the bars green (loved) vs red/orange (least loved). Known extremes from data:
- Highest: Song of Achilles (8.12), Demon Copperhead (8.05), True Grit (7.86)
- Lowest: Endure (3.85), Midnight Library (4.38), Cannery Row (5.88)

**Chart 3: "What We're Into"** — Donut chart by genre:
- Literary Fiction: 5 books (Cannery Row, Demon Copperhead, Euphoria, South of Broad, Slaughterhouse-Five)
- Thriller: 3 books (Eye of the Needle, Gone Girl, Sharp Objects)
- Historical Fiction: 2 books (Song of Achilles, Homegoing)
- Sci-Fi: 2 books (Mountain in the Sea, Recursion)
- Fantasy: 1 book (Piranesi)
- Western: 1 book (True Grit)
- Nonfiction: 1 book (Endure)
- Speculative Fiction: 1 book (Midnight Library)

**Chart 4 (Bonus): "The Bell Curve"** — Histogram of all individual ratings ever given across all books and members.

**Stat Cards at top of dashboard:**
- 📚 16 books read
- ⭐ ~6.8 avg club rating
- 🔥 Spiciest take: Nick gave *South of Broad* a 9.5 (highest single rating)
- 💀 Toughest crowd: computed from member avg given

### 6.4 — Members Page

**Member Grid** (13 active members shown; alumni noted separately):

Each card: name, emoji avatar, books rated count, avg rating given, fav book outside club.

**Fun Badges** (computed from data):
- 🎯 "Most Generous" — highest avg rating given
- 🔪 "Toughest Critic" — lowest avg rating given
- 🌶️ "Most Opinionated" — highest variance in ratings given
- 📅 "Most Consistent" — lowest variance
- 🏠 "Super Host" — hosted 2+ times (Sam, Furlong, Annie, Nick, Judge, Thomas)
- 🔥 "Perfect 10" — Hannah gave Song of Achilles a 10

**Member Profile (modal on click):**
- Every book they rated + their score + club avg for that book
- Mini bar chart: their rating vs club average per book
- Most contrarian rating (furthest from club avg)
- Their personal high and low rated books
- Books rated count / total books while active

---

## 7. Book Cover Images

```javascript
// Primary: Google Books API (no key required for low volume)
const fetchCover = async (title, author) => {
  const q = encodeURIComponent(`${title} ${author}`);
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`);
  const data = await res.json();
  const thumb = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
  // zoom=2 gives higher-res thumbnails
  return thumb ? thumb.replace('http:', 'https:').replace('zoom=1', 'zoom=2') : null;
};

// Fallback: styled placeholder card with book title on a colored background
```

- Cache all cover URLs in React context/state on app load
- Show skeleton card while loading
- Never break layout if a cover fails to load

---

## 8. Updateability

To add a new book after a meeting:
1. Open `src/data/books.js`
2. Copy an existing book object, increment `id` and `meetingNumber`
3. Fill in title, author, date, host, location, genre, and ratings
4. `git push` — Netlify/Vercel auto-deploys

The README must include this exact workflow with a copy-paste template.

---

## 9. Responsiveness

- Mobile-first
- Book grid: 3-col desktop → 2-col tablet → 1-col mobile
- Charts: 2-col desktop → 1-col mobile
- All modals: full-screen drawer on mobile

---

## 10. Deployment

Vite + React project. Include:

```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 11. Micro-copy & Tone

The site's voice is warm, funny, and a little nerdy. Playful roasting of books (never members) is welcome. Never mean-spirited.

- Empty filter state: *"No books survived your filters. Maybe lower the bar?"*
- Loading covers: *"Fetching literary opinions..."*
- Lowest-rated book (*Endure*, avg 3.85): *"The one we don't talk about."*
- Highest-rated book (*Song of Achilles*, avg 8.12): *"This one hit different."*
- Member with few ratings: *"Still earning their place at the table."*
- Next meeting countdown: *"Days until we have opinions about 11/22/63"*

---

## 12. Out of Scope (v1)

- Auth / login
- CMS or admin panel
- Automatic spreadsheet sync
- Any server-side code or database

---

## 13. Deliverables Checklist

- [ ] `src/data/books.js` — pre-populated with all 16 books above
- [ ] `src/components/` — all reusable components
- [ ] `src/pages/` — Home, Books, Stats, Members
- [ ] Book cover fetching via Google Books API with styled fallback
- [ ] All 3 required charts + bonus histogram
- [ ] Member profiles with rating history and mini bar chart
- [ ] Responsive across all breakpoints
- [ ] `README.md` with setup + add-a-book instructions
- [ ] `netlify.toml` for deployment

---

*PRD v1.2 — Boulder Gets Lit | Data current as of Meeting #16 (Sharp Objects, Nov 2025)*
