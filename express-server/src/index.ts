import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
// import dotenv from 'dotenv';
import router from "./routes";
import path from "path";

// dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/", router());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);

server.listen(2000, () => {
  console.log("Server is running on http://localhost:2000/");
});

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://wildgoose:mernapp@mernproject.hceq3ru.mongodb.net/mern"
);
mongoose.connection.on("error", (error) => console.error(error));
