import express from "express"
import { checkAuthenticated } from "../middleware/passport.js"
import { deleteDelivery, getDelivery, updateDelivery } from "../controllers/Delivery.js";
const router = express.Router()

router.get("/getDelivery",checkAuthenticated,getDelivery)
router.post("/deleteDelivery",checkAuthenticated,deleteDelivery)
router.patch("/updateDelivery",updateDelivery)
export {deleteDelivery, getDelivery, updateDelivery}
 