import mongoose from 'mongoose'
const { Schema } = mongoose;



const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: false },
  code: { type: Number, required: true },
  category: { type: String, required: false },
  inStock: { type: Number, required: false },
  quantityPerBox: { type: Number, required: true },
  toto: { type: String, required: false },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }
});

export const Product = mongoose.model('Product', productSchema);