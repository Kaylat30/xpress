import { model, Schema } from 'mongoose';
const stagedSchema = new Schema({
    itemId: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    item: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    status: {
        type: String,
        required: true,
        min: 4,
        max: 50,
    },
    clientId: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    address: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    branch: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    contact: {
        type: String,
        required: true,
        min: 10,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    user: {
        type: String,
        required: true,
        min: 2,
    },
}, { timestamps: true });
const Staged = model('Staged', stagedSchema);
export default Staged;
