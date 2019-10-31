import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class QuestionAnsweredMail {
  get key() {
    return 'QuestionAnsweredMail';
  }

  async handle({ data }) {
    const { helpOrder, student } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua pergunta foi respondida',
      template: 'questionAnswered',
      context: {
        name: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        date: format(
          parseISO(helpOrder.answered_at),
          "dd' de 'MMMM' de 'yyyy' às 'HH':'mm",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new QuestionAnsweredMail();
