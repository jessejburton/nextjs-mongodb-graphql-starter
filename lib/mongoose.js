/*
*  This file can be used to connect to a MongoDB database
*  Update MONGO_URL with your own url in the .env file
*  found in the root folder of this project
*/

import mongoose from 'mongoose'

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
  return handler(req, res)
}

const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to Mongo')
})

export default connectDb