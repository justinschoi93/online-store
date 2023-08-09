const router = require('express').Router();
const { Category, Product } = require('../../models');

// The API ROUTES

//Will select for  the entire Category table
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(
      { include:[{model: Product}] }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

//GET ROUTE: will select for specific category
router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id,
      { include:[{model: Product}] }
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST ROUTE: Will either create or bulkcreate entries for the Category table
router.post('/', async (req, res) => {
  // create a new category
  try {
    if (!req.body.length){
      res.status(404).json({message: 'You forgot to feed me!'})
    }
    const categoryData = new Category;
    
    if (req.body.length === 1) {
      await categoryData.create(req.body);
    } else {
      await categoryData.bulkCreate(req.body);
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT ROUTE: Will update specific entires of the Category Table
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
    
  }).then((category)=>{
    return res.status(200).json(category)
  }). catch((err) => {
    res.status(500).json(err)
  })
});

//DELETE ROUTE: Will delete specific rows of Category Table

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    console.log(categoryData);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
