const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is Mandatory"],
        minlength: 6,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Mandatory"],
        unique: true,
        trim: true,
        match: /^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: 6,
        trim: true
    },
    role: {
        type: String,
        required: [true, "Role is Required"],
        trim: true
    }
}, { timestamps: true })

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
