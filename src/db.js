import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
    user: 'postgress',
    host: 'localhost',
    database: 'newdb',
    password: 'jenu123',
    port: 5432,
  });

  export default db;
