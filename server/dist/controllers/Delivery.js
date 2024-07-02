import Delivery from "../models/Delivery.js";
import Pack from "../models/Pack.js";
import Received from "../models/Received.js";
import Staged from "../models/Staged.js";
//get Delivery
export const getDelivery = async (req, res) => {
    try {
        const items = await Delivery.find();
        if (items.length < 1) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No Deliveries in the database"
            });
        }
        return res.status(200).json(items);
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
//get deliveryIfo
export const getDeliveryInfo = async (req, res) => {
    try {
        const { itemId } = req.body;
        const delivery = await Delivery.findOne({ itemId: itemId });
        return res.status(200).json(delivery);
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
//delete delivery
export const deleteDelivery = async (req, res) => {
    try {
        const { itemId } = req.body;
        const deletedDeliveryItem = await Delivery.findOneAndDelete({ itemId: itemId });
        const deletedStagedItem = await Staged.findOneAndDelete({ itemId: itemId });
        const deletedPackItem = await Pack.findOneAndDelete({ itemId: itemId });
        const deletedReceivedItem = await Received.findOneAndDelete({ itemId: itemId });
        if (!deletedDeliveryItem || !deletedStagedItem || !deletedPackItem || !deletedReceivedItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
            //console.log("item not found")
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
//Updating delivery
export const updateDelivery = async (req, res) => {
    try {
        const { itemId, item, status, clientId, driverId, cashierIn, cashierOut } = req.body;
        // Find the item by its ID 
        const updatedDeliveryItem = await Delivery.findOneAndUpdate({ itemId: itemId }, {
            item: item,
            status: status,
            clientId: clientId,
            driverId: driverId,
            cashierIn: cashierIn,
            cashierOut: cashierOut
        }, { new: true } // Return the updated item
        );
        const updatedStagedItem = await Staged.findOneAndUpdate({ itemId: itemId }, {
            item: item,
            status: status,
            clientId: clientId,
        }, { new: true } // Return the updated item
        );
        const updatedPackItem = await Pack.findOneAndUpdate({ itemId: itemId }, {
            item: item,
            status: status,
        }, { new: true } // Return the updated item
        );
        const updatedReceivedItem = await Received.findOneAndUpdate({ itemId: itemId }, {
            item: item,
            status: status,
            clientId: clientId,
        }, { new: true } // Return the updated item
        );
        if (!updatedDeliveryItem || !updatedStagedItem || !updatedPackItem || !updatedReceivedItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
            //console.log("item not found");
        }
        return res.status(200).json({
            success: true,
            delivery: updatedDeliveryItem,
            pack: updatedPackItem,
            received: updatedReceivedItem,
            staged: updatedStagedItem,
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
