export const addUser = [
    {
        MainHead: "Add User",
        fields: [
            { label: "Name", type: "text", name: "name", required: true, placeholder: "John" },
            { label: "Email address", type: "email", name: "email", required: true, placeholder: "john@dashdark.com" },
            { label: "Password", type: "password", name: "password", required: true, placeholder: "Password" },
            {
                label: "Role",
                type: "select",
                name: "role",
                options: [{ label: "User", value: "User" }, { label: "Admin", value: "Admin" }]
            },
        ]
    }
];
