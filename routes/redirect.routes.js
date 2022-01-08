import { Router } from 'express';
import Link from '../models/Link.js';

const router = Router();

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });

    if (!link) {
      res.status(404).json({ message: "Link wasn't found" });
    }

    link.clicks++;
    await link.save();
    res.redirect(link.from);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong...',
    });
  }
});

export default router;
