const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
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
            } else if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error("Password invalid, contains 'password' ")
            }
        }
    },
    createdAt: {
        type: Date,
        dafault: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)











// const mongoose = require('mongoose')
// const validator = require('validator')
// // const bcrypt    = require('bcryptjs')
// // const jwt       = require('jsonwebtoken')

// // const Post      = require('./post.model')

// const userSchema = new mongoose.Schema({
//     // name: {
//     //     type: String,
//     //     required: true,
//     //     trim: true
//     // },
//     // age: {
//     //     type: Number,
//     //     default: 0,
//     //     validate(value) {
//     //         if (value < 0) {
//     //             throw new Error('To Proceed Enter Age.')
//     //         }
//     //     }
//     // },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         require: true,
//         trim: true,
//         minlength: 8,
//         validate(value) {
//             if (validator.isEmpty(value)) {
//                 throw new Error('Enter Password')
//             } else if (validator.equals(value.toLowerCase(), "password")) {
//                 throw new Error('Password is invalid')
//             } else if (validator.constains(value.toLowerCase(), "password")) {
//                 throw new Error("Password invalid, contains 'password' ")
//             }
//         }
//     }
//     // tokens: [{
//     //     token: {
//     //         type: String,
//     //         default: Date.now
//     //     }
//     // }],
//     // createdAt: {
//     //     type: Date,
//     //     dafault: Date.now
//     // }
// })

// const User = mongoose.model('User', userSchema);