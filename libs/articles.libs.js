const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createArticle: async (title, body, user_id) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: user_id } });
      if (!user) throw 'user tidak ditemukan';

      const article = await prisma.articles.create({
        data: {
          title,
          body,
          user_id,
        },
      });
      return article;
    } catch (err) {
      throw err;
    }
  },
  getAllArticles: async (user_id, title, body) => {
    try {
      let AllArticles = await prisma.articles.findMany({});
      return AllArticles;
    } catch (err) {
      throw err;
    }
  },
  getArticleById: async (id) => {
    try {
      const article = await prisma.articles.findUnique({ where: { id: Number(id) } });
      if (!article) throw 'article tidak ditemukan';
      return article;
    } catch (error) {
      throw error;
    }
  },
  getUpdate: async (id, user_id, title, body) => {
    try {
      const updateArticle = await prisma.articles.update({
        where: { id },
        data: { user_id, title, body },
      });

      return updateArticle;
    } catch (err) {
      throw err;
    }
  },
  deleteArticle: (id) => {
    try {
      const article = prisma.articles.delete({ where: { id: Number(id) } });
      return article;
    } catch (error) {
      throw error;
    }
  },
};
