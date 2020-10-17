const pg = require('pg');

// setup pg to connect with the database
const Pool = pg.Pool;
const pool = new Pool({
    database: 'to_do_app',          // name of db
    host: 'localhost',          // where is the database
    port: 5432,                 // port for db, 5432 is standard for postgres
    max: 10,                    // max connections (queries) at one time
    idleTimeoutMillis: 10000    // seconds to try to connect, then cancel
});

pool.on('connect', () => {
    console.log('Postgresql connected');
    
});

pool.on('error', (error) => {
    console.log('error with Postgresql pool', error);
    
});

module.exports = pool;