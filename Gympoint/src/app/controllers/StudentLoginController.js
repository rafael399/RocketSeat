import Student from '../models/Student';

class StudentLoginController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(401)
        .json({ error: 'A student with the given ID does not exist' });
    }

    return res.json(student);
  }
}

export default new StudentLoginController();
