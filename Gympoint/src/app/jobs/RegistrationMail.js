import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, title, endDate, price, duration } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Bem vindo',
      template: 'registration',
      context: {
        name: student.name,
        title,
        date: format(parseISO(endDate), "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        price: price * duration,
      },
    });
  }
}

export default new RegistrationMail();
