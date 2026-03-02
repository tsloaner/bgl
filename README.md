# Boulder Gets Lit

The official website for the Boulder Gets Lit book club. Built with React, Vite, Tailwind CSS, Recharts, and Phosphor Icons.

## Tech Stack
- React + Vite
- Tailwind CSS v4
- React Router DOM
- Phosphor Icons
- Recharts

## Adding a New Book

To add a new book after a meeting, follow these steps:

1. Open `src/data/books.js`.
2. Find the `books` array.
3. Copy the object structure below, increment the `id` and `meetingNumber`, fill in the remaining fields, and add it to the `books` array.
4. Update the `nextMeeting` object with the info for the upcoming book.
5. `git push` — Netlify will automatically deploy the changes.

### New Book Template
```javascript
{
  id: 17,
  title: "Book Title",
  author: "Author Name",
  meetingNumber: 17,
  nickname: "Meeting Nickname",
  meetingDate: "YYYY-MM-DD",
  host: "Host Name",
  location: "Location",
  genre: "Genre",
  ratings: {
    sam: 0.0,
    furlong: 0.0,
    // Add member ratings here
  }
}
```

## Local Development
```bash
npm install
npm run dev
```
