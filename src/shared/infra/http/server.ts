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

const port = 3000

app.listen(port, () => console.log(`Server is running 🏆 at port: ${port}`))