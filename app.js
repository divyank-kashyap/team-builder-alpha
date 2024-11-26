const express = require("express");
const app = express();
const port = 3000;

// Import database connection and API routes
const connectDB = require("./config/db");
const teamRoutes = require("./routes/teamRoutes");  // Ensure this is correct

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use("/api", teamRoutes);  // Make sure this is correct

//app.use("middleware testing");


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


