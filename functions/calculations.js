const calculateTotals = (items) => {
  let income = 0;
  let expenses = 0;
  if (items.length) {
    items.forEach((item) => {
      if (item.type == 'income') {
        income = income += item.number;
      }
      if (item.type == 'expense') {
        expenses = expenses += item.number;
      }
    });
  }
  let profit = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
    income - expenses
  );

  return {
    income: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(income),
    expenses: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
      expenses
    ),
    profit: profit,
  };
};

module.exports = calculateTotals;

/* -------------------------------- GRAVEYARD ------------------------------- */
/* --------------------------- Old invoked funcion -------------------------- */
// (() => {
//   if (itemss.length) {
//     itemss.forEach((items) => {
//       if (items.type == 'income') {
//         income = income += items.number;
//       }
//       if (items.type == 'expense') {
//         expenses = expenses += items.number;
//       }
//     });
//   }
// })();
