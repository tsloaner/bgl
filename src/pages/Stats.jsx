import { useMemo } from 'react';
import { clubData, getAvgRating, getMemberAvgGiven } from '../data/books';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
    LineChart, Line, ReferenceLine, CartesianGrid, LabelList
} from 'recharts';
import { Star, BookOpen } from '@phosphor-icons/react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-[#5C6359]/10 rounded-xl magnetic-shadow text-sm">
                <p className="font-bold text-[#2C4B3B] mb-1">{payload[0].payload.title || label || payload[0].payload.name}</p>
                <p className="text-[#DE6C4A] font-medium text-lg leading-none">{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const BellTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-[#5C6359]/10 rounded-xl magnetic-shadow text-sm">
                <p className="text-[#DE6C4A] font-medium text-lg leading-none">{payload[0].value} ratings</p>
            </div>
        );
    }
    return null;
};

const medals = ['🥇', '🥈', '🥉'];

export default function Stats() {
    // --- Data Computations ---

    // 1. Cards Data
    const totalBooks = clubData.books.length;
    const allRatingsList = clubData.books.flatMap(b => Object.entries(b.ratings).filter(([_, v]) => typeof v === 'number').map(([id, v]) => ({ book: b, id, val: v })));
    const allTimeAvg = (allRatingsList.reduce((sum, r) => sum + r.val, 0) / allRatingsList.length).toFixed(1);

    // Critic Spectrum data
    const memberAvgs = clubData.members.map(m => ({
        name: m.name,
        avg: getMemberAvgGiven(m.id, clubData.books)
    })).filter(m => m.avg !== null).sort((a, b) => a.avg - b.avg);

    // 2. Chart 1: The Critic Spectrum (Horizontal Bar)
    const criticData = [...memberAvgs].sort((a, b) => a.avg - b.avg).map(m => ({
        name: m.name,
        avg: parseFloat(m.avg.toFixed(2))
    }));

    // 3. Chart 2: The Verdict (Top 5 & Bottom 5 Books)
    const booksWithAvgs = clubData.books.map(b => ({
        title: b.title,
        avg: getAvgRating(b) || 0
    })).sort((a, b) => b.avg - a.avg);

    const top5 = booksWithAvgs.slice(0, 5);
    const bottom5 = booksWithAvgs.slice(-5).reverse();
    const verdictData = [...top5, ...bottom5].map(b => ({
        ...b,
        fill: b.avg >= 7 ? '#2C4B3B' : '#DE6C4A'
    }));

    // 4. Chart 3: Rating by Genre
    const genreMap = clubData.books.reduce((acc, b) => {
        const avg = getAvgRating(b);
        if (avg === null) return acc;
        if (!acc[b.genre]) acc[b.genre] = { total: 0, count: 0 };
        acc[b.genre].total += avg;
        acc[b.genre].count += 1;
        return acc;
    }, {});
    const genreData = Object.entries(genreMap)
        .map(([name, { total, count }]) => {
            const avg = parseFloat((total / count).toFixed(2));
            const fill = avg >= 8 ? '#2C4B3B' : avg >= 7 ? '#4B8064' : avg >= 6.5 ? '#8BAD98' : '#DE6C4A';
            return { name, label: `${name} (${count})`, avg, count, fill };
        })
        .sort((a, b) => b.avg - a.avg);

    // 5. Chart 4: The Bell Curve (Histogram of all scores)
    const buckets = Array.from({ length: 10 }, (_, i) => ({ range: `${i + 1}`, count: 0 }));
    allRatingsList.forEach(r => {
        let bucketIdx = Math.floor(r.val) - 1;
        if (bucketIdx < 0) bucketIdx = 0;
        if (bucketIdx > 9) bucketIdx = 9;
        buckets[bucketIdx].count += 1;
    });

    // 6. Ratings Over Time
    const ratingsOverTime = [...clubData.books]
        .sort((a, b) => new Date(a.meetingDate) - new Date(b.meetingDate))
        .map(b => ({
            meeting: new Date(b.meetingDate + 'T00:00:00Z').toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', year: '2-digit' }),
            avg: parseFloat((getAvgRating(b) || 0).toFixed(2)),
            title: b.title,
        }));
    const overallAvg = parseFloat(allTimeAvg);

    // 7. Host Rankings
    const hostMap = {};
    clubData.books.forEach(b => {
        const avg = getAvgRating(b);
        if (avg === null) return;
        b.host.split(' & ').map(h => h.trim()).forEach(hostName => {
            if (!hostMap[hostName]) hostMap[hostName] = { name: hostName, total: 0, count: 0, books: [] };
            hostMap[hostName].total += avg;
            hostMap[hostName].count += 1;
            hostMap[hostName].books.push({ title: b.title, avg });
        });
    });
    const hostRankings = Object.values(hostMap)
        .map(h => ({
            name: h.name,
            avg: parseFloat((h.total / h.count).toFixed(2)),
            booksCount: h.count,
            bestPick: [...h.books].sort((a, b) => b.avg - a.avg)[0],
        }))
        .sort((a, b) => b.avg - a.avg);

    // 8. The Oracle (closest to club avg)
    const oracleStats = clubData.members.map(m => {
        const rated = clubData.books.filter(b => b.ratings[m.id] !== undefined);
        if (rated.length < 3) return null;
        const deviations = rated.map(b => Math.abs(b.ratings[m.id] - (getAvgRating(b) || 0)));
        const avgDev = deviations.reduce((a, b) => a + b, 0) / deviations.length;
        return { name: m.name, avgDev: parseFloat(avgDev.toFixed(2)), booksRated: rated.length };
    }).filter(Boolean).sort((a, b) => a.avgDev - b.avgDev);
    const maxDev = Math.max(...oracleStats.map(o => o.avgDev));

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 mt-8 md:mt-16 px-4">

            {/* Header */}
            <div className="flex flex-col gap-4">
                <h1 className="font-display text-5xl md:text-7xl text-[#2C4B3B] uppercase tracking-tighter">The Data</h1>
                <p className="text-[#5C6359] text-xl">Because opinions are just data with feelings.</p>
            </div>

            {/* Stat Cards */}
            <section className="grid grid-cols-2 gap-4 md:gap-6 max-w-sm">
                <div className="relative bg-white p-6 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col justify-end min-h-[140px]">
                    <BookOpen className="text-[#2C4B3B] text-xl absolute top-5 right-5" />
                    <span className="text-4xl font-display text-[#2C4B3B] mb-1">{totalBooks}</span>
                    <span className="text-[10px] font-bold text-[#5C6359] uppercase tracking-wider">Books Read</span>
                </div>
                <div className="relative bg-white p-6 rounded-3xl border border-[#5C6359]/10 magnetic-shadow flex flex-col justify-end min-h-[140px]">
                    <Star weight="fill" className="text-[#DE6C4A] text-xl absolute top-5 right-5" />
                    <span className="text-4xl font-display text-[#2C4B3B] mb-1">{allTimeAvg}</span>
                    <span className="text-[10px] font-bold text-[#5C6359] uppercase tracking-wider">Club Average</span>
                </div>
            </section>

            {/* Charts Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Chart 1: Ratings Over Time — full width, pinned to top */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#5C6359]/10 magnetic-shadow lg:col-span-2">
                    <h3 className="text-2xl font-display text-[#2C4B3B] mb-2">Ratings Over Time</h3>
                    <p className="text-sm text-[#5C6359] mb-8">Average club rating per meeting. Dashed line is the all-time average.</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={ratingsOverTime} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                <CartesianGrid horizontal={true} vertical={false} stroke="#5C6359" strokeOpacity={0.07} />
                                <XAxis dataKey="meeting" axisLine={false} tickLine={false} tick={{ fill: '#5C6359', fontSize: 12 }} />
                                <YAxis domain={[0, 10]} hide />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#5C6359', strokeWidth: 1, opacity: 0.2 }} />
                                <ReferenceLine y={overallAvg} stroke="#DE6C4A" strokeDasharray="6 4" strokeWidth={1.5} />
                                <Line
                                    type="monotone"
                                    dataKey="avg"
                                    stroke="#2C4B3B"
                                    strokeWidth={2.5}
                                    dot={{ fill: '#2C4B3B', r: 5, strokeWidth: 0 }}
                                    activeDot={{ fill: '#DE6C4A', r: 7, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Critic Spectrum */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#5C6359]/10 magnetic-shadow">
                    <h3 className="text-2xl font-display text-[#2C4B3B] mb-2">The Critic Spectrum</h3>
                    <p className="text-sm text-[#5C6359] mb-8">All-time average rating given. <span className="text-[#DE6C4A] font-bold">Harsh &larr;</span> vs <span className="text-[#2C4B3B] font-bold">&rarr; Easy</span></p>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={criticData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                <CartesianGrid horizontal={false} vertical={true} stroke="#5C6359" strokeOpacity={0.07} />
                                <XAxis type="number" domain={[0, 10]} hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#2C4B3B', fontWeight: 600 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#5C6359', opacity: 0.05 }} />
                                <Bar dataKey="avg" radius={[0, 10, 10, 0]} barSize={20}>
                                    {criticData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index < 4 ? '#DE6C4A' : '#2C4B3B'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 3: The Verdict */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#5C6359]/10 magnetic-shadow overflow-hidden">
                    <h3 className="text-2xl font-display text-[#2C4B3B] mb-2">The Verdict</h3>
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-sm text-[#5C6359]">Top 5 loved vs. bottom 5 endured.</p>
                        <div className="flex items-center gap-4 shrink-0 ml-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-[#2C4B3B]" />
                                <span className="text-xs text-[#5C6359] font-medium">Top 5</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-[#DE6C4A]" />
                                <span className="text-xs text-[#5C6359] font-medium">Bottom 5</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[400px] w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={verdictData} margin={{ top: 24, right: 0, left: 0, bottom: 10 }}>
                                <CartesianGrid horizontal={true} vertical={false} stroke="#5C6359" strokeOpacity={0.07} />
                                <XAxis dataKey="title" axisLine={false} tickLine={false} tick={false} height={10} />
                                <YAxis domain={[0, 10]} hide />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#5C6359', opacity: 0.05 }} />
                                <Bar dataKey="avg" radius={[10, 10, 0, 0]}>
                                    {verdictData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList
                                        dataKey="avg"
                                        position="top"
                                        formatter={(v) => v.toFixed(1)}
                                        style={{ fill: '#5C6359', fontSize: 11, fontWeight: 700 }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 4: What We're Into */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#5C6359]/10 magnetic-shadow">
                    <h3 className="text-2xl font-display text-[#2C4B3B] mb-2">What We're Into</h3>
                    <p className="text-sm text-[#5C6359] mb-8">Average club rating by genre, ranked.</p>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={genreData} layout="vertical" margin={{ top: 0, right: 50, left: 10, bottom: 0 }}>
                                <CartesianGrid horizontal={false} vertical={true} stroke="#5C6359" strokeOpacity={0.07} />
                                <XAxis type="number" domain={[0, 10]} hide />
                                <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} width={145} tick={{ fill: '#2C4B3B', fontWeight: 600, fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#5C6359', opacity: 0.05 }} />
                                <Bar dataKey="avg" radius={[0, 8, 8, 0]} barSize={22}>
                                    {genreData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList
                                        dataKey="avg"
                                        position="right"
                                        formatter={(v) => v.toFixed(1)}
                                        style={{ fill: '#5C6359', fontSize: 11, fontWeight: 700 }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 5: Host Rankings */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#5C6359]/10 magnetic-shadow">
                    <h3 className="text-2xl font-display text-[#2C4B3B] mb-2">Host Rankings</h3>
                    <p className="text-sm text-[#5C6359] mb-6">Ranked by average club rating of their book picks.</p>
                    <div className="space-y-3">
                        {hostRankings.map((host, index) => {
                            const barColor = host.avg >= 8 ? '#2C4B3B' : host.avg >= 7 ? '#4B8064' : host.avg >= 6.5 ? '#8BAD98' : '#DE6C4A';
                            return (
                                <div key={host.name} className="flex items-center gap-3">
                                    <span className="w-6 text-base text-center shrink-0">
                                        {index < 3 ? medals[index] : <span className="text-xs font-bold text-[#5C6359]">{index + 1}</span>}
                                    </span>
                                    <span className="w-16 text-sm font-semibold text-[#2C4B3B] truncate shrink-0">{host.name}</span>
                                    <div className="flex-1 h-3 bg-[#5C6359]/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{ width: `${(host.avg / 10) * 100}%`, backgroundColor: barColor }}
                                        />
                                    </div>
                                    <span className="w-10 text-sm font-bold text-right shrink-0" style={{ color: barColor }}>{host.avg.toFixed(2)}</span>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-[10px] text-[#5C6359] mt-6 uppercase tracking-wider font-semibold">Co-hosts credited individually</p>
                </div>

                {/* Chart 7: The Oracle */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#5C6359]/10 magnetic-shadow">
                    <h3 className="text-2xl font-display text-[#2C4B3B] mb-2">The Oracle</h3>
                    <p className="text-sm text-[#5C6359] mb-6">Whose ratings best predict the club's average? Lower deviation = closer to the hive mind.</p>
                    <div className="space-y-3">
                        {oracleStats.map((member, index) => {
                            const accuracy = 1 - (member.avgDev / (maxDev + 0.5));
                            const barColor = member.avgDev <= 1.0 ? '#2C4B3B' : member.avgDev <= 1.5 ? '#4B8064' : member.avgDev <= 2.0 ? '#8BAD98' : '#DE6C4A';
                            return (
                                <div key={member.name} className="flex items-center gap-3">
                                    <span className="w-6 text-base text-center shrink-0">
                                        {index < 3 ? medals[index] : <span className="text-xs font-bold text-[#5C6359]">{index + 1}</span>}
                                    </span>
                                    <span className="w-16 text-sm font-semibold text-[#2C4B3B] truncate shrink-0">{member.name}</span>
                                    <div className="flex-1 h-3 bg-[#5C6359]/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{ width: `${accuracy * 100}%`, backgroundColor: barColor }}
                                        />
                                    </div>
                                    <span className="w-16 text-xs font-bold text-right shrink-0" style={{ color: barColor }}>±{member.avgDev.toFixed(2)} pts</span>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-[10px] text-[#5C6359] mt-6 uppercase tracking-wider font-semibold">Min. 3 books rated to qualify</p>
                </div>

                {/* Chart 7: The Bell Curve — full width, at the bottom */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#5C6359]/10 magnetic-shadow lg:col-span-2">
                    <h3 className="text-2xl font-display text-[#2C4B3B] mb-2">The Bell Curve</h3>
                    <p className="text-sm text-[#5C6359] mb-8">Histogram of every rating ever given. Each bar = one point on the 1–10 scale.</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={buckets} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#5C6359' }} />
                                <YAxis hide />
                                <Tooltip content={<BellTooltip />} cursor={{ fill: '#5C6359', opacity: 0.05 }} />
                                <Bar dataKey="count" fill="#2C4B3B" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </section>
        </div>
    );
}
