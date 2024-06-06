import Delivery from "../models/Delivery.js";
import Staged from "../models/Staged.js";
import Client from "../models/Client.js";
import Pack from "../models/Pack.js";
import { FilterQuery,Document } from 'mongoose';
import { Request, Response } from 'express';


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
  branch:string
}

//add Item
export const addStagedItem = async (req: Request, res: Response) => {
    try {

      
        const { item,name,address,contact,email } = req.body;
        //const sessionID = req.sessionID;
        const staffId = (req.user as { staffId?: string })?.staffId;
        const branch = (req.user as { branch?: string })?.branch;
        
        // Generate clientId 
        const currentYear = new Date().getFullYear();
        const clientCount = await Client.countDocuments();
        const clientId = `${currentYear}/CL/${(clientCount + 1).toString().padStart(3, '0')}`;

        // Generate itemId  
        const itemCount = await Staged.countDocuments();
        const itemId = `${currentYear}/DI/${(itemCount + 1).toString().padStart(3, '0')}`;

        let addToStaged = new Staged({
            itemId:itemId,
            item:item,
            status:"Pending",
            clientId:clientId,
            name:name,
            address:address,
            contact:contact,
            email:email,
            user:staffId,
            branch:branch
            // session:sessionID
        })
        const savedToStaged = await addToStaged.save();

        let addToClient = new Client({
            clientId:clientId,
            name:name,
            address:address,
            contact:contact,
            email:email
        })
        const savedToClient = await addToClient.save();

        let addToDelivery = new Delivery({
            itemId: itemId,
            item:item,
            status:"Pending",
            clientId:clientId,
            name:name,
            address:address,
            contact:contact,
            email:email,
            cashierIn:staffId,
        })
        const savedToDelivery = await addToDelivery.save();

        let addToPack = new Pack({
            ItemId:itemId,
            item:item,
            status:"Pending",
            pickup:branch,
            dropoff:address
        })
        const savedToPack = await addToPack.save();


        return res.status(201).json({Staged:savedToStaged,Client:savedToClient,pack:savedToPack,Delivery:savedToDelivery});
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


//get item
export const getStagedItem = async (req: Request, res: Response) => {
    try {

      const query: FilterQuery<StagedDocument> = { branch: (req.user as { branch?: string })?.branch };
      
      if (!query.branch) {
        return res.status(404).json({
          success: false,
          message: 'Item not found',
        });
      }
   
      const stagedItems = await Staged.find();
  
      if (stagedItems.length < 1) {
        return res.status(200).json({ 
          success: true,
          data: [],
          message: "No items"
        });
      } 
      
      return res.status(200).json(stagedItems);
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

//delete item
export const deleteStagedItem = async (req: Request, res: Response) => {
    try {
      const { itemId,clientId } = req.body;
      
      const deletedStagedItem = await Staged.findOneAndDelete({ itemId: itemId });
      const deletedDeliveryItem = await Delivery.findOneAndDelete({ itemId: itemId });
      const deletedPackItem = await Pack.findOneAndDelete({ itemId: itemId });
      const deletedClientItem = await Client.findOneAndDelete({ clientId: clientId });
  
      if (!deletedStagedItem || !deletedClientItem  || !deletedPackItem || deletedDeliveryItem) {
        return res.status(404).json({
          success: false,
          message: 'Item not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Items deleted successfully',
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

  //Updating item
  export const updateStagedItem = async (req: Request, res: Response) => {
    try {
      const { itemId,item,status,clientId,name,address,contact,email } = req.body; 
      const staffId = (req.user as { _id?: string })?._id; 
      const branch = (req.user as { branch?: string })?.branch;
        

      // Find the item by its ID
      const updatedStageditem = await Staged.findOneAndUpdate(
        { itemId: itemId },
        {   
            item:item,
            status:status,
            clientId:clientId,
            name:name,
            address:address,
            contact:contact,
            email:email,
            user:staffId,
         },
        { new: true } // Return the updated item
      );

      const updatedClientitem = await Client.findOneAndUpdate(
        { itemId: itemId },
        {   
            name:name,
            address:address,
            contact:contact,
            email:email,
         },
        { new: true } // Return the updated item
      );

      const updatedPackitem = await Pack.findOneAndUpdate(
        { itemId: itemId },
        {   
            item:item,
            status:"Pending",
            pickup:branch,
            dropoff:address
         },
        { new: true } // Return the updated item
      );

      const updatedDeliveryitem = await Delivery.findOneAndUpdate(
        {itemId:itemId},
        {   
            item:item,
            status:"Pending",
            clientId:clientId,
            cashierIn:staffId,
         },
        { new: true } // Return the updated item
      );
  
      if (!updatedStageditem || !updatedClientitem || !updatedPackitem || updatedDeliveryitem) {
        return res.status(404).json({
          success: false,
          message: 'Item not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        staged: updatedStageditem,
        pack: updatedPackitem,
        client: updatedClientitem,
        delivery: updatedDeliveryitem,
        
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
  
  

