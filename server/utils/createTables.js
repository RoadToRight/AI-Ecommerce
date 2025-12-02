import { createOrderItemTable } from "../models/orderItemsTable.js";
import { createOrdersTable } from "../models/ordersTable.js"
import { createPaymentTable } from "../models/paymentsTable.js";
import { createProductReviews } from "../models/productReviewsTable.js";
import { createProductsTable } from "../models/productTable.js";
import { createShippingInfoTable } from "../models/shippingInfoTable.js";
import { createUserTable } from "../models/userTable.js";


export const createTables = async () => {
    try {
        await createUserTable();
        await createProductsTable();
        await createProductReviews();
        await createOrdersTable();
        await createOrderItemTable();
        await createShippingInfoTable();
        await createPaymentTable();

        console.log("All tables Created Suceessfully")
    } catch (error) {
        
    }
}