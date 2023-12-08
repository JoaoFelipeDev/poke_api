import express, { Request, Response } from 'express';
import "express-async-errors";
import  {routes} from '../src/routes'

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(routes);
app.listen(3000, () => console.log('Server is running'));