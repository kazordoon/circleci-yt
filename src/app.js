import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json({ hello: 'world' }));

app.set('PORT', process.env.PORT || 3333);
app.set('HOST', process.env.HOST || 'localhost');

export default app;
