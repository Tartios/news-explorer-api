const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, saveArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string(),
    title: Joi.string(),
    text: Joi.string(),
    date: Joi.string(),
    source: Joi.string(),
    link: Joi.string().pattern(/(http|https):\/\/(www)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{1,}#?/),
    image: Joi.string().pattern(/(http|https):\/\/(www)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{1,}#?/),
  }),
}), saveArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
