'use strict';

const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');
require('dotenv').config();

/*
Local development configuration, commented out for production
const pool = new Pool({
    user: 'juliagustafsson',
    host: 'localhost',
    database: 'movies_db',
    password: '',
    port: 5432,
});
*/

// .env production configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

// Create and initiate a Hapi server
const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    // Import and register routes
    const movieRoutes = require('./routes/movieRoutes')(pool);
    server.route(movieRoutes);

    // Start the hapi server
    await server.start();
    console.log('Server running on %s', server.info.uri);
}

// Run the function to start the server
init();