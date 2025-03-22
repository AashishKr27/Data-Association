const mongoose = require('mongoose');
mongoose.connect(`mongodb://Localhost:27017/dataAssociationProject`);

const userSchema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default: 'default.png'
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});

module.exports = mongoose.model('user', userSchema);