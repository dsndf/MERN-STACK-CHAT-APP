import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import { customErrorHandler } from './middlewares/customErrorHandler.js';
import { ErrorHandler } from './utils/ErrorHandler.js';
import cookieParser from 'cookie-parser';

process.on("uncaughtException", (err) => {
    console.log("👿 " + err.message);
    process.exit(1);
})

const app = express();
dotenv.config({ path: './.env' })

connectDB(process.env.MONGODB_URI);

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());


const server = app.listen(port, () => {
    console.log("✌ Listening at ", port);
});

app.get('/', async (req, res, next) => {
  next(new ErrorHandler("ERROR OOPS", 400));
})

app.use(customErrorHandler); // added custom error handler as last middleware to use.


process.on("unhandledRejection", (err) => {
    server.close(() => {
        console.log("🤔 Server closed due to " + err.message);
        process.exit(1);
    });
})


