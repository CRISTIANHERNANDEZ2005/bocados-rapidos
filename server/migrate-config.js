
require('dotenv').config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  count: Infinity,
  // This is important for Neon.tech
  ssl: {
    rejectUnauthorized: false
  }
};
