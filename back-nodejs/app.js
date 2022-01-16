import express from "express";
import session from "express-session";
//import redis from "redis";
import connectRedis from "connect-redis";
const redisStore = connectRedis(session);
import nconf from 'nconf';
import ejs from "ejs";
import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser;
import chalk from "chalk";
const {green, red} = chalk;
import { join } from "path";
import config from "./config/configuration.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {default as routeStatic} from "./routes/static.js";
import {default as routeUsers} from "./routes/users.js";

import redis from "ioredis";
const redisClient = redis.createClient({host:'127.0.0.1',port:6379,username:'',password:''});

redisClient.on('connect',() => {
  console.log(`${green("✓")} Connected to ${green("Redis")} Session Store`);
})

redisClient.on('error',(error) => {
  console.log(`${red("X")} Error in connection to ${red("Redis")} Session Store`);
})

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

// session store
app.use(
  session({
    secret: nconf.get("sessionSecret"),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
  })
);

// set static path
app.set("views", join(__dirname, "/views"));
app.engine("html", ejs.renderFile);

// routes
app.use("/", routeStatic);
app.use("/users", routeUsers);

// start the app
app.listen(nconf.get("port") || 3000);
console.log("App Started...");