const mongoose = require('mongoose');

const Role = mongoose.model(
    'Role',
    new mongoose.Schema({
        rolename: String
    })
);

module.exports = Role;