const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllArticles: async (user_id, title, body) => {
    try {
      let AllArticles = await prisma.articles.findMany({});
      return AllArticles;
    } catch (err) {
      throw err;
    }
  },
  //   createUser: async (email, password) => {
  //     try {
  //       const existUser = await prisma.user.findUnique({ where: { email } });
  //       if (existUser) throw 'email sudah dipakai';

  //       const user = await prisma.user.create({ data: { email, password } });
  //       return user;
  //     } catch (err) {
  //       throw err;
  //     }
  //   },

  //   getUserById: async (id) => {
  //     try {
  //       const user = await prisma.user.findUnique({ where: { id } });
  //       if (!user) throw 'user tidak ditemukan';

  //       return user;
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
  //   deleteUser: async (email) => {
  //     try {
  //       const user = await prisma.user.delete({ where: { email } });
  //       return user;
  //     } catch (err) {
  //       throw err;
  //     }
  //   },
};
