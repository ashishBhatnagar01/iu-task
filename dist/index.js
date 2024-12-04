"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = require("dotenv");
const db_1 = require("./db");
const tag_route_1 = __importDefault(require("./routes/tag.route"));
const app = (0, express_1.default)();
//Middleware to parse JSON
app.use(express_1.default.json());
(0, dotenv_1.configDotenv)();
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express TypeScript API",
            version: "1.0.0",
            description: "A simple Express API with TypeScript and Swagger",
        },
    },
    apis: ["./src/routes/*.ts"], // Path to your API routes and controller files
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
(0, db_1.connectToDB)();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use("/api/post", post_route_1.default);
app.use("/api/tag", tag_route_1.default);
app.listen(4000, () => {
    console.log("App is running on port 80");
});
