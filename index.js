const pool = require('./database');
const { createToken } = require('./jwtOperations');

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { document } = event;
    const finalDocument = document || "12345678909";
    const sql = 'SELECT * FROM client WHERE document = ?';

    pool.query(sql, [finalDocument], (err, results) => {
        if (err) {
            callback(null, {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            });
            return;
        }

        if (results && results.length > 0) {
            const user = results[0];
            const token = createToken(user.name, user.id);
            callback(null, {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
        } else {
            callback(null, {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: "User not found" })
            });
        }
    });
};
