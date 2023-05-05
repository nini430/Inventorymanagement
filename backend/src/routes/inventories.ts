import express from 'express'
import { getAllInventories } from '../controllers/inventories';

const router=express.Router();

router.route('/').get(getAllInventories)

export default router;

