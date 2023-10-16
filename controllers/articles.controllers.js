const { getAllArticles } = require('../libs/articles.libs');
module.exports = {
    getAllArticles: async (req, res, next) => {
        try {
            const articles = await getAllArticles();
            res.status(200).json({
                status: true,
                message: 'OK!',
                data: articles,
            });
        } catch (err) {
            next(err);
        }
    },
};