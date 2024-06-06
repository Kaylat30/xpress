import express from "express"
import { checkAuthenticated } from "../middleware/passport.js"
import { addStagedItem, getStagedItem, deleteStagedItem, updateStagedItem } from "../controllers/Staged.js";
const router = express.Router()

router.post("/addStagedItem",checkAuthenticated,addStagedItem)
router.post("/getStagedItem",checkAuthenticated,getStagedItem)
router.post("/deleteStagedItem",checkAuthenticated,deleteStagedItem)
router.patch("/updateStagedItem",updateStagedItem)
export {addStagedItem, getStagedItem, deleteStagedItem, updateStagedItem}
 