

import mongoose from 'mongoose'
const { Schema } = mongoose;

const arrivalSchema = new Schema({
    title: String
});

export const Arrival = mongoose.model('Arrival', arrivalSchema);