"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Rutas de mi app
server.app.use('/user', user_1.default);
server.app.use('/posts', post_1.default);
//conectar BD
server.start(() => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/fotosgram2', { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
        if (err)
            throw err;
        console.log('Base de datos ONLINE2');
    });
});
//levantar express
console.log(`Servidor corriendo en puerto ${server.port}`);
