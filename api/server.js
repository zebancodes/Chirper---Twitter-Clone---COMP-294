const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;

const authMiddleware = require("./middleware/auth");

app.use(cors());
app.use(express.json());

require("./db_conn");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Import all routes and add
var authRoutes = require("./routes/authRoutes");
var chirpRoutes = require("./routes/chirpRoutes");
var userRoutes = require("./routes/userRoutes");

authRoutes(app);

app.use(authMiddleware);
chirpRoutes(app);
userRoutes(app);
