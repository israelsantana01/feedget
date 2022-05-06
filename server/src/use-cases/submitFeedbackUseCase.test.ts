import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example',
      screenshot: 'data:image/png;base64,test.png'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  
  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Example',
      screenshot: 'data:image/png;base64,wndiwidnwudnwidnwuidwdown'
    })).rejects.toThrow();
  });
  
  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,wndiwidnwudnwidnwuidwdown'
    })).rejects.toThrow();
  });
  
  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'ta tudo bugado!!',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  });
});