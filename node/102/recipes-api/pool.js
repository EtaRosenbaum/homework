import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user:process.env.SQL_USER,
    password: process.env.SQL_PWD,
    database: 'nodeuser',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 6000,
    queueLimit:0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

export default pool;