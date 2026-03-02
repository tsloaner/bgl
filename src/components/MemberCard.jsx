import { BookOpen, Star } from '@phosphor-icons/react';
import { getMemberAvgGiven } from '../data/books';

export default function MemberCard({ member, books, isAlumni = false }) {
    const avgGiven = getMemberAvgGiven(member.id, books);
    const ratersCount = books.filter(b => b.ratings[member.id] !== undefined).length;

    return (
        <div className={`relative flex flex-col bg-white rounded-2xl p-6 magnetic-shadow border ${isAlumni ? 'border-dashed border-[#5C6359]/20' : 'border-[#5C6359]/10'} transition-all duration-300 hover:-translate-y-1 cursor-default`}>
            <div className="flex items-start mb-4">
                <div>
                    <h3 className="font-display text-2xl text-[#4B8064] leading-none mb-1">{member.name}</h3>
                    {isAlumni && <span className="text-[10px] uppercase tracking-wider text-[#5C6359] font-semibold bg-[#5C6359]/10 px-2 py-0.5 rounded-sm">Alumni</span>}
                </div>
            </div>

            <div className="space-y-3 mt-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5C6359] flex items-center gap-1.5"><BookOpen weight="fill" className="text-[#5C6359]/50" /> Books Rated</span>
                    <span className="font-semibold text-[#2C4B3B]">{ratersCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5C6359] flex items-center gap-1.5"><Star weight="fill" className="text-[#5C6359]/50" /> Avg Given</span>
                    <span className="font-semibold text-[#2C4B3B]">{avgGiven ? avgGiven.toFixed(2) : '—'}</span>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#5C6359]/10">
                <p className="text-[10px] text-[#5C6359] uppercase tracking-wider font-semibold mb-1">Favorite Book</p>
                <p className="text-sm text-[#2C4B3B] italic line-clamp-1" title={member.favBook}>"{member.favBook}"</p>
            </div>
        </div>
    );
}
