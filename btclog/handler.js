"use strict"

const pg = require('pg');
const pool = new pg.Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.CACERT,
  }
});

module.exports = async (context, callback) => {
  const client = await pool.connect();
  const rows = await client.query('select * from btclog order by timestamp desc limit 120');
  return {rows: rows.rows}
}
