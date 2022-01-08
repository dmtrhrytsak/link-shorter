import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import config from 'config';

import User from '../models/User.js';

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Min length: 6').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data when registering',
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'User has been created' });
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong...',
      });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Enter the password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            errors: errors.array(),
            message: 'Incorrect data when logging',
          });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User wasn't found" });
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        return res
          .status(400)
          .json({ message: 'Incorrect password. Please, try again!' });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        }
      );

      res.status(200).json({
        token,
        userId: user.id,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong...',
      });
    }
  }
);

export default router;
