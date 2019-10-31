import { Op } from 'sequelize';
import { subDays, startOfDay /* format */ } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;

    const checkins = await Checkin.findAll({
      where: { student_id },
      attributes: ['id', 'student_id', 'created_at', 'formated_date'],
      order: ['id'],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: 'A student with the given ID does not exist' });
    }

    const actualDate = startOfDay(new Date()); // Today's date
    const lastDayToCount = subDays(actualDate, 7); // First day of the 7 days period to count the check-ins

    const checkins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.gt]: lastDayToCount,
        },
      },
    });

    if (checkins.length >= 5) {
      return res.status(401).json({
        error: 'The student can only checkin 5 times in a 7 days period.',
      });
    }

    const { id, created_at } = await Checkin.create({ student_id });

    return res.json({
      id,
      student_id,
      created_at,
    });
  }
}

export default new CheckinController();
