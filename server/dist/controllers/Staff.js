import Staff from '../models/Staff.js';
import bcrypt from 'bcrypt';
// Function to generate a random password
function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}
//add Staff
export const addStaff = async (req, res) => {
    try {
        const { name, branch, sex, role, dob, contact, address, email } = req.body;
        // Generate staffId based on role and current year
        const currentYear = new Date().getFullYear();
        const rolePrefix = role.charAt(0).toUpperCase();
        const staffCount = await Staff.countDocuments({ role });
        const staffId = `${currentYear}/${rolePrefix}/${(staffCount + 1).toString().padStart(3, '0')}`;
        // Generate a random password
        const password = generateRandomPassword();
        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(staffId, 10);
        // Create a new Staff instance
        let staff = new Staff({
            staffId: staffId,
            name: name,
            address: address,
            contact: contact,
            email: email,
            password: hashedPassword,
            branch: branch,
            sex: sex,
            role: role,
            dob: dob,
        });
        // Save the staff member to the database
        const savedStaff = await staff.save();
        // Send the response with the created staff member
        return res.status(201).json(savedStaff);
    }
    catch (error) {
        // Handle errors
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        // Handle other cases where 'error' is not of type 'Error'
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred',
        });
    }
};
//get Staff
export const getStaff = async (req, res) => {
    try {
        const staffs = await Staff.find();
        if (staffs.length < 1) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No Staff in the database"
            });
        }
        return res.status(200).json(staffs);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        // Handle other cases where 'error' is not of type 'Error'
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred',
        });
    }
};
//get StaffIfo
export const getStaffInfo = async (req, res) => {
    try {
        const { staffId } = req.body;
        const staff = await Staff.findOne({ staffId: staffId });
        return res.status(200).json(staff);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        // Handle other cases where 'error' is not of type 'Error'
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred',
        });
    }
};
//delete staff
export const deleteStaff = async (req, res) => {
    try {
        const { staffId } = req.body;
        const deletedStaff = await Staff.findOneAndDelete({ staffId: staffId });
        if (!deletedStaff) {
            return res.status(404).json({
                success: false,
                message: 'Staff not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Staff deleted successfully',
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        // Handle other cases where 'error' is not of type 'Error'
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred',
        });
    }
};
//Updating staff
export const updateStaff = async (req, res) => {
    try {
        const { staffId, name, branch, sex, role, dob, contact, address, email } = req.body;
        // Find the product by its ID and update the amount field
        const updatedstaff = await Staff.findOneAndUpdate({ staffId: staffId }, {
            name: name,
            address: address,
            contact: contact,
            email: email,
            branch: branch,
            sex: sex,
            role: role,
            dob: dob
        }, { new: true } // Return the updated staff
        );
        if (!updatedstaff) {
            return res.status(404).json({
                success: false,
                message: 'Staff not found',
            });
        }
        return res.status(200).json({
            success: true,
            staff: updatedstaff,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        // Handle other cases where 'error' is not of type 'Error'
        return res.status(500).json({
            success: false,
            error: 'An unexpected error occurred',
        });
    }
};
