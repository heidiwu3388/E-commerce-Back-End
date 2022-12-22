const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET All Tags
router.get('/', async (req, res) => {
    try {
      // find all tags
      const tagData = await Tag.findAll({
        // include its associated Product data
        include: [{ model: Product }],
      });
      res.status(200).json(tagData);
    }
    catch (err) {
      res.status(500).json(err);
    };
});

// GET Tag by Id
router.get('/:id', async (req, res) => {
  try{
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // include its associated Product data
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: `No tag found with id=${req.params.id}` });
      return;
    }
    res.status(200).json(tagData);
  } 
  catch (err) {
    res.status(500).json(err);
  };
});

// CREATE New Tag
router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

// UPDATE Tag
router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: `No tag found with id=${req.params.id}` });
      return;
    };
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  };
});

// DELETE Tag
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: `No tag found with id=${req.params.id}` });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
