import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['text', 'list'], required: true },
    body: { type: String },
    items: [{ text: String }],
    shared: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});
export const Task = model('Task', TaskSchema);