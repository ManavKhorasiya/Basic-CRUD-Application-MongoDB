var mongoose = require('mongoose');

const user = new mongoose.Schema( {
    fname: {
        type: String,
        required: false
    },
    lname: {
        type: String
    },
    mobile: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        configurable : true
    },
    dateOfBirth: {
        type: Date
    }
})

module.exports = mongoose.model('User', user);