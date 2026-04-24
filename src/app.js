import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import appRoutes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Server is up and running...');
});

app.use('/api/v1/app', appRoutes);

export default app;
