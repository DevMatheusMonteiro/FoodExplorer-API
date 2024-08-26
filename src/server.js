require("express-async-errors");
require("dotenv/config.js");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");
const { UPLOAD_FOLDER } = require("./configs/upload");
const cors = require("cors");

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://main--food-explorer-delivery27.netlify.app/",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/file", express.static(UPLOAD_FOLDER));

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
