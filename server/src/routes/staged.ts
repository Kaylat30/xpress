import express from "express"
import { checkAuthenticated } from "../middleware/passport.js"
import { addStagedItem, getStagedItem, deleteStagedItem, updateStagedItem ,getStagedItemInfo} from "../controllers/Staged.js";
const router = express.Router()

router.post("/addStagedItem",checkAuthenticated,addStagedItem)
router.post("/getStagedItem",checkAuthenticated,getStagedItem)
router.post("/getStagedItemInfo",checkAuthenticated,getStagedItemInfo)
router.post("/deleteStagedItem",checkAuthenticated,deleteStagedItem)
router.patch("/updateStagedItem",updateStagedItem)
export {addStagedItem, getStagedItem, deleteStagedItem, updateStagedItem,getStagedItemInfo}
 