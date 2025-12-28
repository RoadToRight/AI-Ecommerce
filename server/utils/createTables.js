
import { createUserTable } from "../models/userTable.js";
import { createCollectionTable } from "../models/collectionTable.js";
import { createProductsTable } from "../models/productTable.js";
import { createProductReviews } from "../models/productReviewsTable.js";
import { createOrdersTable } from "../models/ordersTable.js";
import { createOrderItemTable } from "../models/orderItemsTable.js";
import { createShippingInfoTable } from "../models/shippingInfoTable.js";
import { createPaymentTable } from "../models/paymentsTable.js";
import { createProductCollectionsTable } from "../models/JunctionsTables/Product+Collection.js";

export const createTables = async () => {
    try {
        // ⚠️ ORDER MATTERS
        await createUserTable();
        await createCollectionTable();
        await createProductsTable();
        await createProductCollectionsTable();
        await createProductReviews();
        await createOrdersTable();
        await createOrderItemTable();
        await createShippingInfoTable();
        await createPaymentTable();

        // 👇 MUST BE LAST: triggers & initial population

        console.log("All tables and triggers created successfully");
    } catch (error) {
        console.error("Error creating tables:", error);
        process.exit(1);
    }
};
