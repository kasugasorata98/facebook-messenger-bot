import mongoose, { Mongoose } from 'mongoose'

class MongooseClient {
  async connect(mongoDBConnectionString: string): Promise<Mongoose> {
    try {
      mongoose.set('strictQuery', false)
      return mongoose.connect(mongoDBConnectionString)
    } catch (err) {
      throw err
    }
  }
}

export default new MongooseClient()
