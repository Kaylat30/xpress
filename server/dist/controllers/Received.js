import Client from "../models/Client";
import Delivery from "../models/Delivery";
import Pack from "../models/Pack";
import Received from "../models/Received";
//add Item
export const addItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        //const sessionID = req.sessionID;
        const staffId = req.user?.staffId;
        if (!itemId) {
            return res.status(400).json({ error: 'productId is required' });
        }
        let item = await Delivery.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Product not found' });
        }
        let client = await Client.findById(item.clientId);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        let item1 = new Received({
            itemId: item.itemId,
            item: item.item,
            status: "Received",
            clientId: client.clientId,
            name: client.name,
            address: client.address,
            contact: client.contact,
            email: client.email,
        });
        const savedItem = await item1.save();
        const updatedDelivery = await Delivery.findByIdAndUpdate(itemId, {
            $set: {
                status: "Received",
                cashierOut: staffId,
            },
        }, { new: true } // Return the updated client
        );
        if (!updatedDelivery) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        const deletedItem = await Pack.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        return res.status(201).json(savedItem);
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
//get item
export const getItem = async (req, res) => {
    try {
        const query = { branch: req.user?.branch };
        if (!query.branch) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        const stagedItems = await Received.find(query);
        if (stagedItems.length < 1) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No items"
            });
        }
        return res.status(200).json(stagedItems);
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
//delete item
export const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const deletedItem = await Received.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
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
//Updating item
export const updateItem = async (req, res) => {
    try {
        const { itemId, item, status, clientId, name, address, contact, email } = req.body;
        const staffId = req.user?.staffId;
        // Find the item by its ID
        const updatedReceiveditem = await Received.findByIdAndUpdate(itemId, {
            item: item,
            status: status,
            clientId: clientId,
            name: name,
            address: address,
            contact: contact,
            email: email
        }, { new: true } // Return the updated item
        );
        if (!updatedReceiveditem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        const updatedDeliveryitem = await Delivery.findByIdAndUpdate(itemId, {
            item: item,
            status: status,
            clientId: clientId,
            cashierOut: staffId
        }, { new: true } // Return the updated item
        );
        if (!updatedDeliveryitem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        return res.status(200).json({
            success: true,
            staged: updatedDeliveryitem,
            received: updatedReceiveditem,
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
//checking out cart items
export const checkout = async (req, res) => {
    try {
        const { itemId } = req.body;
        const staffId = req.user?.staffId;
        await Received.findByIdAndDelete(itemId);
        const updateditem = await Delivery.findByIdAndUpdate(itemId, {
            status: "Delivered",
            cashierOut: staffId,
        }, { new: true } // Return the updated item
        );
        if (!updateditem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }
        res.status(200).json({ success: true, message: 'Checkout successful' });
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
