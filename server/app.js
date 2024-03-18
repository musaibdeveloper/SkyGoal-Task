import config from "config";
import express from "express";
import "./utils/dbConnect.js";

// Import Public Route.
import publicRouter from "./controllers/root.js";


// Import User Route. 
import UserRouter from "./controllers/Users/index.js";


// Create a Express Application. 
const app = express();
const PORT = config.get("PORT") || 5000;


// Middleware to parse JSON requests
app.use(express.json())


app.get("/", (req, res) => {
    res.send("There you GO 🙂")
})

// Public Route
app.use("/user" , publicRouter)

// Route Accessing
app.use("/user", UserRouter);


// Error Handler : 
app.use((req, res, next) => {
    res.status(404).json({ msg: "Route is not found" })
})

// Start the Server

app.listen(PORT, () => {
    console.log(`http://localhost:5000/`);
})
