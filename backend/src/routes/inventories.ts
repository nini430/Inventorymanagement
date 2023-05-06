import express from 'express'
import { createInventory, deleteInventory, getAllInventories, getSingleInventory, updateInventory } from '../controllers/inventories';

const router=express.Router();

router.route('/').get(getAllInventories).post(createInventory);
router.route('/:id').get(getSingleInventory).put(updateInventory).delete(deleteInventory);

export default router;

