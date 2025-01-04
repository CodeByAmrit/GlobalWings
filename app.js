const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const aircraftRoutes = require('./routes/aircraftRoutes');
const pagesRoutes = require('./routes/pagesRoutes');

const app = express();
const port = process.env.PORT || 8001;

app.disable('x-powered-by');

// Middleware: Set security headers using Helmet
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'", "https://sketchfab.com", "blob:"],
                imgSrc: ["'self'", "blob:", "data:"], // Restrict image sources
                mediaSrc: ["'self'", "blob:"], // Restrict media sources
                frameSrc: ["'self'", "https://sketchfab.com"], // Allow embedding from trusted sites only
                scriptSrc: [
                    "'self'",
                    "https://sketchfab.com",
                    "https://static.cloudflareinsights.com",
                    "https://globalwings.codebyamrit.co.in"
                ],
                objectSrc: ["'none'"], // Prevent the use of <object>, <embed>, or <applet> elements
                styleSrc: ["'self'", "'unsafe-inline'"], // Consider external stylesheets over inline ones
                frameAncestors: ["'none'"], // Prevent the page from being embedded in frames
            },
        },
        referrerPolicy: { policy: 'no-referrer' },
        frameguard: { action: 'deny' },
        hidePoweredBy: true,
        hsts: true,
        ieNoOpen: true,
        noSniff: true,
        xssFilter: true,
        // Permissions-Policy: Disable unused features globally
        permissionsPolicy: {
            features: {
                geolocation: [],
                camera: [],
                microphone: [],
                fullscreen: [],
                payment: [],
            },
        },
    })
);

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware: Log HTTP requests
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Middleware: Parse JSON payloads and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory with cache control
app.use(
    express.static(path.join(__dirname, 'public'), {
        maxAge: '1d',
        setHeaders: (res, filePath) => {
            if (filePath.endsWith('.html')) {
                res.setHeader('Cache-Control', 'no-cache');
            }
        },
    })
);

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'logos', 'favicon.ico')));

// Routes
app.use('/api', aircraftRoutes);
app.use('/', pagesRoutes);
app.use('/others', pagesRoutes);
app.use('/search', pagesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Logs endpoint
app.get('/logs', (req, res) => {
    res.status(200).send('Logs functionality is under development.');
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start the server:', err);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});
