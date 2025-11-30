import database from "../database/db";

export async function createShippingInfoTable() {
    try {
        const query = `CREATE TABLE IF NOT EXISTS reviews(
           id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
           product_id UUID NOT NULL,
           user_id UUID NOT NULL,
           ratings DECIMAL(2,1) NOT NULL DEFAULT 0 CHECK (ratings BETWEEN 0 AND 5),
           comment TEXT NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`
        await database.query(query);
    } catch (error) {
        console.error("Error in creating Shipping Info table:", error);
        process.exit(1);
    }
}