
import mongoose from 'mongoose'
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    title: String
});

export const Department = mongoose.model('Department', DepartmentSchema);