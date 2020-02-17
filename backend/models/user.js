const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const saltRounds = 12;

const userSchema = new Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }, // bcryptjs
});

userSchema.pre('save', function (next) { // hook
    if (this.isModified('password')) {
        console.log('encrypt');
        const salt = bcrypt.genSaltSync(saltRounds);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
});
userSchema.methods.comparePassword = function(candidate) {
    return bcrypt.compareSync(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema, 'tasks_users');
