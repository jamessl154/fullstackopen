const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// https://catonmat.net/my-favorite-regex
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[A-Za-z \d]*$/.test(v)
      },
      message: props => `${props.value}: username must only contain alphanumeric characters and the space character`
    },
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)