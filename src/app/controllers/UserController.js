import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
  '';
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(3).required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const userExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExists) {
        throw Error('A user with same email already been taken.');
      }
    } catch (err) {
      const errors = err.name === 'ValidationError' ? err.errors : err.message;

      return res.status(400).json(errors);
    }

    const { id, email } = await User.create(req.body);

    return res.status(201).json({ id, email });
  }

  async login(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(3).required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json(err.errors);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.json({ error: 'User not found.' });
    }

    if (!(await bcrypt.compare(`${password}`, user.password_hash))) {
      return res.json(['Email or password was is invalid.']);
    }

    const { id } = user;

    const token = await jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ user: { id, email }, token });
  }
}

export default new UserController();
