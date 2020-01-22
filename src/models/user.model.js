const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const Post      = require('./post.model')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('To Proceed Enter Age.')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Enter Password')
            } else if (validator.equals(value.toLowerCase(), "password")) {
                throw new Error('Password is invalid')
            } else if (validator.constains(value.toLowerCase(), "password")) {
                throw new Error("Password invalid, contains 'password' ")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        dafault: Date.now
    }
})

UserSchema.method.newAuthToken = async function () {
    const user = this
    const token = jwt.sign
        (
            { _id: user.id.toString() },
            'MartinShungoh',
            { expiresIn: "7days" }
        )
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', UserSchema);