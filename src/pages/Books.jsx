import { useState, useMemo } from 'react';
import { MagnifyingGlass, Funnel, SortAscending, CalendarBlank } from '@phosphor-icons/react';
import { clubData, getAvgRating } from '../data/books';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';

export default function Books() {
    const [selectedBook, setSelectedBook] = useState(null);

    // Filters & Sorting state
    const [searchQuery, setSearchQuery] = useState('');
    const [sortParam, setSortParam] = useState('date-desc');
    const [genreFilter, setGenreFilter] = useState('All');
    const [yearFilter, setYearFilter] = useState('All');

    const genres = ['All', ...new Set(clubData.books.map(b => b.genre))].sort();
    const years = ['All', '2024', '2025'];

    const filteredBooks = useMemo(() => {
        return clubData.books.filter(b => {
            // Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!b.title.toLowerCase().includes(q) && !b.author.toLowerCase().includes(q)) return false;
            }
            // Genre
            if (genreFilter !== 'All' && b.genre !== genreFilter) return false;
            // Year
            if (yearFilter !== 'All') {
                const y = new Date(b.meetingDate).getFullYear().toString();
                if (y !== yearFilter) return false;
            }
            return true;
        }).sort((a, b) => {
            if (sortParam === 'date-desc') return new Date(b.meetingDate) - new Date(a.meetingDate);
            if (sortParam === 'date-asc') return new Date(a.meetingDate) - new Date(b.meetingDate);
            if (sortParam === 'rating-desc') return (getAvgRating(b) || 0) - (getAvgRating(a) || 0);
            if (sortParam === 'title-asc') return a.title.localeCompare(b.title);
            return 0;
        });
    }, [searchQuery, genreFilter, yearFilter, sortParam]);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 mt-8 md:mt-16">

            {/* Header */}
            <div className="flex flex-col gap-4">
                <h1 className="font-display text-5xl md:text-7xl text-[#2C4B3B] uppercase tracking-tighter">The Archive</h1>
                <p className="text-[#5C6359] text-xl">Every book we've loved, hated, and pretended to finish.</p>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col lg:flex-row gap-4 w-full bg-white p-4 rounded-3xl border border-[#5C6359]/10 magnetic-shadow z-20 sticky top-24">

                {/* Search */}
                <div className="flex-1 relative">
                    <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C6359]" size={20} />
                    <input
                        type="text"
                        placeholder="Search titles or authors..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-[#F8F6F0] rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#2C4B3B]/20 text-[#2C4B3B] placeholder-[#5C6359]/50"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" style={{ scrollbarWidth: 'none' }}>
                    <div className="flex items-center bg-[#F8F6F0] rounded-2xl px-3 shrink-0">
                        <Funnel className="text-[#5C6359] mr-2" size={18} />
                        <select
                            value={genreFilter}
                            onChange={e => setGenreFilter(e.target.value)}
                            className="bg-transparent border-none outline-none text-[#2C4B3B] text-sm py-3 font-medium cursor-pointer"
                        >
                            {genres.map(g => <option key={g} value={g}>{g === 'All' ? 'All Genres' : g}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center bg-[#F8F6F0] rounded-2xl px-3 shrink-0">
                        <CalendarBlank className="text-[#5C6359] mr-2" size={18} />
                        <select
                            value={yearFilter}
                            onChange={e => setYearFilter(e.target.value)}
                            className="bg-transparent border-none outline-none text-[#2C4B3B] text-sm py-3 font-medium cursor-pointer"
                        >
                            {years.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center bg-[#F8F6F0] rounded-2xl px-3 shrink-0">
                        <SortAscending className="text-[#5C6359] mr-2" size={18} />
                        <select
                            value={sortParam}
                            onChange={e => setSortParam(e.target.value)}
                            className="bg-transparent border-none outline-none text-[#2C4B3B] text-sm py-3 font-medium cursor-pointer pr-4"
                        >
                            <option value="date-desc">Newest First</option>
                            <option value="date-asc">Oldest First</option>
                            <option value="rating-desc">Highest Rated</option>
                            <option value="title-asc">Title A-Z</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[50vh]">
                    {filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
                    ))}
                </div>
            ) : (
                <div className="w-full flex flex-col items-center justify-center p-12 md:p-24 border border-dashed border-[#5C6359]/20 rounded-3xl text-center gap-4 min-h-[50vh]">
                    <span className="text-6xl">📖</span>
                    <h3 className="text-2xl font-display text-[#2C4B3B]">No books found</h3>
                    <p className="text-[#5C6359]">No books survived your filters. Maybe lower the bar?</p>
                </div>
            )}

            {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
        </div>
    );
}
