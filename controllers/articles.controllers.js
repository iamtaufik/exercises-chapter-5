const { createArticle, getAllArticles } = require('../libs/articles.libs');

module.exports = {
  createArticle: async (req, res, next) => {
    try {
      const { title, body, user_id } = req.body;

      if (!title || !body) return res.status(400).json({ status: false, message: 'data tidak lengkap' });

      const article = await createArticle(title, body, Number(user_id));
      res.status(201).json({
        status: true,
        message: 'article berhasil dibuat',
        data: article,
      });
    } catch (err) {
      if (err === 'user tidak ditemukan') {
        res.status(404).json({
          status: false,
          message: err,
        });
      } else {
        // console.log(err);
        next(err);
      }
    }
  },
  getAllArticles: async (req, res, next) => {
    try {
      const articles = await getAllArticles();
      res.status(200).json({
        status: true,
        message: 'All Article Data Found',
        data: articles,
      });
    } catch (err) {
      next(err);
    }
  },
};
