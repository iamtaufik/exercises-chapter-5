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
};
