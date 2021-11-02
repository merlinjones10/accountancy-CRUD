const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item');
const itemRouter = require('./routes/items');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
const calculateTotals = require('./functions/calculations');
// 'mongodb://localhost/blog' <- previous db to local

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('connected to DB!');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: 'desc' });
    const totals = calculateTotals(items);

    res.render('items/index', {
      items: items,
      totals: totals,
    });
  } catch (err) {
    console.log(err);
  }
});

app.use('/items', itemRouter);

app.listen(3000);

/* -------------------------------- GRAVEYARD ------------------------------- */
// let totalExp = items.reduce((a, b) => ({ number: a.number + b.number }));
