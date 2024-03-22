import express  from 'express';
import  dotenv   from 'dotenv';
import { connectDB } from './db/connectDB.js';

const app = express();
dotenv.config({path:'./.env'})

connectDB(process.env.MONGODB_URI);

const port = process.env.PORT || 4000;

const server = app.listen(port,()=>{
 console.log("✌ Listening at ",port);
});

