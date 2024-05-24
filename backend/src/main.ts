import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express from 'express';
import mongoose from 'mongoose';
import boardRouter from './router/boardRouter';
import taskRouter from './router/taskRouter';
import cors from 'cors';

dotenvExpand.expand(dotenv.config())

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
}));
app.use(boardRouter);
app.use(taskRouter);

const startServer = async () => {
  await mongoose.connect(process.env.DB_URL as string);
  app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT = ${process.env.PORT}`)
  });
}

startServer();
