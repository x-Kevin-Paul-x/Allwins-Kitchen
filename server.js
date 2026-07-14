const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Startup diagnostics
console.log('--- Startup Diagnostics ---');
console.log('Current __dirname:', __dirname);
try {
    console.log('Files in __dirname:', fs.readdirSync(__dirname));
    const publicPath = path.join(__dirname, 'public');
    if (fs.existsSync(publicPath)) {
        console.log('Files in public/ directory:', fs.readdirSync(publicPath));
    } else {
        console.log('WARNING: public/ directory does not exist at:', publicPath);
    }
} catch (err) {
    console.error('Error during startup diagnostics:', err.message);
}
console.log('---------------------------');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Diagnostic test route
app.get('/ping', (req, res) => {
    res.send({ status: 'ok', time: new Date(), message: 'Pong from Allwins Kitchen server' });
});

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Failed to send index.html. Error:', err.message);
            res.status(500).send(`Server Error: Unable to load homepage. details: ${err.message}`);
        }
    });
});

// Handle 404 - redirect to home
app.use((req, res) => {
    console.log('404 Route hit for:', req.originalUrl);
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🍳 Allwin's Kitchen server is running on port ${PORT}`);
    console.log(`   Visit: http://localhost:${PORT}`);
});
