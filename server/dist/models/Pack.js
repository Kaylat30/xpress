import { model, Schema } from 'mongoose';
const packSchema = new Schema({
    DriverId: {
        type: String,
        min: 2,
        max: 50,
    },
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
    pickup: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    dropoff: {
        type: String,
        required: true,
        max: 50,
    },
    status: {
        type: String,
        required: true,
        max: 50,
    },
}, { timestamps: true });
const Pack = model('Pack', packSchema);
export default Pack;
