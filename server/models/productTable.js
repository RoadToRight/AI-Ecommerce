// databaseSetup.js
import database from "../database/db.js";

// 1️⃣ Create Products Table
export async function createProductsTable() {
    try {
        const query = `
         CREATE TABLE IF NOT EXISTS products(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    images JSON DEFAULT '[]'::JSONB,
    created_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    slug VARCHAR(100) NOT NULL UNIQUE ,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);
`;
        await database.query(query);
        console.log("Products table created.");
    } catch (error) {
        console.error("Error creating products table:", error);
        process.exit(1);
    }
}