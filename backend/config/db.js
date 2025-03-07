import pkg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const db = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'schoolDB',
    port: process.env.DB_PORT || 5432, 
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false 
});

const testConnection = async () => {
    try {
        const client = await db.connect();
        console.log("PostgreSQL Connected...");
        client.release();
    } catch (err) {
        console.error("Error connecting to PostgreSQL:", err.message);
    }
};

testConnection();

export default db;