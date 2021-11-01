const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/Article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
// 'mongodb://localhost/blog' <- previous db to local

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('connected to DB!');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  let total = 0;
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    if (articles.length) {
      const totalObj = articles.reduce((a, b) => ({ number: a.number + b.number }));
      total = totalObj.number;
    }
    res.render('articles/index', { articles: articles, total: total });
  } catch (err) {
    console.log(err);
  }
});

app.use('/articles', articleRouter);

app.listen(process.env.PORT);
