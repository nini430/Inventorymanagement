import express from 'express'
import { createInventory, getAllInventories, getSingleInventory } from '../controllers/inventories';

const router=express.Router();

router.route('/').get(getAllInventories).post(createInventory);
router.route('/:id').get(getSingleInventory);

export default router;

