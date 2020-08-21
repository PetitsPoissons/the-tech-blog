const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// get all comments
router.get('/', (req, res) => {
  Comment
    .findAll({
      attributes: ['id', 'comment_text', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Post,
          attributes: ['title', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single comment
router.get('/:id', (req, res) => {
  Comment
    .findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'comment_text', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Post,
          attributes: ['title', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a comment
router.post('/', (req, res) => {
  Comment
    .create({
      comment_text: req.body.comment_text,
      user_id: req.body.user_id,
      post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a comment
router.put('/:id', (req, res) => {
  Comment
    .update(
      {
        comment_text: req.body.comment_text
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a comment
router.delete('/:id', (req, res) => {
  Comment
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;