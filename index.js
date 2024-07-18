import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './src/utils/errorhandler.js';
import connectDB from './database/dbConnection.js';
import usersRoutes from './src/modules/users/users.routers.js'
import categoriesRoutes from './src/modules/categories/categories.routers.js'
import tasksRoutes from './src/modules/tasks/tasks.routers.js'

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/tasks',tasksRoutes)

app.all('*', (req, res, next) => {
  const error = new Error(`Cannot ${req.method} ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
})

app.use(errorHandler)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
