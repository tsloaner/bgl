import { useState, useEffect } from 'react';
import { X, CalendarBlank, MapPin, User, Tag } from '@phosphor-icons/react';
import { getAvgRating } from '../data/books';
import { fetchCover } from '../utils/fetchCover';
import { clubData } from '../data/books';

export default function BookModal({ book, onClose }) {
    const [coverUrl, setCoverUrl] = useState(null);
    const [showAllRatings, setShowAllRatings] = useState(false);

    useEffect(() => {
        if (!book) return;
        let mounted = true;
        fetchCover(book.title, book.author).then(url => {
            if (mounted) setCoverUrl(url);
        });
        return () => { mounted = false; };
    }, [book]);

    if (!book) return null;

    const avgRating = getAvgRating(book);
    const raterCount = Object.values(book.ratings).filter(v => typeof v === 'number').length;

    // "Vibe descriptor"
    let vibe = "Needs Ratings";
    if (avgRating !== null) {
        if (avgRating >= 8.0) vibe = "Universally Adored 🔥";
        else if (avgRating >= 7.0) vibe = "Solid Read 👍";
        else if (avgRating >= 6.0) vibe = "Mixed Bag 🤷";
        else vibe = "We Endured It 💀";
    }

    // individual ratings sorted highest to lowest
    const sortedRatings = Object.entries(book.ratings)
        .filter(([_, val]) => typeof val === 'number')
        .sort((a, b) => b[1] - a[1]);

    const highestRater = sortedRatings.length > 0 ? sortedRatings[0] : null;
    const lowestRater = sortedRatings.length > 0 ? sortedRatings[sortedRatings.length - 1] : null;

    // Find member info to get proper capitalization
    const getMemberName = (id) => {
        const act = clubData.members.find(m => m.id === id);
        if (act) return act.name;
        const alm = clubData.alumni.find(m => m.id === id);
        return alm ? alm.name : id;
    };

    const formattedDate = new Date(book.meetingDate).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto bg-[#2C4B3B]/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-4xl bg-[#F8F6F0] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur border border-[#5C6359]/20 text-[#2C4B3B] hover:bg-white transition-colors cursor-pointer"
                >
                    <X weight="bold" size={20} />
                </button>

                {/* Hero Left (Cover + Vibe) */}
                <div className="w-full md:w-2/5 relative bg-[#2C4B3B] p-6 lg:p-10 flex flex-col items-center justify-center">
                    <div className="w-full max-w-[240px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl bg-[#5C6359]/20 mb-8 border border-white/10 shrink-0 relative">
                        {coverUrl ? (
                            <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                <span className="font-display text-2xl text-white">{book.title}</span>
                            </div>
                        )}
                    </div>
                    <div className="text-center w-full">
                        <h4 className="text-[#DE6C4A] font-semibold text-sm tracking-wider uppercase mb-2">The Vibe</h4>
                        <p className="text-white text-xl md:text-2xl font-display">{vibe}</p>
                    </div>
                </div>

                {/* Info Right */}
                <div className="w-full md:w-3/5 p-6 lg:p-10 flex flex-col items-start bg-white max-h-[85vh] overflow-y-auto overscroll-contain">
                    {book.nickname && (
                        <span className="inline-block px-3 py-1 bg-[#DE6C4A]/10 text-[#DE6C4A] text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                            "{book.nickname}"
                        </span>
                    )}
                    <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2C4B3B] leading-none mb-2">
                        {book.title}
                    </h2>
                    <h3 className="text-lg md:text-xl lg:text-2xl text-[#5C6359] mb-8">
                        by {book.author}
                    </h3>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                        <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#F8F6F0] border border-[#5C6359]/10">
                            <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold flex items-center gap-1"><CalendarBlank /> Date</span>
                            <span className="text-[#2C4B3B] font-medium text-sm md:text-base">{formattedDate}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#F8F6F0] border border-[#5C6359]/10">
                            <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold flex items-center gap-1"><User /> Host</span>
                            <span className="text-[#2C4B3B] font-medium text-sm md:text-base">{book.host}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#F8F6F0] border border-[#5C6359]/10">
                            <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold flex items-center gap-1"><MapPin /> Location</span>
                            <span className="text-[#2C4B3B] font-medium text-sm md:text-base line-clamp-1" title={book.location}>{book.location}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#F8F6F0] border border-[#5C6359]/10">
                            <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold flex items-center gap-1"><Tag /> Genre</span>
                            <span className="text-[#2C4B3B] font-medium text-sm md:text-base">{book.genre}</span>
                        </div>
                    </div>

                    {/* Ratings Section */}
                    <div className="w-full border-t border-[#5C6359]/10 pt-8 mt-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-end gap-3">
                                <span className="text-5xl md:text-6xl font-display text-[#2C4B3B] leading-none">{avgRating ? avgRating.toFixed(2) : '-'}</span>
                                <span className="text-[#5C6359] mb-1">/ 10 club avg</span>
                            </div>
                            <button
                                onClick={() => setShowAllRatings(!showAllRatings)}
                                className="text-sm font-semibold text-[#DE6C4A] hover:underline cursor-pointer"
                            >
                                {showAllRatings ? 'Hide Breakdown' : 'See All Ratings'}
                            </button>
                        </div>

                        {showAllRatings ? (
                            <div className="space-y-3 mb-6 p-4 rounded-xl bg-[#F8F6F0]">
                                {sortedRatings.map(([rId, rVal]) => {
                                    const barColor = rVal >= 8 ? '#2C4B3B' : rVal >= 6.5 ? '#8BAD98' : '#DE6C4A';
                                    return (
                                        <div key={rId} className="flex items-center gap-3">
                                            <span className="w-16 text-sm font-medium text-[#2C4B3B] text-right truncate">{getMemberName(rId)}</span>
                                            <div className="flex-1 h-3 md:h-4 bg-[#5C6359]/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000"
                                                    style={{ width: `${(rVal / 10) * 100}%`, backgroundColor: barColor }}
                                                />
                                            </div>
                                            <span className="w-8 text-sm font-bold text-left" style={{ color: barColor }}>{rVal.toFixed(1)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-[#F8F6F0] border border-[#5C6359]/10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold">Highest 🏆</span>
                                    <span className="text-[#2C4B3B] font-medium text-sm md:text-base">{highestRater ? `${getMemberName(highestRater[0])} (${highestRater[1]})` : '—'}</span>
                                </div>
                                <div className="h-8 w-px bg-[#5C6359]/20 mx-2 md:mx-4" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold">Lowest 🔪</span>
                                    <span className="text-[#2C4B3B] font-medium text-sm md:text-base">{lowestRater ? `${getMemberName(lowestRater[0])} (${lowestRater[1]})` : '—'}</span>
                                </div>
                            </div>
                        )}

                        <p className="text-xs text-[#5C6359] text-center">Rated by {raterCount} members.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
