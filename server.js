const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Gzip / Brotli compression ────────────────────────────────────────────────
// Compresses all text responses (HTML, CSS, JS, JSON). Reduces HTML from
// ~100 KB to ~18 KB on the wire.
app.use(compression());

// ─── Static file serving with cache headers ───────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            // HTML: always revalidate so updates are seen immediately
            res.setHeader('Cache-Control', 'no-cache');
        } else if (/\.(webp|png|jpe?g|svg|ico|gif)$/i.test(filePath)) {
            // Images: cache for 1 year — use new filename to bust cache if image changes
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (/\.(css|js)$/i.test(filePath)) {
            // CSS / JS: cache for 1 year — use new filename to bust cache if file changes
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (/\.(pdf)$/i.test(filePath)) {
            // PDFs: cache for 1 day
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
    }
}));

// ─── Diagnostic route ─────────────────────────────────────────────────────────
app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date(), message: 'Pong from Allwins Kitchen server' });
});

// ─── Root route ───────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Failed to send index.html. Error:', err.message);
            res.status(500).send(`Server Error: Unable to load homepage. details: ${err.message}`);
        }
    });
});

// ─── 404 fallback → home ──────────────────────────────────────────────────────
app.use((req, res) => {
    res.redirect(301, '/');
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🍳 Allwin's Kitchen server is running on port ${PORT}`);
    console.log(`   Visit: http://localhost:${PORT}`);
});
