import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { student, plan, registration } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Cancelamento de matrícula',
      template: 'cancelation',
      context: {
        name: student.name,
        title: plan.title,
        date: format(
          parseISO(registration.canceled_at),
          "dd' de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
