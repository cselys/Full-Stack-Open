import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis';
import paitentRouter from './routes/patient';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
} );

app.use('/api/diagnoses', diagnosisRouter);

app.use('/api/patients', paitentRouter);

app.listen(PORT, () => {
    console.log (`Server is running on port ${PORT}`);
});