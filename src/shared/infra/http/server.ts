import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.listen(3000, () => console.log('Server is running 🏆'))