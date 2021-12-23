const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingrese un nombre de usuario'],
    },
    externalId: {
        type: String,
        required: [true, 'Por favor ingrese un id externo'],
    },
    email: {
        type: String,
        required: [true, 'Por favor ingrese un correo'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Por favor ingrese un correo valido'],
    },
    tn: {
        type: String,
        maxlength: [8, 'El telefono debe tener 8 digitos'],
    },
    photo: String,
    password: {
        type: String,
    },
    passwordConfirm: {
        type: String,
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['user', 'helper', 'admin'],
        default: 'user',
    },
    balance: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false,
    },
    isValidated: {
        type: Boolean,
        default: true,
        select: false,
    },
    canBorrow: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre(/^'find'/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
