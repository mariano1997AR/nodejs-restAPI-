import { Router } from "express";
import {getPool} from '../controllers/index.controller.js';


const router = Router();

router.get('/ping',getPool);

export default router;