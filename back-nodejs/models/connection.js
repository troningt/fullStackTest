import mongoose from "mongoose";
import configuration from "../config/configuration.js";
const config = configuration
import chalk from "chalk";
const { green } = chalk.green;

mongoose.connect(config.get("mongodbURL"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// validate MongoDB connection
const db = mongoose.connection;

// events
db.on("error", (e) => {
  console.log("MongoDB connection error");
  process.exit(0);
});

db.once("open", function (callback) {
  console.log(
    `${green("✓")} Connected to ${green("MongoDB")} Store`
  );
});

export const mongoConnection = db;