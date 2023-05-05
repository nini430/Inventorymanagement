import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  BasicInventory,
  Inventory,
  InventoryForm,
  InventoryInitialState,
  getAllInventoriesInput,
} from '../types/inventories';
import axiosApiInstance from '../utils/axios';

const initialState: InventoryInitialState = {
  total: 0,
  prevPage: null,
  nextPage: null,
  data: null,
  numOfPages: 0,
  getAllInventoriesPending: false,
  getInventoryPending: false,
  updateInventoryPending: false,
  deleteInventoryPending: false,
  createInventoryPending: false,
  singleInventory: null,
  currentPage: 1,
  numRows: 20,
  errors: {},
};

export const getAllInventories = createAsyncThunk(
  'inventories/getAllInventories',
  async ({ limit, page }: getAllInventoriesInput, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<BasicInventory>(
        '/inventories',
        { params: { limit, page } }
      );
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const createInventory = createAsyncThunk(
  'inventories/createInventory',
  async (
    {
      input,
      limit,
      onSuccess,
    }: { input: InventoryForm; limit: number; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.post<{
        data: Inventory;
        page: number;
      }>('/inventories', input, { params: { limit } });
      onSuccess && onSuccess();
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getSingleInventory=createAsyncThunk('inventories/getSingleInventory',async(id:string,thunkApi)=>{
    try{
      const response=await axiosApiInstance.get<{data:Inventory}>(`/inventories/${id}`);
      return response.data.data;
    }catch(err) {
      return thunkApi.rejectWithValue(err);
    }
})

const inventoryReducer = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changeNumRows: (state, action: PayloadAction<number>) => {
      state.numRows = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    clearSingleinventory:(state)=>{
      state.singleInventory=null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllInventories.pending, (state) => {
      state.getAllInventoriesPending = true;
    });
    builder.addCase(getAllInventories.fulfilled, (state, action) => {
      state.getAllInventoriesPending = false;
      state.data = action.payload?.data as Inventory[];
      state.numOfPages = action.payload?.numOfPages as number;
      state.total = action.payload?.total as number;
      state.nextPage = action.payload?.nextPage as number | null;
      state.prevPage = action.payload?.prevPage as number | null;
    });
    builder.addCase(getAllInventories.rejected, (state) => {
      state.getAllInventoriesPending = false;
    });
    builder.addCase(createInventory.pending, (state) => {
      state.createInventoryPending = true;
    });
    builder.addCase(createInventory.fulfilled, (state, action) => {
      state.createInventoryPending = false;
      state.currentPage = action.payload?.page as number;
    });
    builder.addCase(createInventory.rejected, (state, action: any) => {
      state.createInventoryPending = false;
      state.errors = action.payload.response.data.error;
    });
    builder.addCase(getSingleInventory.pending,(state)=>{
      state.getInventoryPending=true;
    });
    builder.addCase(getSingleInventory.fulfilled,(state,action)=>{
      state.getInventoryPending=false;
      state.singleInventory=action.payload;
    });
    builder.addCase(getSingleInventory.rejected,(state)=>{
      state.getInventoryPending=false;
    })
  },
});

export const { changePage, changeNumRows, clearErrors, clearSingleinventory } =
  inventoryReducer.actions;

export default inventoryReducer.reducer;
