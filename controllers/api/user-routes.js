const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User
    .findAll({
      attributes: { exclude: ['password']},
      include: [
        {
          model: Post,
          attributes: ['title', 'created_at'],
          order: [['created_at', 'DESC']]
        }
      ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single user
router.get('/:id', (req, res) => {
  User
    .findOne({
      where: {
        id: req.params.id
      },
      attributes: { exclude: ['password']},
      include: [
        {
          model: Post,
          attributes: ['title', 'created_at'],
          order: [['created_at', 'DESC']]
        },
        {
          model: Comment,
          attributes: ['comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          },
          order: [['created_at', 'DESC']]
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a user
router.post('/', (req, res) => {
  User
    .create(req.body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login user
router.post('/login', (req, res) => {
  User
    .findOne({
      where: {
        username: req.body.username
      }
    })
    // find user with the username entered
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }
      // verify user identity
      dbUserData.checkPassword(req.body.password).then(result => {
        console.log('validPassword', result);
        if (!result) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
});

// update a user
router.put('/:id', (req, res) => {
  User
    .update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a user
router.delete('/:id', (req, res) => {
  User
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;