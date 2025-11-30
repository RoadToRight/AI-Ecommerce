import database from "../database/db";

export async function createPaymentTable() {
    try {
        const query = `CREATE TABLE IF NOT EXISTS payments(
            id UUID default gen_random_uuid() PRIMARY KEY,
            order_id UUID NOT NULL UNIQUE,
        )`
        await database.query(query);
    } catch (error) {
        console.error("Error in creating Shipping Info table:", error);
        process.exit(1);
    }
}