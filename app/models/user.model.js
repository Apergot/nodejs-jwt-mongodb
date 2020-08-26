const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        email: String,
        createAt: Date,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            }
        ]
    })
);