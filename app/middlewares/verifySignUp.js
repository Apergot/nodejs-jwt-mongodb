const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

//check for duplications for username and email
checkDuplicateUsernameOrEmail = (req, res, next) => {
    //checking username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (user) {
            res.status(400).send({message: 'Invalid credentials'});
            return;
        }

        //checking email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (user) {
                res.status(400).send({message: 'Invalid credentials'})
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let role in req.body.roles) {
            if (!ROLES.includes(role)) {
                res.status(400).send({
                    message: `Role ${role} does not exist!`
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;