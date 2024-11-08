
import mongoose from 'mongoose'
const { Schema } = mongoose;

const ItemReasonSchema = new Schema({
    title: String
});

export const ItemReason = mongoose.model('ItemReason', ItemReasonSchema);