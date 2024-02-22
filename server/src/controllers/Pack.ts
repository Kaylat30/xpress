import { Request, Response } from 'express';
import Pack from '../models/Pack.js';
import Delivery from '../models/Delivery.js';
import Staged from '../models/Staged.js';

// Get Pack
export const getPack = async (req: Request, res: Response) => {
  try {
    const pack = await Pack.find();

    if (pack.length < 1) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No Items in the database',
      });
    }

    return res.status(200).json(pack);
  } catch (error) {
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

// Update Pack
export const updatePack = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;

    const driverId = (req.user as { staffId?: string })?.staffId;

    // Find the pack by id and update
    const updatedPack = await Pack.findByIdAndUpdate(
      itemId,
      {
        $set: {
          status: 'Approved',
          DriverId: driverId,
        },
      },
      { new: true }
    );

    // Find the delivery by id and update
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      itemId,
      {
        $set: {
          status: 'Shipped',
          DriverId: driverId,
        },
      },
      { new: true }
    );

    // Delete staged item by id
    const deletedItem = await Staged.findByIdAndDelete(itemId);

    if (!deletedItem || !updatedPack || !updatedDelivery) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    return res.status(200).json({
      success: true,
      pack: updatedPack,
      delivery: updatedDelivery,
      Staged: 'Item deleted successfully',
    });
  } catch (error) {
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
