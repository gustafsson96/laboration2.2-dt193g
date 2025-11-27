'use strict';

const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');

// require('dotenv').config();

const pool  = new Pool({
    user: 'juliagustafsson',
    host: 'localhost',
    database: 'movies_db',
    password: '',
    port: 5432,
})

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Connect to Postgres database here

    server.route({
        method: 'GET',
        path: '/',
        handler: async () => {
            const res = await pool.query('SELECT NOW()');
            return res.rows[0];
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();