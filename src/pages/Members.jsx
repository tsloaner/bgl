import { useState } from 'react';
import { clubData, getMemberAvgGiven } from '../data/books';
import MemberCard from '../components/MemberCard';
import MemberModal from '../components/MemberModal';
import { Target, Knife, Pepper, CalendarCheck, Star } from '@phosphor-icons/react';

export default function Members() {
    const [selectedMember, setSelectedMember] = useState(null);

    // --- Compute Badges ---
    const memberStats = clubData.members.map(m => {
        const ratings = clubData.books.flatMap(b => b.ratings[m.id] !== undefined ? [b.ratings[m.id]] : []);
        const avg = getMemberAvgGiven(m.id, clubData.books);

        let variance = 0;
        if (ratings.length > 0 && avg !== null) {
            variance = ratings.reduce((sum, r) => sum + Math.pow(r - avg, 2), 0) / ratings.length;
        }

        return { ...m, avg, variance, ratingsCount: ratings.length };
    });

    // Most Generous
    const mostGenerous = [...memberStats].sort((a, b) => b.avg - a.avg)[0];
    // Toughest Critic
    const toughest = [...memberStats].filter(m => m.avg !== null).sort((a, b) => a.avg - b.avg)[0];
    // Most Opinionated (highest variance)
    const mostOpinionated = [...memberStats].sort((a, b) => b.variance - a.variance)[0];
    // Most Consistent (lowest variance)
    const mostConsistent = [...memberStats].filter(m => m.ratingsCount > 2).sort((a, b) => a.variance - b.variance)[0];

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 mt-8 md:mt-16 px-4">

            {/* Header */}
            <div className="flex flex-col gap-4">
                <h1 className="font-display text-5xl md:text-7xl text-[#2C4B3B] uppercase tracking-tighter">The Roster</h1>
                <p className="text-[#5C6359] text-xl">The 13 readers responsible for this data.</p>
            </div>

            {/* Badges Strip */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#DE6C4A]/10 text-[#DE6C4A] flex items-center justify-center shrink-0 mb-3"><Target weight="fill" size={20} /></div>
                    <span className="text-[10px] font-bold text-[#5C6359] uppercase tracking-wider block mb-1">Most Generous</span>
                    <span className="font-display text-xl text-[#2C4B3B]">{mostGenerous?.name}</span>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#2C4B3B]/10 text-[#2C4B3B] flex items-center justify-center shrink-0 mb-3"><Knife weight="fill" size={20} /></div>
                    <span className="text-[10px] font-bold text-[#5C6359] uppercase tracking-wider block mb-1">Toughest Critic</span>
                    <span className="font-display text-xl text-[#2C4B3B]">{toughest?.name}</span>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#DE6C4A]/10 text-[#DE6C4A] flex items-center justify-center shrink-0 mb-3"><Pepper weight="fill" size={20} /></div>
                    <span className="text-[10px] font-bold text-[#5C6359] uppercase tracking-wider block mb-1">Most Opinionated</span>
                    <span className="font-display text-xl text-[#2C4B3B]">{mostOpinionated?.name}</span>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#2C4B3B]/10 text-[#2C4B3B] flex items-center justify-center shrink-0 mb-3"><CalendarCheck weight="fill" size={20} /></div>
                    <span className="text-[10px] font-bold text-[#5C6359] uppercase tracking-wider block mb-1">Most Consistent</span>
                    <span className="font-display text-xl text-[#2C4B3B]">{mostConsistent?.name}</span>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col gap-1">
                    <div className="w-10 h-10 rounded-full bg-[#DE6C4A]/10 text-[#DE6C4A] flex items-center justify-center shrink-0 mb-3"><Star weight="fill" size={20} /></div>
                    <span className="text-[10px] font-bold text-[#5C6359] uppercase tracking-wider block mb-1">Perfect 10</span>
                    <span className="font-display text-xl text-[#2C4B3B]">Hannah</span>
                </div>
            </div>

            {/* Active Members Grid */}
            <section>
                <h2 className="text-3xl font-display text-[#2C4B3B] mb-6 line-clamp-2">Active Members</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {clubData.members.map(member => (
                        <div key={member.id} onClick={() => setSelectedMember({ ...member, isAlumni: false })}>
                            <MemberCard member={member} books={clubData.books} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Alumni Grid */}
            <section className="opacity-80 mt-8">
                <h2 className="text-3xl font-display text-[#5C6359] mb-6">Alumni</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[120px]">
                    {clubData.alumni.map(member => (
                        <div key={member.id} onClick={() => setSelectedMember({ ...member, isAlumni: true })}>
                            <MemberCard member={member} books={clubData.books} isAlumni={true} />
                        </div>
                    ))}
                </div>
            </section>

            {selectedMember && (
                <MemberModal
                    member={selectedMember}
                    books={clubData.books}
                    isAlumni={selectedMember.isAlumni}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </div>
    );
}
