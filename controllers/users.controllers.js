const { createUser, deleteUser, getUserById } = require('../libs/users.libs');
module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const user = await createUser(name, email, password);
      res.status(201).json({
        status: true,
        message: 'user berhasil dibuat',
        data: user,
      });
    } catch (err) {
      if (err === 'email sudah dipakai') {
        res.status(400).json({
          status: false,
          message: err,
        });
      } else {
        next(err);
      }
    }
  },
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(Number(id));
      if (!user) throw 'user tidak ditemukan';
      res.status(200).json({
        status: true,
        message: 'user berhasil ditemukan',
        data: user,
      });
    } catch (err) {
      if (err === 'user tidak ditemukan') {
        res.status(404).json({
          status: false,
          message: err,
        });
      } else {
        next(err);
      }
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await deleteUser(email);
      res.status(200).json({
        status: true,
        message: 'user berhasil dihapus',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
