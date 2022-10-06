import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorMiddleware';
import router from './routes/routes';
import azureBlobUtils from './Utils/azureBlobUtils';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

azureBlobUtils.blobConfig();

export default app;

