const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const path = require("path");

const app = express();

connectDB();

if (process.env.NODE_ENV === "production") {
  //*Set static folder up in production
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/cats", require("./routes/catRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/img", require("./routes/uploadRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
