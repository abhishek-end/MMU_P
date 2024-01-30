import  express  from "express";
import { test } from "../controller/user.controller.js";
const router = express.Router();

router.use("/test" , test)

export default router