import express from "express";
import mongoose from "mongoose";
import setupRoutes from "./routes/routes.js";

const app = express();
const PORT = 3000;
const dbUrl = "mongodb+srv://admin:admin@cluster0.5mv6z2i.mongodb.net/library_database";
async function start() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Подключение к кластеру Mongodb работает");

        setupRoutes(app);

        app.listen(PORT, () => {
            console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error("В ходе подключения произошла ошибка: ", e);
    }
}

start();