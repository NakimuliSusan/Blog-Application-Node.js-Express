import express, { Router } from 'express';
import { addUser, getAllusers, loginUser   } from '../controllers/User-controller';


const router = express.Router();

router.get("/", getAllusers)

router.post("/adduser", addUser)

router.post("/loginuser" , loginUser)

export default router;