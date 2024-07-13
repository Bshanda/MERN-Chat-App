import mongoose from 'mongoose'
import EnvVars from '../constants/EnvVars.js'

export default () => {
  mongoose
    .connect(EnvVars.Mongodb.uri, {
      dbName: EnvVars.Mongodb.DbName,
      user: EnvVars.Mongodb.DbUser,
      pass: EnvVars.Mongodb.DbPass
    })
    .then(() => console.log(`Connected to MongoDb Atlas`))
    .catch(err => console.log(err))
}
