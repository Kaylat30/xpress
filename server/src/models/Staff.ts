import mongoose, { Document } from "mongoose";

interface StaffDocument extends Document {
    staffId: string;
    name: string;
    branch: string;
    sex: string;
    role: string;
    address: string;
    contact: number;
    dob: Date;
    email: string;
    password: string;
}

const StaffSchema = new mongoose.Schema(
    {
        staffId: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true
        },
        name: {
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
        sex: {
            type: String,
            required: true,
            min: 4,
            max: 10,
        },
        role: {
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
            max: 50,
        },
        dob: {
            type: Date,
            required: true,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
    },
    { timestamps: true }
);

const Staff = mongoose.model<StaffDocument>("Staff", StaffSchema);

export default Staff;
