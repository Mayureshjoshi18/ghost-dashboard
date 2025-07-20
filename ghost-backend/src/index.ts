import express from 'express';
import cors from 'cors';
import webhookRouter from './routes/webhook';
import authRoutes from './routes/auth';



const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/webhook', webhookRouter);

app.use('/auth', authRoutes);


app.get('/', (_, res) => {
  res.send('Ghost Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
