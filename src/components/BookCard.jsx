import { useState, useEffect } from 'react';
import { Star, UsersThree, CalendarBlank, Tag } from '@phosphor-icons/react';
import { getAvgRating } from '../data/books';
import { fetchCover } from '../utils/fetchCover';

export default function BookCard({ book, onClick }) {
    const [coverUrl, setCoverUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const avgRating = getAvgRating(book);
    const raterCount = Object.values(book.ratings).filter(v => typeof v === 'number').length;

    const getRatingStyle = (rating) => {
        if (rating >= 8) return { bg: '#2C4B3B', color: '#ffffff', starColor: '#ffffff' };
        if (rating >= 6.5) return { bg: 'rgba(255,255,255,0.75)', color: '#2C4B3B', starColor: '#DE6C4A', blur: true };
        return { bg: '#DE6C4A', color: '#ffffff', starColor: '#ffffff' };
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            const url = await fetchCover(book.title, book.author);
            if (mounted) {
                setCoverUrl(url);
                setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [book.title, book.author]);

    // Format date: "Mar 2024"
    const dateObj = new Date(book.meetingDate);
    // Using UTC to avoid timezone off-by-one errors with basic strings
    const formattedDate = dateObj.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', year: 'numeric' });

    return (
        <div
            onClick={onClick}
            className={`group relative flex flex-col bg-white rounded-2xl p-4 gap-4 magnetic-shadow border border-[#5C6359]/10 transition-all duration-300 ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}`}
        >
            {/* Cover Image Container */}
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#F8F6F0] border border-[#5C6359]/5 shrink-0">
                {loading ? (
                    <div className="absolute inset-0 animate-pulse bg-[#5C6359]/10" />
                ) : coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-[#2C4B3B] text-[#F8F6F0]">
                        <span className="font-display text-2xl leading-tight">{book.title}</span>
                    </div>
                )}

                {/* Rating Badge Overlay */}
                {avgRating && (() => {
                    const s = getRatingStyle(avgRating);
                    return (
                        <div
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-bold text-sm"
                            style={{
                                backgroundColor: s.bg,
                                color: s.color,
                                backdropFilter: s.blur ? 'blur(8px)' : undefined,
                                WebkitBackdropFilter: s.blur ? 'blur(8px)' : undefined,
                            }}
                        >
                            <Star weight="fill" style={{ color: s.starColor }} />
                            {avgRating.toFixed(1)}
                        </div>
                    );
                })()}
            </div>

            {/* Book Info */}
            <div className="flex flex-col flex-1 pb-1">
                <h3 className="font-display text-xl leading-tight text-[#2C4B3B] mb-1 line-clamp-2">
                    {book.title}
                </h3>
                <p className="text-[#5C6359] text-sm mb-3">by {book.author}</p>

                <div className="mt-auto flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2C4B3B] bg-[#2C4B3B]/5 px-2 py-1 rounded-md">
                            <Tag weight="bold" /> {book.genre}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-[#5C6359] bg-[#5C6359]/5 px-2 py-1 rounded-md">
                            <CalendarBlank weight="bold" /> {formattedDate}
                        </span>
                    </div>
                    <div className="text-xs text-[#5C6359] flex items-center gap-1 mt-1">
                        <UsersThree weight="fill" className="text-[#5C6359]/60 text-lg" />
                        <span>{raterCount} raters</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
