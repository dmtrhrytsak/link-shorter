import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import path from 'path';

import authRouter from './routes/auth.routes.js';
import linksRouter from './routes/links.routes.js';
import redirectRouter from './routes/redirect.routes.js';

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/links', linksRouter);
app.use('/t', redirectRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (err) {
    console.log('Server Error: ', err.message);
    process.exit(1);
  }
};

start();
