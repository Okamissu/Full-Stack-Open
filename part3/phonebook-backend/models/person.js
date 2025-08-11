const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => console.log('connected to mongoDB'))
  .catch((err) => console.error('error connecting to mongoDB:', err.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Person name required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'Person phone number required'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
