const router = require('express').Router();
const { Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create comment
router.post('/', (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// delete comment
router.delete('/:id', (req, res) => {
    Comment.destroy({ 
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'No post found with this ID.' })
                return;
            };

            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;