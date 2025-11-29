'use strict';

const { Pool } = require('pg');
require('dotenv').config();

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'movies_db',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
});

// Create the "movies" table if it doesn't exist
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