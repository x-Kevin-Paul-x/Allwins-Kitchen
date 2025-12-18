const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404 - redirect to home
app.use((req, res) => {
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🍳 Allwin's Kitchen server is running on port ${PORT}`);
    console.log(`   Visit: http://localhost:${PORT}`);
});
