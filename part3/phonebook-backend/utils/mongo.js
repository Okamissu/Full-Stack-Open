const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.error('Please provide the MongoDB password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Okamisu:${password}@fullstackopen.gptrsmc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person.find({})
    .then((result) => {
      console.log('Phonebook:')
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error('Error fetching persons:', err)
      mongoose.connection.close()
    })
  return
} else if (process.argv.length === 4) {
  console.error('Please provide both name and number as arguments')
  process.exit(1)
} else if (process.argv.length >= 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person
    .save()
    .then(() => {
      console.log('Person saved!')
      mongoose.connection.close()
    })
    .catch((err) => {
      console.error('Error saving person:', err)
      mongoose.connection.close()
    })
}
