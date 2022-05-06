import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbackRepository';
import { SubmitFeedbackUseCase } from './use-cases/submitFeedbackUseCase';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const sumitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter);

  await sumitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  res.status(201).send();
});
