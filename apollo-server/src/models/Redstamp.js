
import mongoose from 'mongoose'
const { Schema } = mongoose;

const RedstampSchema = new Schema({
    title: String
});

export const Redstamp = mongoose.model('Redstamp', RedstampSchema);