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
        connectSrc: [
          "'self'",
          'https://sketchfab.com',
          'blob:',
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
        ],
        imgSrc: ["'self'", 'blob:', 'data:', 'https://*.sketchfab.com'],
        mediaSrc: ["'self'", 'blob:'],
        frameSrc: ["'self'", 'https://sketchfab.com'],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com',
          'https://cdn.jsdelivr.net',
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://sketchfab.com',
          'https://static.cloudflareinsights.com',
          'https://ajax.googleapis.com', // For model-viewer if needed from CDN
        ],
        objectSrc: ["'none'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdn.jsdelivr.net',
        ],
        connectSrc: [
          "'self'",
          'https://sketchfab.com',
          'blob:',
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
          'https://cdn.jsdelivr.net',
        ],
        frameAncestors: ["'none'"],
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
  }),
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
  }),
);

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'logos', 'logo.svg')));

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
