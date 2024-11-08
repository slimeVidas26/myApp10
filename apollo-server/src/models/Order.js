import mongoose from 'mongoose'
const { Schema } = mongoose;

const orderProductSchema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  
  initialQuantity: {
    type: Number,
    required: true,
  },
  finalQuantity: {
    type: Number,
    required: false,
    
  },
  
  isOpen: {
    type: Boolean,
    default: true, // Setting the order as open by default
  },
  toto: { type: String, required: false },

  

});

const orderSchema = new Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  edi: { type: Number, required: false, default: 100 },
  reference: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  totalQuantity: { type: Number, default: 0 },
  totalBoxes: { type: Number, default: 0 },
  openOrder: {type: Boolean,default: true },
  orderProducts: [orderProductSchema],

});

export const Order = mongoose.model('Order', orderSchema);