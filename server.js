require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//let's tackle cors
const corsOptions = {
    origin: ["https://prayas75-2-0-client.onrender.com" , "http://localhost:5173"],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

//Mount the Router: To use the router in your main express app, you can mount it at a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// let's define the admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);


const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
});
