const Joi = require('joi');

// Movie routes for full CRUD functionality
module.exports = (pool) => [
    // Root route
    {
        method: 'GET',
        path: '/',
        handler: () => 'Welcome to the movies API for laboration 2.2 :-)'
    },
    // Get all movies
    {
        method: 'GET',
        path: '/movies',
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
        },
        // Joi POST validation
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).max(255).required(),
                    year: Joi.number().integer().min(1888).max(new Date().getFullYear()).required(),
                    genre: Joi.string().min(1).max(100).required(),
                    length: Joi.number().integer().min(1).required(),
                    watched: Joi.boolean().required()
                })
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
        },
        // Joi PUT validation
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).max(255).required(),
                    year: Joi.number().integer().min(1888).max(new Date().getFullYear()).required(),
                    genre: Joi.string().min(1).max(100).required(),
                    length: Joi.number().integer().min(1).required(),
                    watched: Joi.boolean().required()
                })
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
        },
        // Joi DELETE validation
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        }
    }
];
