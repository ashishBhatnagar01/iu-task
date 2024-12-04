"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const dotenv_1 = require("dotenv");
const db_1 = require("./db");
const tag_route_1 = __importDefault(require("./routes/tag.route"));
const app = (0, express_1.default)();
//Middleware to parse JSON
app.use(express_1.default.json());
//Enable to access enviroment variable
(0, dotenv_1.configDotenv)();
//Coonnect to DB
(0, db_1.connectToDB)();
app.use("/api/post", post_route_1.default);
app.use("/api/tag", tag_route_1.default);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`App is running on PORT : ${PORT}`);
});
