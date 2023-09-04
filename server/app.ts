import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
// import setupMiddleware from './middleware';
import eventRouter  from './routes/events.routes'
import connectDB from './config/db.config';


dotenv.config();

const app: express.Express = express(); // defining the Express app

app.use(express.json()); // to parse JSON bodies into JS objects
app.use(cors()); // enabling CORS for all requests

const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 4000;

// setupMiddleware(app);


connectDB();
app.use('/', [eventRouter]);
const server = app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
