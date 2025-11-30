import database from "../database/db";

export async function createShippingInfoTable(){
    try {
        const query = `CREATE TABLE IF NOT EXISTS shipping_info(
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            order_id UUID NOT NULL UNIQUE,
            full_name VARCHAR(50) NOT NULL ,
            state CARCHAR(50) NOT NULL,
            city VARCHAR(50) NOT NULL,
            address TEXT NOT NULL,,
            postalcode VARCHAR(10) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
        )`
        await database.query(query);
    } catch (error) {
         console.error("Error in creating Shipping Info table:", error);
        process.exit(1);
    }
}