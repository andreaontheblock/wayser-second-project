function buildSortSchema (req, queryStatus) {
  let sortSchema = {
    sort: '',
    key: ''
  };

  if (req.query.sort) {
    switch (req.query.sort) {
    case ('name-asc'):
      sortSchema.sort = 1;
      sortSchema.key = 'name';
      queryStatus.isSortByNameAsc = true;
      break;
    case ('name-desc'):
      sortSchema.sort = -1;
      sortSchema.key = 'name';
      queryStatus.isSortByNameDesc = true;
      break;
    case ('price-asc'):
      sortSchema.sort = 1;
      sortSchema.key = 'price.amount';
      queryStatus.isSortByPriceAsc = true;
      break;
    case ('price-desc'):
      sortSchema.sort = -1;
      sortSchema.key = 'price.amount';
      queryStatus.isSortByPriceDesc = true;
      break;
    }
  } else {
    sortSchema.sort = 1;
    sortSchema.key = 'name';
  }
  return sortSchema;
};

module.exports = buildSortSchema;
