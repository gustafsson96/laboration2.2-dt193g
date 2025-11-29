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

    // Connect to Postgres database here

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: async () => {
                const res = await pool.query('SELECT * FROM movies');
                return res.rows;
            }
        },
        {
            method: 'POST',
            path: '/movies',
            handler: async (request, h) => {
                const { title, year, genre, length } = request.payload;

                try {
                    const result = await pool.query(
                        'INSERT INTO movies (title, year, genre, length) VALUES ($1, $2, $3, $4) RETURNING *',
                        [title, year, genre, length]
                    );

                    return h.response(result.rows[0]).code(201);

                } catch (err) {
                    console.error(err);
                    return h.response({ error: 'Failed to add movie' }).code(500);
                }
            }
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();