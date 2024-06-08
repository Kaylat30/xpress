import mongoose from "mongoose";
const StaffSchema = new mongoose.Schema({
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
        type: String,
        required: true,
        max: 50,
    },
    dob: {
        type: String,
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
}, { timestamps: true });
const Staff = mongoose.model("Staff", StaffSchema);
export default Staff;
