import express from "express"
import { checkAuthenticated } from "../middleware/passport.js"
import { addClient, getClient,deleteClient, updateClient } from '../controllers/Client.js';
const router = express.Router()

router.post("/addClient",checkAuthenticated,addClient)
router.post("/getClient",checkAuthenticated,getClient)
router.post("/deleteClient",checkAuthenticated,deleteClient)
router.patch("/updateClient",updateClient)
export {addClient, getClient,deleteClient, updateClient}
 