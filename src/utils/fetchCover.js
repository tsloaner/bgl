const coverCache = {};

const STORAGE_PREFIX = 'bgl_cover:';

function readStorage(key) {
    try {
        const val = sessionStorage.getItem(STORAGE_PREFIX + key);
        return val === null ? undefined : val === 'null' ? null : val;
    } catch { return undefined; }
}

function writeStorage(key, value) {
    try { sessionStorage.setItem(STORAGE_PREFIX + key, value ?? 'null'); } catch { /* unavailable */ }
}

export const fetchCover = async (title, author) => {
    const key = `${title}-${author}`;
    if (coverCache[key] !== undefined) return coverCache[key];

    const stored = readStorage(key);
    if (stored !== undefined) {
        coverCache[key] = stored;
        return stored;
    }

    try {
        const q = `title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1&fields=cover_i`;
        const res = await fetch(`https://openlibrary.org/search.json?${q}`);
        if (!res.ok) {
            coverCache[key] = null;
            writeStorage(key, null);
            return null;
        }
        const data = await res.json();
        const coverId = data.docs?.[0]?.cover_i;
        const result = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null;
        coverCache[key] = result;
        writeStorage(key, result);
        return result;
    } catch (error) {
        console.error("Failed to fetch cover for:", title, error);
        coverCache[key] = null;
        return null;
    }
};
