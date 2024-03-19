import config from "config";
import express from "express";
import "./utils/dbConnect.js";

// Import Public Route.
import publicRouter from "./controllers/root.js";

// Import Middleware function.
import AuthMiddleware from "./middleware/authmiddleware.js";

// Import User Route.
import UserRouter from "./controllers/Users/index.js";

// Create a Express Application.
const app = express();
const PORT = config.get("PORT") || 5000;

// Middleware to parse JSON requests. It's used to receive the request from the client side.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("There you GO 🙂");
});

// Public Route
app.use("/user", publicRouter);

// Auth Use.
app.use(AuthMiddleware);

//  Private Route
app.use("/user", UserRouter);

// Error Handler :
app.use((req, res) => {
  res.status(404).json({ msg: "Route is not found" });
});

// Start the Server

app.listen(PORT, () => {
  console.log(`http://localhost:5000/`);
});
