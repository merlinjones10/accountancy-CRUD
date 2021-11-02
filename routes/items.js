const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('items/new', { item: new Item() });
});

router.get('/edit/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render('items/edit', { item: item });
});

router.get('/:slug', async (req, res) => {
  const item = await Item.findOne({ slug: req.params.slug });
  if (item == null) res.redirect('/');
  res.render('items/show', { item: item });
});

router.post(
  '/',
  async (req, res, next) => {
    req.item = new Item();
    next();
  },
  saveItemAndRedirect('new')
);

router.put(
  '/:id',
  async (req, res, next) => {
    req.item = await Item.findById(req.params.id);
    next();
  },
  saveItemAndRedirect('edit')
);

router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

function saveItemAndRedirect(path) {
  return async (req, res) => {
    let item = req.item;
    item.title = req.body.title;
    item.description = req.body.description;
    item.number = req.body.number;
    item.type = req.body.type;
    // item.markdown = req.body.markdown;

    try {
      item = await item.save();
      res.redirect(`/items/${item.slug}`);
    } catch (e) {
      res.render(`items/${path}`, { item: item });
    }
  };
}

module.exports = router;
