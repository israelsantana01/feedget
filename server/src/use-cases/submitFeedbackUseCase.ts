import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksReposity";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string; 
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) { }
  
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div stype="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        `</div>`
      ].join('\n')
    });
  }
}