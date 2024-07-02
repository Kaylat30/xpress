import { model, Schema } from 'mongoose';
const deliverySchema = new Schema({
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
    driverId: {
        type: String,
        min: 2,
        max: 50,
    },
    cashierIn: {
        type: String,
        max: 50,
    },
    cashierOut: {
        type: String,
        max: 50,
    },
    price: {
        type: Number,
        max: 50
    }
}, { timestamps: true });
const Delivery = model('Delivery', deliverySchema);
export default Delivery;
