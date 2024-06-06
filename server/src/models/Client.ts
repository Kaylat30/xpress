import { Document, model, Schema } from 'mongoose';

interface ClientDocument extends Document {
    clientId: string;
    name: string;
    address: string;
    contact: string;
    email: string;
}

const clientSchema = new Schema(
    {
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
            type: String,
            required: true,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
        },
    },
    { timestamps: true }
);

const Client = model<ClientDocument>('Client', clientSchema);

export default Client;
