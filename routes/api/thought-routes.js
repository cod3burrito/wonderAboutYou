const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller.js');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/<thoughtId>
router.route('/:userid').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/<thoughtId>/reactions/<reactionId>
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;