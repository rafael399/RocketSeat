import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import QuestionAnsweredMail from '../jobs/QuestionAnsweredMail';

class AdmHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      attributes: ['id', 'student_id', 'question', 'created_at'],
      order: ['id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(id);

    if (!helpOrder) {
      return res
        .status(401)
        .json({ error: 'A help order with the given ID does not exist' });
    }

    if (helpOrder.answer) {
      return res
        .status(401)
        .json({ error: 'This question was already answered.' });
    }

    const { student_id, question } = await helpOrder.update({
      answer,
      answered_at: new Date(),
    });

    const student = await Student.findByPk(student_id);

    await Queue.add(QuestionAnsweredMail.key, {
      student,
      helpOrder,
    });

    return res.json({
      id,
      student_id,
      question,
      answer,
    });
  }
}

export default new AdmHelpOrderController();
