import { Document, model, Schema } from 'mongoose';

interface ReceivedDocument extends Document {
    itemId: string;
    item: string;
    status: string;
    clientId: string;
    name: string;
    address: string;
    contact: number;
    email: string;
}

const receivedSchema = new Schema(
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
        contact: {
            type: Number,
            required: true,
            min: 10,            
        },
        email: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
    },
    { timestamps: true }
);

const Received = model<ReceivedDocument>('Received', receivedSchema);

export default Received;
