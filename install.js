'use strict';

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'movies_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
});

(async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS movies (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                year INT NOT NULL,
                genre VARCHAR(100) NOT NULL,
                length INT NOT NULL,
                watched BOOLEAN NOT NULL
            )
        `);
        console.log('Table "movies" has been created');
    } catch (err) {
        console.error('Error creating table:', err);
    }
})();