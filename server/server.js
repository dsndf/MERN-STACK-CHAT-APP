import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import { customErrorHandler } from './middlewares/customErrorHandler.js';
import { errorHandler } from './utils/ErrorHandler.js';


const app = express();
dotenv.config({ path: './.env' })

connectDB(process.env.MONGODB_URI);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log("✌ Listening at ", port);
});
 
app.get('/', async (req, res,next) => {
   next(new errorHandler("ERROR OOPS",400));
})

app.use(customErrorHandler);

