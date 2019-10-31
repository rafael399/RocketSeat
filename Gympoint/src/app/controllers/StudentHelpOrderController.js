import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class StudentHelpOrderController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: 'A student with the given ID does not exist' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
      attributes: [
        'id',
        'student_id',
        'question',
        'created_at',
        'answer',
        'answered_at',
      ],
      order: ['id'],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(400)
        .json({ error: 'A student with the given ID does not exist' });
    }

    const { question } = req.body;

    const questionExists = await HelpOrder.findOne({
      where: {
        student_id,
        question,
        answer: null,
      },
    });

    if (questionExists) {
      return res.status(400).json({
        error:
          'This question was already asked, please wait for an answer before trying again',
      });
    }

    const { id, created_at } = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json({
      id,
      student_id,
      created_at,
    });
  }
}

export default new StudentHelpOrderController();
