import { X, TrendUp, TrendDown } from '@phosphor-icons/react';
import { getAvgRating } from '../data/books';

export default function MemberModal({ member, books, isAlumni = false, onClose }) {
    if (!member) return null;

    // Compute all books this member has rated, sorted newest first
    const memberRatings = books
        .filter(b => b.ratings[member.id] !== undefined)
        .sort((a, b) => new Date(b.meetingDate) - new Date(a.meetingDate))
        .map(b => {
            const bAvg = getAvgRating(b);
            const mScore = b.ratings[member.id];
            const diff = mScore - (bAvg || 0);
            return { book: b, score: mScore, clubAvg: bAvg || 0, difference: diff };
        });

    const ratersCount = memberRatings.length;
    const avgGiven = ratersCount > 0 ? (memberRatings.reduce((a, b) => a + b.score, 0) / ratersCount).toFixed(2) : '-';

    // Sort ratings by score to find high/low
    const sortedByScore = [...memberRatings].sort((a, b) => b.score - a.score);
    const highestRated = sortedByScore.length > 0 ? sortedByScore[0] : null;
    const lowestRated = sortedByScore.length > 0 ? sortedByScore[sortedByScore.length - 1] : null;

    // Find most contrarian rating (highest absolute difference from club avg)
    const mostContrarian = memberRatings.reduce((prev, curr) => {
        return (Math.abs(curr.difference) > Math.abs(prev?.difference || 0)) ? curr : prev;
    }, { difference: 0 });

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto bg-[#2C4B3B]/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#F8F6F0] hover:bg-[#5C6359]/10 text-[#2C4B3B] transition-colors cursor-pointer"
                >
                    <X weight="bold" size={20} />
                </button>

                {/* Header */}
                <div className="w-full bg-[#F8F6F0] p-6 sm:p-8 border-b border-[#5C6359]/10">
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="font-display text-3xl sm:text-4xl text-[#2C4B3B] leading-none mb-2">
                            {member.name} {isAlumni && <span className="text-[10px] sm:text-sm uppercase tracking-wider text-[#5C6359] bg-[#5C6359]/10 px-2 py-1 rounded-md align-middle ml-2">Alumni</span>}
                        </h2>
                        <p className="text-[#5C6359] italic text-sm sm:text-base mb-4 sm:mb-2 line-clamp-1">"{member.favBook}" outside the club</p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-2">
                            <span className="px-3 py-1.5 bg-white border border-[#5C6359]/10 rounded-lg text-xs sm:text-sm font-semibold text-[#2C4B3B] whitespace-nowrap">
                                📚 {ratersCount} Books Rated
                            </span>
                            <span className="px-3 py-1.5 bg-white border border-[#5C6359]/10 rounded-lg text-xs sm:text-sm font-semibold text-[#2C4B3B] whitespace-nowrap">
                                ⭐ {avgGiven} Avg Given
                            </span>
                            {member.timesHosted > 0 && (
                                <span className="px-3 py-1.5 bg-white border border-[#5C6359]/10 rounded-lg text-xs sm:text-sm font-semibold text-[#2C4B3B] whitespace-nowrap">
                                    🏠 Hosted {member.timesHosted} Times
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Highlights Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-xl font-display text-[#2C4B3B] mb-4">Track Record</h3>

                        {highestRated && (
                            <div className="p-4 bg-[#F8F6F0] rounded-xl border border-[#5C6359]/10">
                                <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold flex items-center gap-1 mb-1"><TrendUp /> Personal High</span>
                                <p className="text-base md:text-lg font-display text-[#2C4B3B] leading-tight line-clamp-2">{highestRated.book.title}</p>
                                <p className="text-sm font-semibold text-[#DE6C4A] mt-1">Gave a {highestRated.score}</p>
                            </div>
                        )}

                        {lowestRated && (
                            <div className="p-4 bg-[#F8F6F0] rounded-xl border border-[#5C6359]/10">
                                <span className="text-[10px] md:text-xs text-[#5C6359] uppercase font-bold flex items-center gap-1 mb-1"><TrendDown /> Personal Low</span>
                                <p className="text-base md:text-lg font-display text-[#2C4B3B] leading-tight line-clamp-2">{lowestRated.book.title}</p>
                                <p className="text-sm font-semibold text-[#DE6C4A] mt-1">Gave a {lowestRated.score}</p>
                            </div>
                        )}

                        {mostContrarian.book && (
                            <div className="p-4 bg-[#2C4B3B] rounded-xl">
                                <span className="text-[10px] md:text-xs text-[#F8F6F0]/70 uppercase font-bold flex items-center gap-1 mb-1">🌶️ Spiciest Take</span>
                                <p className="text-base md:text-lg font-display text-white leading-tight mb-2 line-clamp-2">{mostContrarian.book.title}</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest">Their Score</span>
                                        <span className="text-base md:text-lg text-[#DE6C4A] font-bold">{mostContrarian.score.toFixed(1)}</span>
                                    </div>
                                    <div className="w-px h-6 bg-white/20" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest">Club Avg</span>
                                        <span className="text-base md:text-lg text-white font-medium">{(mostContrarian.clubAvg || 0).toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rating History List */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-display text-[#2C4B3B] mb-4 flex justify-between items-end">
                            Rating History
                        </h3>
                        <div className="space-y-3">
                            {memberRatings.map((mr) => (
                                <div key={mr.book.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white border border-[#5C6359]/10 hover:border-[#2C4B3B]/30 rounded-xl transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-[#2C4B3B] truncate">{mr.book.title}</h4>
                                    </div>

                                    <div className="flex items-center gap-4 sm:w-1/2 shrink-0">
                                        {/* Score bar with club avg tick */}
                                        <div className="flex-1 relative h-2 bg-[#5C6359]/10 rounded-full overflow-visible">
                                            <div
                                                className="absolute top-0 bottom-0 left-0 rounded-full"
                                                style={{
                                                    width: `${(mr.score / 10) * 100}%`,
                                                    backgroundColor: mr.difference > 0 ? '#2C4B3B' : mr.difference < 0 ? '#DE6C4A' : '#8BAD98'
                                                }}
                                            />
                                            <div
                                                className="absolute w-[2px] rounded-full z-10"
                                                style={{
                                                    top: '-3px', bottom: '-3px',
                                                    left: `calc(${(mr.clubAvg / 10) * 100}% - 1px)`,
                                                    backgroundColor: '#5C635980'
                                                }}
                                                title={`Club Avg: ${(mr.clubAvg || 0).toFixed(1)}`}
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 text-sm shrink-0 w-20 justify-end whitespace-nowrap">
                                            <span
                                                className="font-bold w-6"
                                                style={{ color: mr.difference > 0 ? '#2C4B3B' : mr.difference < 0 ? '#DE6C4A' : '#8BAD98' }}
                                            >{mr.score.toFixed(1)}</span>
                                            <span className="text-[#5C6359] text-[10px] md:text-xs">vs {(mr.clubAvg || 0).toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {memberRatings.length === 0 && (
                                <p className="text-center text-[#5C6359] py-8 border border-dashed border-[#5C6359]/20 rounded-xl">
                                    Still earning their place at the table.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
