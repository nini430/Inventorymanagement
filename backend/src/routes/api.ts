import express from 'express'
import inventoryRouter from './inventories'

const router=express.Router();

router.use('/inventories',inventoryRouter);


export default router;   

