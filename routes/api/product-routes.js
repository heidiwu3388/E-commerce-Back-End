const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// ****** The "/api/products" endpoint ******

// GET All Products
router.get('/', async (req, res) => {
  try {
    // find all products
    const productData = await Product.findAll({
      // include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

// GET Product by Id
router.get('/:id', async (req, res) => {
  try{
    // find a single product by its `id`
    const productData = await Product.findByPk(req.params.id, {
      // include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    if (!productData) {
      res.status(404).json({ message: `No product found with id=${req.params.id}` });
      return;
    }
    res.status(200).json(productData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

// CREATE New Product
/* req.body should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    category_id: 1,
    tagIds: [1, 2, 3, 4]
  }
*/
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// UPDATE Product
/* req.body should look like this...
  {
    product_name: "Basketball",
    price: 200.00,
    stock: 3,
    category_id: 1,
    tagIds: [1, 2, 3, 4]
  }
*/
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find product's associated tags from ProductTag table
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((oldProductTags) => {
      // get list of current tag_ids
      const oldTagIds = oldProductTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !oldTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = oldProductTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE Product
router.delete('/:id', async (req, res) => {
  try {
    // delete one product by its `id` value
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: `No product found with id=${req.params.id}` });
      return;
    }
    res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
