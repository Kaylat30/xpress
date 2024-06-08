import express from "express";
import { checkAuthenticated } from "../middleware/passport.js";
import { addClient, getClient, deleteClient, updateClient, getClientInfo } from '../controllers/Client.js';
const router = express.Router();
router.post("/addClient", checkAuthenticated, addClient);
router.get("/getClient", checkAuthenticated, getClient);
router.post("/getClientInfo", checkAuthenticated, getClientInfo);
router.post("/deleteClient", checkAuthenticated, deleteClient);
router.patch("/updateClient", updateClient);
export {  getClient, deleteClient, updateClient,getClientInfo,addClient };
