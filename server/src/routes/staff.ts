import express from "express"
import { checkAuthenticated } from "../middleware/passport.js"
import { addStaff, getStaff,deleteStaff, updateStaff ,getStaffInfo} from '../controllers/Staff.js';
const router = express.Router()

router.post("/addStaff",checkAuthenticated,addStaff)
router.get("/getStaff",checkAuthenticated,getStaff)
router.post("/getStaffInfo",checkAuthenticated,getStaffInfo)
router.post("/deleteStaff",checkAuthenticated,deleteStaff)
router.patch("/updateStaff",updateStaff)
export {addStaff, getStaff,deleteStaff, updateStaff,getStaffInfo}
 