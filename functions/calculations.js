// const express = require('express');
// const mongoose = require('mongoose');
// const Article = require('../models/article');

const calculateTotals = (articles) => {
  let income = 0;
  let expenses = 0;
  if (articles.length) {
    articles.forEach((article) => {
      if (article.type == 'income') {
        income = income += article.number;
      }
      if (article.type == 'expense') {
        expenses = expenses += article.number;
      }
    });
  }
  return { income: income, expenses: expenses, profit: income - expenses };
};

module.exports = calculateTotals;
