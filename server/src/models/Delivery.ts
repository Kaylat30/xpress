import { Document, model, Schema } from 'mongoose';

interface DeliveryDocument extends Document {
    itemId: string;
    item: string;
    status: string;
    clientId: string;
    driverId: string;
    cashierIn: string;
    cashierOut: string;
    price:number
}

const deliverySchema = new Schema(
    {
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
        price:{
            type:Number,
            max:50
        }
    },
    { timestamps: true }
);

const Delivery = model<DeliveryDocument>('Delivery', deliverySchema);

export default Delivery;
