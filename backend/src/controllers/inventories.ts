import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import db from '../models';
import { BodyType, QueryType } from '../types/inventories';
import ErrorResponse from '../utils/errorResponse';

const INVENTORY_LIMIT = '20';
const INVENTORY_PAGE = '1';

//@desc Get All Inventories
//@route GET /api/v1/inventories
//@access Public

export const getAllInventories = asyncHandler(
  async (req: Request<{}, {}, {}, QueryType>, res: Response) => {
    let inventories;
    let count;
    const { limit = INVENTORY_LIMIT, page = INVENTORY_PAGE } = req.query;
    count = await db.Inventory.count();
    inventories = await db.Inventory.findAll({
      limit,
      offset: (+page - 1) * +limit,
      order: [[req.query.sort, req.query.sortDir]],
    });
    if (req.query.filter) {
      inventories = await db.Inventory.findAll({
        limit,
        offset: (+page - 1) * +limit,
        order: [['createdAt', 'DESC']],
        where: { location: req.query.filter },
      });
      count = await db.Inventory.count({
        where: { location: req.query.filter },
      });
    }
    const prevPage = +page === 1 ? null : +page - 1;
    const nextPage = +page * +limit >= count ? null : +page + 1;
    const numOfPages = Math.ceil(count / +limit);

    return res.status(200).json({
      data: inventories,
      prevPage,
      nextPage,
      limit: +limit,
      page: +page,
      numOfPages,
      total: count,
    });
  }
);

//@desc Create Inventory
//@route POST /api/v1/inventories
//@access Public

export const createInventory = asyncHandler(
  async (req: Request<{}, {}, BodyType, QueryType>, res: Response) => {
    const { name_en, name_ka, location, price } = req.body;
    const { limit } = req.query;
    const newInventory = await db.Inventory.create({
      name_en,
      name_ka,
      location,
      price,
    });
    const count = await db.Inventory.count();
    const lastPage = Math.ceil(count / +limit);
    return res.status(201).json({ data: newInventory, page: lastPage });
  }
);

//@desc Get Single Inventory
//@route GET /api/v1/inventories/:id
//@access Public

export const getSingleInventory = asyncHandler(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const inventory = await db.Inventory.findOne({
      where: { uuid: req.params.id },
    });
    if (!inventory) {
      return next(
        new ErrorResponse(`No inventory is found with id ${req.params.id}`, 404)
      );
    }
    return res.status(200).json({ data: inventory });
  }
);

//@desc Update Inventory
//@route PUT /api/v1/inventories/:id
//@access Public

export const updateInventory = asyncHandler(
  async (
    req: Request<{ id: string }, {}, BodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const { name_en, name_ka, location, price } = req.body;
    const inventory = await db.Inventory.findOne({
      where: { uuid: req.params.id },
    });
    if (!inventory) {
      return next(
        new ErrorResponse(`no inventory found with id ${req.params.id}`, 404)
      );
    }
    inventory.name_en = name_en;
    inventory.name_ka = name_ka;
    inventory.location = location;
    inventory.price = price;
    await inventory.save();
    return res.status(200).json({ data: inventory });
  }
);

//@desc Delete Inventory
//@route DELETE /api/v1/inventories/:id
//@access Public

export const deleteInventory = asyncHandler(
  async (
    req: Request<
      { id: string },
      {},
      {},
      { limit: string; currentPage: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const { currentPage, limit } = req.query;
    let lastPage;
    let newCurrentPage = +currentPage;
    const inventory = await db.Inventory.findOne({
      where: { uuid: req.params.id },
    });
    if (!inventory) {
      return next(
        new ErrorResponse(
          `No inventory is found with id of ${req.params.id}`,
          404
        )
      );
    }
    await inventory.destroy();
    const count = await db.Inventory.count();
    if (
      count !== 0 &&
      count % +req.query.limit === 0 &&
      +limit * (+currentPage - 1) === count
    ) {
      newCurrentPage = +req.query.currentPage - 1;
      lastPage = true;
    }

    return res.status(200).json({ newCurrentPage, total: count, lastPage });
  }
);
