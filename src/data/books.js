// src/data/books.js
// To add a new book: copy the object structure below, fill in the fields, and push to git.

export const clubData = {
    clubName: "Boulder Gets Lit",

    // Active members
    members: [
        { id: "sam", name: "Sam", avatar: "🌵", favBook: "Lonesome Dove", timesHosted: 2 },
        { id: "furlong", name: "Furlong", avatar: "🧙", favBook: "HP and the Goblet of Fire", timesHosted: 2 },
        { id: "annie", name: "Annie", avatar: "✨", favBook: "A Wrinkle in Time", timesHosted: 2 },
        { id: "nick", name: "Nick", avatar: "🏔️", favBook: "The Prince of Tides", timesHosted: 2 },
        { id: "judge", name: "Judge", avatar: "⚖️", favBook: "The Pillars of the Earth", timesHosted: 2 },
        { id: "thomas", name: "Thomas", avatar: "🐉", favBook: "The Hobbit", timesHosted: 2 },
        { id: "adrienne", name: "Adrienne", avatar: "🌙", favBook: "The Moon and Sixpence", timesHosted: 1 },
        { id: "casey", name: "Casey", avatar: "🌊", favBook: "Letting Go", timesHosted: 1 },
        { id: "matt", name: "Matt", avatar: "🐻", favBook: "Hugh Glass, Mountain Man", timesHosted: 1 },
        { id: "shay", name: "Shay", avatar: "🌶️", favBook: "The Hot Zone", timesHosted: 1 },
        { id: "hannah", name: "Hannah", avatar: "🎭", favBook: "The Song of Achilles", timesHosted: 0 },
        { id: "freddie", name: "Freddie", avatar: "🎸", favBook: "Lonesome Dove", timesHosted: 1 },
        { id: "jake", name: "Jake", avatar: "🚀", favBook: "The Hitchhiker's Guide to the Galaxy", timesHosted: 1 },
    ],

    // Alumni members (no longer active but have ratings on record)
    alumni: [
        { id: "laney", name: "Laney", avatar: "📚", favBook: "To Kill a Mockingbird", timesHosted: 1 },
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
        },
        {
            id: 17,
            title: "The Nightingale",
            author: "Kristin Hannah",
            meetingNumber: 17,
            nickname: "TBD",
            meetingDate: "2026-01-20",
            host: "Adrienne & Nick",
            location: "Adrienne's house",
            genre: "Historical Fiction",
            ratings: {
                sam: 7.0, furlong: 9.0, annie: 9.5, nick: 9.0,
                judge: 8.5, thomas: 8.5, casey: 9.0, matt: 8.0,
                hannah: 9.0, freddie: 8.0
            }
        }
    ],

    nextMeeting: {
        title: "11/22/63",
        author: "Stephen King",
        meetingDate: "2026-03-10"
    }
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
