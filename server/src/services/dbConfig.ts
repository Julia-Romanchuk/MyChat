import mongoose from 'mongoose'

const mongodbURL = process.env.mongodbURL || "mongodb://127.0.0.1:27017"

mongoose.set('useCreateIndex', true)
mongoose.connect(mongodbURL, {useNewUrlParser: true})

const db = mongoose.connection

db.on('open', () => {console.log('CONNECTED TO DB SUCCESSFULLY')})
db.on('error', () => {console.log('CONNECTION TO DB FAILED')})