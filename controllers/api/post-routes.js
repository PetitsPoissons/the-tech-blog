const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts (/api/posts/)
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      // include a post's author
      {
        model: User,
        attributes: ['username']
      },
      // include comments for each post and the comments' authors
      {
        model: Comment,
        attributes: ['comment_text', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get a single post (/api/posts/:id)
router.get('/:id', (req, res) => {
  Post
    .findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        // include the post's author
        {
          model: User,
          attributes: ['username']
        },
        // include comments for the post and the comments' authors
        {
          model: Comment,
          attributes: ['comment_text', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          },
          order: [['created_at', 'DESC']]
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });    
});

// create a post (/api/posts/)
router.post('/', withAuth, (req, res) => {
  Post
    .create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post (/api/posts/:id)
router.put('/:id', withAuth, (req, res) => {
  console.log('*************** TRYING TO SAVE CHANGES TO A POST');
  console.log('req.session', req.session);
  Post.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete a post (/api/posts/:id)
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;