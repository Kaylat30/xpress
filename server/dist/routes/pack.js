import express from "express";
import { checkAuthenticated } from "../middleware/passport.js";
import { getPack, updatePack } from "../controllers/Pack.js";
const router = express.Router();
router.get("/getPack", checkAuthenticated, getPack);
router.patch("/updatePack", updatePack);
export { getPack, updatePack };
