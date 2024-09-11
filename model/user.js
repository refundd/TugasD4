const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 7, maxlength: 15 },
    linkImgProfile: { type: String },
    role: { type: String, default: 'user' }  
});

const User = mongoose.model('User', userSchema);


module.exports = User;
