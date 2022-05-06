import { FeedbackCreateData, FeedbacksRepository } from '../feedbacksReposity';
import { prisma } from '../../prisma';


export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedBack.create({
      data: {
        type,
        comment,
        screenshot,
      }
    });
  };
}