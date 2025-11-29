'use strict';

const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');

// require('dotenv').config();

const pool = new Pool({
    user: 'juliagustafsson',
    host: 'localhost',
    database: 'movies_db',
    password: '',
    port: 5432,
})

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });

    // Import and register routes
    const movieRoutes = require('./routes/movieRoutes');
    server.route(movieRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();