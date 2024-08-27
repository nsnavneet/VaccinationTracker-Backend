const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Cr_vaccine',
  password: '0007',
  port: 5432,
});

module.exports = pool;
