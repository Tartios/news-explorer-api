const articleModel = require('../models/article');
const { NotFoundError } = require('../errors/not-found-error.js');
const { ValidationError } = require('../errors/validationerror.js');

module.exports.getArticles = (req, res, next) => {
  articleModel.find()
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }

      res.send(data);
    })
    .catch((next));
};

module.exports.saveArticle = (req, res, next) => {
  articleModel.create({ ...req.body })
    .then((data) => {
      if (!data) {
        throw new ValidationError('Данные переданные пользователем некорректны');
      }

      res.send(data);
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const _id = req.params.articleId;
  articleModel.findByIdAndRemove(_id)
    .then((userCard) => {
      res.send({ data: userCard });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new NotFoundError('Эта статья не обнаружена'));
      } else {
        next(err);
      }
    });
};
