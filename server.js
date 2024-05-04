const express = require('express');
const html_routes = require('./routes/html-routes');
const api_routes = require('./routes/api-routes');
const PORT = process.env.PORT || 3001;
const app = express();

const uuid = require('uuid');
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Use apiRoutes
app.use(api_routes);
app.use(html_routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}!`);
});