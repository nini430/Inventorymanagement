import {Request,Response,NextFunction} from 'express'
import asyncHandler from 'express-async-handler';
import db from '../models'
import { BodyType, QueryType } from '../types/inventories';

const INVENTORY_LIMIT='20';
const INVENTORY_PAGE='1'

//@desc Get All Inventories
//@route GET /api/v1/inventories
//@access Public

export const getAllInventories=asyncHandler(async(req:Request<{},{},{},QueryType>,res:Response)=>{
        const {limit=INVENTORY_LIMIT,page=INVENTORY_PAGE}=req.query;
        const count=await db.Inventory.count();
        const inventories=await db.Inventory.findAll({limit,offset:((+page-1)*+limit)});
        const prevPage=+page===1?null:+page-1;
        const nextPage=(+page*+limit)>=count?null:+page+1;
        const numOfPages=Math.ceil(count/+limit);

        return res.status(200).json({data:inventories,prevPage,nextPage,limit:+limit,page:+page,numOfPages,total:count});
})

export const createInventory=asyncHandler(async(req:Request<{},{},BodyType>,res:Response)=>{
        const {name_en,name_ka,location,price}=req.body;  
        const newInventory=await db.Inventory.create({name_en,name_ka,location,price});
        return res.status(201).json({data:newInventory})
})

