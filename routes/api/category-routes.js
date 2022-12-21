const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET All Categories
router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll({
      // include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  };
  // be sure to include its associated Products
});

// GET Category by Id
router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      // include its associated Products
      include: [{ model: Product }],
    });
    if (!categoryData) { 
      res.status(404).json({ message: `No category found with id=${req.params.id}` });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  };

});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
