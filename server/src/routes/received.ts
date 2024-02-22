import express from "express"
import { checkAuthenticated } from "../middleware/passport.js"
import { addItem, getItem, deleteItem, updateItem, checkout } from "../controllers/Received.js";
const router = express.Router()

router.post("/addItem",checkAuthenticated,addItem)
router.post("/getItem",checkAuthenticated,getItem)
router.post("/deleteItem",checkAuthenticated,deleteItem)
router.patch("/updateItem",updateItem)
router.post('/checkout',checkAuthenticated,checkout);
export {addItem, getItem, deleteItem, updateItem, checkout}
 