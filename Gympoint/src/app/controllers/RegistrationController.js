/* eslint-disable camelcase */
import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
  parseISO,
  isBefore,
  endOfDay,
  startOfDay,
  isValid,
  addMonths,
} from 'date-fns';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
import RegistrationMail from '../jobs/RegistrationMail';
import UpdateMail from '../jobs/UpdateMail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'canceled_at',
        'active',
      ],
      order: ['id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res
        .status(401)
        .json({ error: 'A student with the given ID does not exist' });
    }

    const isRegistered = await Registration.findOne({
      where: {
        student_id: student.id,
        end_date: {
          [Op.gt]: new Date(),
        },
        canceled_at: null,
      },
    });

    if (isRegistered) {
      return res
        .status(401)
        .json({ error: 'This student already have an active registration' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res
        .status(401)
        .json({ error: 'A plan with the given ID does not exist' });
    }

    const dateStart = endOfDay(parseISO(start_date)); // Uses endOfDay() so the adm can register students to start in the same day

    if (!isValid(dateStart)) {
      return res.status(400).json({
        error: 'Failed to validate the Date. Please use the format: YYYY-MM-DD',
      });
    }

    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    const { duration, price, title } = plan;

    const endDate = endOfDay(addMonths(dateStart, duration));

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: startOfDay(dateStart), // Uses startOfDay() so the student access is granted right away
      end_date: endDate,
      price: price * duration,
    });

    await Queue.add(RegistrationMail.key, {
      student,
      title,
      endDate,
      price,
      duration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().integer(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res
        .status(401)
        .json({ error: 'A registration with the given ID does not exist' });
    }

    if (registration.canceled_at !== null) {
      return res
        .status(401)
        .json({ error: "You can't change a canceled registration" });
    }

    const { plan_id, start_date } = req.body;

    if (!plan_id && !start_date) {
      return res.status(400).json({ erro: "There's no value to be updated" });
    }

    const plan = plan_id
      ? await Plan.findByPk(plan_id)
      : await Plan.findByPk(registration.plan_id);

    if (plan_id && !plan) {
      return res
        .status(401)
        .json({ error: 'A plan with the given ID does not exist' });
    }

    const dateStart = endOfDay(parseISO(start_date)); // Uses endOfDay() so the adm can register students to start in the same day

    if (start_date && !isValid(dateStart)) {
      return res.status(400).json({
        error: 'Failed to validate the Date. Please use the format: YYYY-MM-DD',
      });
    }

    if (start_date && isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    const { duration, price } = plan;

    await registration.update({
      plan_id: plan_id || registration.plan_id,
      start_date: start_date ? startOfDay(dateStart) : registration.start_date, // Uses startOfDay() so the student access is granted right away
      end_date: start_date
        ? addMonths(dateStart, duration)
        : endOfDay(addMonths(registration.start_date, duration)),
      price: price * duration,
    });

    const student = await Student.findByPk(registration.student_id);

    await Queue.add(UpdateMail.key, {
      student,
      plan,
      registration,
      price,
      duration,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res
        .status(401)
        .json({ error: 'A registration with the given ID does not exist' });
    }

    if (registration.canceled_at !== null) {
      return res
        .status(401)
        .json({ error: 'This registration is already canceled' });
    }

    if (isBefore(registration.end_date, new Date())) {
      return res
        .status(401)
        .json({ error: "You can't cancel an inactive registration" });
    }

    const student = await Student.findByPk(registration.student_id);

    const plan = await Plan.findByPk(registration.plan_id);

    registration.canceled_at = new Date();

    await registration.save();

    await Queue.add(CancellationMail.key, {
      student,
      plan,
      registration,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
