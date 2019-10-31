import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['id'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const PlanExists = await Plan.findOne({
      where: {
        title: req.body.title,
        duration: req.body.duration,
        price: req.body.price,
      },
    });

    if (PlanExists) {
      return res.status(400).json({ error: 'This plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res
        .status(401)
        .json({ error: 'A plan with this ID does not exist' });
    }

    const PlanExists = await Plan.findOne({
      where: {
        title: req.body.title ? req.body.title : plan.title,
        duration: req.body.duration ? req.body.duration : plan.duration,
        price: req.body.price ? req.body.price : plan.duration,
      },
    });

    if (PlanExists) {
      return res.status(400).json({ error: 'A plan like this already exists' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res
        .status(401)
        .json({ error: 'A plan with this ID does not exist' });
    }

    await plan.destroy();

    return res.status(200).json({ ok: 'Plan was deleted' });
  }
}

export default new PlanController();
