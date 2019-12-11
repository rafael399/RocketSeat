import { Op } from 'sequelize';
import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q } = req.query;

    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      order: ['id'],
      where: {
        name: {
          [Op.like]: `%${q || ''}%`,
        },
      },
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'E-mail is already being used' });
    }

    const { id, name, email, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    if (email && email !== student.email) {
      if (await Student.findOne({ where: { email } })) {
        return res.status(401).json({ error: 'Email is already being used' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      student_id,
      email: student.email, // Shows the user email even if no email was passed in the body
      name,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
