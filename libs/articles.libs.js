const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    getAllArticles: async () => {
        try {
            const articles = await prisma.articles.findMany();
            return articles;
        } catch (err) {
            throw err;
        }
    },
};