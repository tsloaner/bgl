import { useEffect, useState } from 'react';
import { clubData, getAvgRating } from '../data/books';
import { fetchCover } from '../utils/fetchCover';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import { BookOpen, CalendarBlank, Star, Trophy } from '@phosphor-icons/react';

export default function Home() {
    const [nextMeetingCover, setNextMeetingCover] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [daysUntil, setDaysUntil] = useState(null);
    const [isPast, setIsPast] = useState(false);

    // Compute Stats
    const totalBooks = clubData.books.length;

    const allRatings = clubData.books.flatMap(b => Object.values(b.ratings).filter(v => typeof v === 'number'));
    const allTimeAvg = (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1);

    const genres = clubData.books.reduce((acc, b) => {
        acc[b.genre] = (acc[b.genre] || 0) + 1;
        return acc;
    }, {});
    const topGenre = Object.keys(genres).reduce((a, b) => genres[a] > genres[b] ? a : b);

    // Next Meeting Logic
    const nextMeeting = clubData.nextMeeting;
    useEffect(() => {
        if (nextMeeting) {
            let mounted = true;
            fetchCover(nextMeeting.title, nextMeeting.author).then(url => {
                if (mounted) setNextMeetingCover(url);
            });

            const today = new Date();
            // Calculate diff in exact days via UTC epoch matching
            const meetingDateObj = new Date(nextMeeting.meetingDate + 'T00:00:00Z');
            const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

            const diffTime = meetingDateObj - todayUTC;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 0) {
                setIsPast(true);
            } else {
                setDaysUntil(diffDays);
            }
            return () => { mounted = false; };
        }
    }, [nextMeeting]);

    // Recent reads
    const recentReads = [...clubData.books].sort((a, b) => new Date(b.meetingDate) - new Date(a.meetingDate)).slice(0, 4);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
            {/* Hero Section */}
            <section className="flex flex-col items-start mt-8 md:mt-16 w-full">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#2C4B3B] leading-none tracking-tight mb-6 whitespace-nowrap">
                    Boulder Gets <span className="text-[#DE6C4A]">Lit</span>
                </h1>
                <p className="text-xl md:text-2xl text-[#5C6359] max-w-2xl font-medium">
                    {totalBooks} books. {clubData.members.length} readers. Zero consensus.
                </p>
            </section>

            {/* Stats Bar */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
                <div className="relative bg-white p-8 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col justify-end min-h-[160px]">
                    <BookOpen weight="fill" className="text-[#2C4B3B] text-2xl absolute top-6 right-6" />
                    <span className="text-5xl font-display text-[#2C4B3B] mb-2">{totalBooks}</span>
                    <span className="text-xs font-semibold text-[#5C6359] uppercase tracking-wider">Books Read</span>
                </div>
                <div className="relative bg-[#2C4B3B] p-8 rounded-3xl border border-white/10 magnetic-shadow flex flex-col justify-end min-h-[160px]">
                    <Star weight="fill" className="text-[#DE6C4A] text-2xl absolute top-6 right-6" />
                    <span className="text-5xl font-display text-white mb-2">{allTimeAvg}</span>
                    <span className="text-xs font-semibold text-[#F8F6F0]/70 uppercase tracking-wider">Club Average</span>
                </div>
                <div className="relative bg-white p-8 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col justify-end min-h-[160px]">
                    <Trophy weight="fill" className="text-[#DE6C4A] text-2xl absolute top-6 right-6" />
                    <span className="text-3xl font-display text-[#2C4B3B] leading-none mb-2 line-clamp-2">{topGenre}</span>
                    <span className="text-xs font-semibold text-[#5C6359] uppercase tracking-wider mt-auto">Top Genre</span>
                </div>
            </section>

            {/* Next Meeting */}
            <section className="w-full">

                {/* Next Meeting */}
                <div className="bg-[#F8F6F0] rounded-[2.5rem] border border-[#5C6359]/10 p-2 overflow-hidden flex flex-col sm:flex-row relative magnetic-shadow">
                    <div className="w-full sm:w-1/3 aspect-[2/3] sm:aspect-auto sm:h-auto rounded-[2rem] overflow-hidden bg-[#2C4B3B] relative shrink-0">
                        {nextMeetingCover ? (
                            <img src={nextMeetingCover} alt={`Cover for ${nextMeeting?.title}`} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-6 text-center text-white font-display text-2xl bg-[#5C6359]/20 animate-pulse">
                                {nextMeeting?.title}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                        <span className="inline-block px-4 py-1.5 bg-[#DE6C4A]/10 text-[#DE6C4A] text-xs font-bold uppercase tracking-wider rounded-lg mb-6 self-start">
                            Next Up
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display text-[#2C4B3B] leading-none mb-3 line-clamp-2">
                            {nextMeeting?.title}
                        </h2>
                        <p className="text-xl text-[#5C6359] mb-8">by {nextMeeting?.author}</p>

                        {isPast ? (
                            <div className="bg-white rounded-2xl p-6 border border-[#5C6359]/10 text-center flex flex-col items-center justify-center gap-2">
                                <span className="text-3xl">👋</span>
                                <span className="text-lg font-semibold text-[#2C4B3B]">See you next month!</span>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-6 border border-[#5C6359]/10 flex items-center gap-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                                <div className="flex flex-col items-center justify-center shrink-0 min-w-[60px]">
                                    <span className="text-5xl font-display text-[#DE6C4A] leading-none">{daysUntil}</span>
                                    <span className="text-[10px] uppercase font-bold text-[#5C6359] tracking-wider mt-1">Days</span>
                                </div>
                                <div className="w-px h-12 bg-[#5C6359]/10 shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#5C6359] flex items-center gap-2">
                                        <CalendarBlank weight="bold" /> {new Date(nextMeeting.meetingDate + 'T00:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="text-xs text-[#5C6359]">Until we have opinions about this.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </section>

            {/* Recent Reads Strip */}
            <section className="flex flex-col gap-8 w-full">
                <div className="flex items-end justify-between px-2">
                    <h2 className="text-4xl md:text-5xl font-display text-[#2C4B3B]">Recent Reads</h2>
                </div>
                {/* Horizontal scroll snapping trick */}
                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] -mx-4 sm:-mx-8 px-4 sm:px-8" style={{ scrollbarWidth: 'none' }}>
                    {recentReads.map(b => (
                        <div key={b.id} className="w-[75vw] sm:w-[320px] shrink-0 snap-start">
                            <BookCard book={b} onClick={() => setSelectedBook(b)} />
                        </div>
                    ))}
                    <div className="w-4 sm:w-8 shrink-0 relative" /> {/* Padding spacer at end */}
                </div>
            </section>

            {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
        </div>
    );
}
