const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const aircraftRoutes = require('./routes/aircraftRoutes');
const pagesRoutes = require('./routes/pagesRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.disable('x-powered-by');

// Middleware: Set security headers using helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "blob:"],
            imgSrc: ["'self'", "blob:", "data:"],
            mediaSrc: ["'self'", "blob:"],
        }
    }
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware: Logging HTTP requests
app.use(morgan('combined'));  // Enable this if needed

// Middleware: Parse JSON payloads
app.use(express.json());
// middleware: parse post form data
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'logos', 'favicon.ico')));

// Routes
app.use('/api', aircraftRoutes);
app.use('/', pagesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/logs', (req, res) => {
    // Access the log stream from morgan
    const logStream = morgan.token('combined', (req, res) => {
        // Format the log message as desired
        return `${req.method} ${req.url} - ${res.statusCode} - ${req.headers['user-agent']}`;
    })(req, res, () => {});

    // Create a response stream and pipe the log stream to it
    const responseStream = res.writeHead(200, { 'Content-Type': 'text/plain' });
    logStream.pipe(responseStream);
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start the server:', err);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});
