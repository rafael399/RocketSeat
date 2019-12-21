import Student from '../models/Student';

class StudentLoginController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    return res.json(student);
  }
}

export default new StudentLoginController();
