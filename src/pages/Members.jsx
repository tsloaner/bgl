import { useState } from 'react';
import { clubData } from '../data/books';
import MemberCard from '../components/MemberCard';
import MemberModal from '../components/MemberModal';

export default function Members() {
    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 mt-8 md:mt-16 px-4">

            {/* Header */}
            <div className="flex flex-col gap-4">
                <h1 className="font-display text-5xl md:text-7xl text-[#2C4B3B] uppercase tracking-tighter">The Roster</h1>
                <p className="text-[#5C6359] text-xl">The 13 readers responsible for this data.</p>
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
