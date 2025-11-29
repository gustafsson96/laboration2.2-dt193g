const pool = require('../db');

module.exports = [
    // Get all movies
    {
        method: 'GET',
        path: '/',
        handler: async () => {
            const res = await pool.query('SELECT * FROM movies');
            return res.rows;
        }
    },
    // Add a new movie
    {
        method: 'POST',
        path: '/movies',
        handler: async (request, h) => {
            const { title, year, genre, length, watched } = request.payload;

            try {
                const result = await pool.query(
                    'INSERT INTO movies (title, year, genre, length, watched) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [title, year, genre, length, watched]
                );

                return h.response(result.rows[0]).code(201);

            } catch (err) {
                console.error(err);
                return h.response({ error: 'Failed to add movie' }).code(500);
            }
        }
    },
    // Update an existing movie
    {
        method: 'PUT',
        path: '/movies/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const { title, year, genre, length, watched } = request.payload;

            // Simple validation
            if (!title || !year || !genre || !length || watched === undefined) {
                return h.response({ error: 'Missing required fields' }).code(400);
            }

            try {
                const result = await pool.query(
                    `UPDATE movies
                        SET title = $1, year = $2, genre = $3, length = $4, watched = $5
                        WHERE id = $6
                        RETURNING *`,
                    [title, year, genre, length, watched, id]
                );

                if (result.rowCount === 0) {
                    return h.response({ error: 'Movie not found' }).code(404);
                }

                return h.response(result.rows[0]).code(200);

            } catch (err) {
                console.error(err);
                return h.response({ error: 'Failed to update movie' }).code(500);
            }
        }
    },
    // Delete a movie
    {
        method: 'DELETE',
        path: '/movies/{id}',
        handler: async (request, h) => {
            const { id } = request.params;

            try {
                const result = await pool.query(
                    'DELETE FROM movies WHERE id = $1 RETURNING *',
                    [id]
                );

                if (result.rowCount === 0) {
                    return h.response({ error: 'Movie not found' }).code(404);
                }

                return h.response(result.rows[0]).code(200);

            } catch (err) {
                console.error(err);
                return h.response({ error: 'Failed to delete movie' }).code(500);
            }
        }
    }
];
