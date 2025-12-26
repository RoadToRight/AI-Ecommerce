export const addProduct = [
    {
        MainHead: "Add Product",
        fields: [
            { label: "Name", type: "text", name: "name", required: true, placeholder: "Product Name" },
            { label: "Description", type: "text", name: "description", required: true, placeholder: "Explain Product" },
            { label: "Price", type: "number", name: "price", required: true, placeholder: "Product Price" },
            { label: "Stock", type: "number", name: "stock", required: true, placeholder: "Available" },
            {
                label: "Role",
                type: "select",
                name: "role",
                options: [{ label: "User", value: "User" }, { label: "Admin", value: "Admin" }]
            },
        ]
    }
];
