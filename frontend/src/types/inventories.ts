export interface BasicInventory {
    total:number;
    numOfPages:number;
    nextPage:number | null;
    prevPage: number | null;
    data: Inventory[] | null;
}
export interface Names {
    name_en:string;
    name_ka:string;
}

export interface InventoryInitialState extends BasicInventory {
    singleInventory: null | Inventory;
    getAllInventoriesPending: boolean;
    getInventoryPending: boolean;
    updateInventoryPending: boolean;
    deleteInventoryPending: boolean;
    createInventoryPending: boolean;
    currentPage:number;
    numRows:number;
    errors:any;
    
}

export interface Inventory {
    name_en:string;
    name_ka:string;
    uuid:string;
    price:number;
    location:string;
    createdAt: Date;
    updatedAt: Date;
}

export type  InventoryForm= Omit<Inventory,'createdAt'|'updatedAt'|'uuid'|'price'> & {price:number|string}

export interface getAllInventoriesInput {
    limit?:number;
    page?:number;
}

export type VoidFunction=()=>void;