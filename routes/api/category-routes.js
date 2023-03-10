// import express router
const router = require('express').Router();
// import models
const { Category, Product } = require('../../models');

// ****** The "/api/categories" endpoint ******

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

// CREATE New Category
/* req.body should look like this...
  {
    "category_name": "Shirts"
  }
*/
router.post('/', async (req, res) => {
  try {
    // create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

//UPDATE Category
/* req.body should look like this...
  {
    "category_name": "Shirts"
  }
*/
router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const categoryData = await Category.update(req.body, {
      where: { 
        id: req.params.id 
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: `No category found with id=${req.params.id}` });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

// DELETE Category
router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
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

module.exports = router;
