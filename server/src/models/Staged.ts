import { Document, model, Schema } from 'mongoose';

interface StagedDocument extends Document {
    itemId: string;
    item: string;
    status: string;
    clientId: string;
    name: string;
    address: string;
    contact: number;
    email: string;
    user: string;
}

const stagedSchema = new Schema(
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
    },
    { timestamps: true }
);

const Staged = model<StagedDocument>('Staged', stagedSchema);

export default Staged;
