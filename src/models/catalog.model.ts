import mongoose, { Schema, Document } from 'mongoose'

export interface Catalog extends Document {
  sku: number
  name: string
  type: string
  price: number
  upc: string
  category: Array<{
    id: string
    name: string
  }>
  shipping: number
  description: string
  manufacturer: string
  model: string
  url: string
  image: string
}

const CatalogSchema: Schema = new Schema<Catalog>(
  {
    sku: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    upc: {
      type: String,
      required: true,
    },
    category: [
      {
        id: String,
        name: String,
      },
    ],
    shipping: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<Catalog>('Catalog', CatalogSchema)
