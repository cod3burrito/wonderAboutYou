const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
        } else {(err => {
                console.log(err);
                res.status(400).json(err);
            }
        );
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
        )
        } else (err => {
            console.log(err);
            res.status(400).json(err);
        }
    );
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
    } else {(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id
            : params.userId }, body
            , { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
        )
    } else {(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
        )
                   } else {(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }
        )
        } else {(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            )
            .then(dbUserData => res.json(dbUserData))
         } else {(err => res.json(err));
    }
};

module.exports = userController;