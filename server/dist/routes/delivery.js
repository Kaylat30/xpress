import express from "express";
import { checkAuthenticated } from "../middleware/passport.js";
import { deleteDelivery, getDelivery, updateDelivery, getDeliveryInfo } from "../controllers/Delivery.js";
const router = express.Router();
router.get("/getDelivery", checkAuthenticated, getDelivery);
router.post("/getDeliveryInfo", checkAuthenticated, getDeliveryInfo);
router.post("/deleteDelivery", checkAuthenticated, deleteDelivery);
router.patch("/updateDelivery", updateDelivery);
export { deleteDelivery, getDelivery, updateDelivery, getDeliveryInfo };
