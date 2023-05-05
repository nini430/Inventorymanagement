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
    currentPage:number;
    numRows:number;
    
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

export interface getAllInventoriesInput {
    limit?:number;
    page?:number;
}

