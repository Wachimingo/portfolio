const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingrese un nombre de usuario'],
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
        required: [true, 'Por favor ingrese una clave'],
        minlength: 4,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Por favor confirme su clave'],
        validate: {
            // This only works on create and save
            validator: function (el: any) {
                return el === userSchema.password;
            },
            message: 'Las claves no son iguales!',
        },
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
        default: false,
        select: false,
    },
    canBorrow: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre('save', async function (next: any) {
    //Only run if password has changed
    if (!userSchema.isModified('password')) return next;
    //Hash the password with bcrypt
    userSchema.password = await bcrypt.hash(userSchema.password, 2);
    //Delete passwordConfirm field, to not be save in DB
    userSchema.passwordConfirm = undefined;
    next();
});

userSchema.pre(/^'find'/, function (next: any) {
    userSchema.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function (
    inputPassword: any,
    userPassword: any
) {
    return await bcrypt.compare(inputPassword, userPassword);
};

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
//     if (userSchema.passwordChangedAt) {
//         const changedTimestamp = parseInt(
//             userSchema.passwordChangedAt.getTime() / 1000,
//             10
//         );
//         return JWTTimestamp < changedTimestamp;
//     }

//     return false;
// };

export default mongoose.models.User || mongoose.model('User', userSchema);
