import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class UpdateMail {
  get key() {
    return 'UpdateMail';
  }

  async handle({ data }) {
    const { student, plan, registration, price, duration } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula alterada',
      template: 'update',
      context: {
        name: student.name,
        title: plan.title,
        date: format(
          parseISO(registration.end_date),
          "dd' de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
        price: price * duration,
      },
    });
  }
}

export default new UpdateMail();
