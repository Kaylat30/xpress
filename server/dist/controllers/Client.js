import Client from "../models/Client.js";
import Received from "../models/Received.js";
import Staged from "../models/Staged.js";
//add Client 
export const addClient = async (req, res) => {
    try {
        const { name, contact, address, email } = req.body;
        //const sessionID = req.sessionID;
        // Generate clientId 
        const currentYear = new Date().getFullYear();
        const clientCount = await Client.countDocuments();
        const clientId = `${currentYear}/CL/${(clientCount + 1).toString().padStart(3, '0')}`;
        let client = new Client({
            clientId: clientId,
            name: name,
            address: address,
            contact: contact,
            email: email
        });
        const savedClient = await client.save();
        return res.status(201).json(savedClient);
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
//get Cliets
export const getClient = async (req, res) => {
    try {
        const clients = await Client.find();
        if (clients.length < 1) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No Clients in the database"
            });
        }
        return res.status(200).json(clients);
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
//get ClientIfo
export const getClientInfo = async (req, res) => {
    try {
        const { clientId } = req.body;
        const client = await Client.findOne({ clientId: clientId });
        return res.status(200).json(client);
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
//delete Client
export const deleteClient = async (req, res) => {
    try {
        const { clientId } = req.body;
        const deletedClient = await Client.findOneAndDelete({ clientId: clientId });
        const deletedStaged = await Staged.findOneAndDelete({ clientId: clientId });
        const deletedReceived = await Received.findOneAndDelete({ clientId: clientId });
        if (!deletedClient) {
            return res.status(404).json({
                success: false,
                message: 'Client not found',
            });
        }
        if (!deletedStaged || !deletedReceived) {
            console.log("client not found");
        }
        return res.status(200).json({
            success: true,
            message: 'Client deleted successfully',
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
//Updating client
export const updateClient = async (req, res) => {
    try {
        const { clientId, name, contact, address, email } = req.body;
        // Find the client by id
        const updatedClient = await Client.findOneAndUpdate({ clientId: clientId }, {
            name: name,
            address: address,
            contact: contact,
            email: email,
        }, { new: true } // Return the updated client
        );
        const updatedStagedClient = await Staged.findOneAndUpdate({ clientId: clientId }, {
            name: name,
            address: address,
            contact: contact,
            email: email,
        }, { new: true } // Return the updated client
        );
        const updatedReceivedClient = await Received.findOneAndUpdate({ clientId: clientId }, {
            name: name,
            address: address,
            contact: contact,
            email: email,
        }, { new: true } // Return the updated client
        );
        if (!updatedClient) {
            return res.status(404).json({
                success: false,
                message: 'Client not found',
            });
        }
        if (!updatedStagedClient || updatedReceivedClient) {
            console.log("client not found");
        }
        return res.status(200).json({
            success: true,
            client: updatedClient,
            staged: updatedStagedClient,
            received: updatedReceivedClient
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
