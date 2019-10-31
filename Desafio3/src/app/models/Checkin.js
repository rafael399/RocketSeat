import Sequelize, { Model } from 'sequelize';
import { /* subDays, startOfDay, */ format } from 'date-fns';
import pt from 'date-fns/locale/pt';

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        formated_date: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(
              this.created_at,
              "dd' de 'MMMM' de 'yyyy' às 'HH':'mm",
              {
                locale: pt,
              }
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Checkin;
