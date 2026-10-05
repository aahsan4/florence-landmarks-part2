import { pool } from './database.js';
import landmarks from './data.js';

const createTableQuery = `
  DROP TABLE IF EXISTS landmarks;

  CREATE TABLE landmarks (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    architect VARCHAR(255) NOT NULL,
    built VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    medici_connection TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
  );
`;

const insertQuery = `
  INSERT INTO landmarks
    (slug, name, category, architect, built, neighborhood, description, medici_connection, image)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
`;

async function reset() {
  try {
    await pool.query(createTableQuery);
    console.log('✅ landmarks table created');

    for (const l of landmarks) {
      await pool.query(insertQuery, [
        l.slug, l.name, l.category, l.architect, l.built,
        l.neighborhood, l.description, l.mediciConnection, l.image
      ]);
      console.log(`✅ added ${l.name}`);
    }
  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
  } finally {
    await pool.end();
  }
}

reset();