import * as Yup from 'yup';
import { Op } from 'sequelize';
import Tool from '../models/Tool';
import Tag from '../models/Tag';

class ToolController {
  async index(req, res) {
    let where = {};

    if (req.query.tag) {
      where = {
        '$tags.description$': {
          [Op.like]: `%${req.query.tag}%`,
        },
      };
    }

    const tools = await Tool.findAll({
      where,
      include: [
        {
          model: Tag,
          attributes: ['description'],
          as: 'tags',
        },
      ],
    }).map(async (tool) => {
      return {
        ...tool.toJSON(),
        tags: await tool.getTags().map((tag) => tag.description),
      };
    });

    return res.json(tools);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      email: Yup.string().email().required(),
      link: Yup.string().url().required(),
      description: Yup.string().required(),
      tags: Yup.array().of(Yup.string()).required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json(err.errors);
    }

    const { tags, ...data } = req.body;

    const tool = await Tool.create(
      {
        ...data,
        tags: tags.map((tag) => ({ description: tag })),
      },
      {
        include: [
          {
            model: Tag,
            as: 'tags',
          },
        ],
      }
    );

    return res.status(201).json({
      ...tool.toJSON(),
      tags,
    });
  }

  async delete(req, res) {
    const tool = await Tool.findByPk(req.params.id);

    if (!tool) {
      return res.status(404).json();
    }

    await tool.destroy();

    return res.status(204).json();
  }
}

export default new ToolController();
