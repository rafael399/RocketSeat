import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter } from 'date-fns';

import Student from './Student';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
        canceled_at: Sequelize.DATE,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
        student_name: {
          type: Sequelize.VIRTUAL(Sequelize.STRING, [
            'student_id',
          ]),
          get() {
            return (
              await Student.findByPk('student_id').name
            )
          }
        }
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Registration;
