
import mongoose from 'mongoose'
const { Schema } = mongoose;

const warehouseSchema = new Schema({
    title: { type: String, required: true },
    
  });


  export const Warehouse = mongoose.model('Warehouse', warehouseSchema);