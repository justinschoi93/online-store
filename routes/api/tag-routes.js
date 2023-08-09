const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET ROUTE: Will select for entire Tag table

router.get('/', async (req, res) => {
 try{
  const tagData = await Tag.findAll({
    include: [{ model: Product}]
  })

  return res.status(200).json(tagData);
 } catch (err) {
  res.status(500).json(err);
 } 
});

// GET ROUTE: Will select for specific row of Tag table
router.get('/:id', async (req, res) => {
 
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product}],
      where: {
        id: req.params.id
      }
    })

    return res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST ROUTE: Will create a row or rows for Tag table
router.post('/', async (req, res) => {
  // create a new tag
  try {

    const tagData = new Tag;

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    } else if ( req.body.length === 1) {
      tagData.create(req.body);
    } else {
      tagData.bulkCreate(req.body);
    }

    return res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT ROUTE: Will make changes to specified row of Tag table
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((tag) =>{

    return res.status(200).json(tag);
  }).catch ((err)=>{
    res.status(500).json(err)
  })
});

// DELETE ROUTE: Will delete a specified row of the Tag table
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    return res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
