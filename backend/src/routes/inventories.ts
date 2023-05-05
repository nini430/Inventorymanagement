import express from 'express'
import { createInventory, getAllInventories } from '../controllers/inventories';

const router=express.Router();

router.route('/').get(getAllInventories).post(createInventory);

export default router;

