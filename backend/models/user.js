const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 12;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(saltRounds);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
});

userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compareSync(candidate, this.password);
}

module.exports = mongoose.model('User', userSchema, 'tasks_users');