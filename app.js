const express = require('express');
const path = require('path');
const aircraftRoutes = require('./routes/aircraftRoutes');
const favicon = require('serve-favicon');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', aircraftRoutes);
app.use(express.static(path.join(__dirname, 'public')))
// Serve favicon from the public directory
app.use(favicon(path.join(__dirname, 'public', 'logos', 'favicon.ico')));

app.listen(port, (err) => {
    if (err){
        console.log(err);
    }
    else{
        console.log(`Server is running on port http://localhost:${port}`);
    }
});
