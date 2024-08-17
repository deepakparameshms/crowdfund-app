const express = require("express");
const app = express();
const connectToMongo = require("./db");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow only requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // If you are dealing with cookies or sessions
}));

app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js application!");
});
app.use("/api/auth", require("./Routes/authentication"));
app.use("/api/investor", require("./Routes/investor"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// Connecting to the datbase
connectToMongo();

//Intializing the application
app.listen(5000 || process.env.PORT, () => {
  console.log(`app listening on port ${5000 || process.env.PORT}`);
});
