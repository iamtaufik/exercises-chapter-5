const { createArticle, getAllArticles, getUpdate, getArticleById, deleteArticle } = require('../libs/articles.libs');

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
  getDetailArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await getArticleById(Number(id));
      res.status(200).json({
        status: true,
        message: 'Article Data Found',
        data: article,
      });
    } catch (err) {
      if (err === 'article tidak ditemukan') return res.status(404).json({ status: false, message: 'article tidak ditemukan' });

      next(err);
    }
  },

  getUpdate: async (req, res, next) => {
    const { id } = req.params;
    try {
      let { user_id, title, body } = req.body;

      try {
        let updateArticle = await getUpdate(Number(id), user_id, title, body);

        return res.status(200).json({
          status: true,
          message: 'Updated Article Successfully',
          data: updateArticle,
        });
      } catch (err) {
        return res.status(404).json({
          status: false,
          message: err,
          data: null,
        });
      }
    } catch (err) {
      return res.status(404).json({
        status: false,
        message: err,
        data: null,
      });
    }
  },
  deleteArticleById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const article = await deleteArticle(id);
      return res.status(200).json({
        status: true,
        message: 'Deleted Article Successfully',
        data: article,
      });
    } catch (err) {
      // console.log(err);
      return res.status(404).json({
        status: false,
        message: 'Article not found',
        data: null,
      });
    }
  },
};
