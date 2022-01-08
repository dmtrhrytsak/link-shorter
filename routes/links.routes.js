import { Router } from 'express';
import config from 'config';
import shortid from 'shortid';

import Link from '../models/Link.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong...',
    });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong...',
    });
  }
});

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.status(200).json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong...',
    });
  }
});

export default router;
