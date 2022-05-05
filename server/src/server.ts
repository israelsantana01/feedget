import express from 'express';
import { prisma } from './prisma';

const app = express();

app.post('feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedBack.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })
  res.status(201).send({ data: feedback });
});

app.listen(3333, () => console.log('Server runnning...'));