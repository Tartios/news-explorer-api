const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, saveArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(2).max(30),
    title: Joi.string(),
    text: Joi.string(),
    date: Joi.String().date(),
    source: Joi.string(),
    link: Joi.string().uri(),
    image: Joi.string().uri(),
  }),
}), saveArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = router;
