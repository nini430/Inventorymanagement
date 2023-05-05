import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit';
import {
  BasicInventory,
  Inventory,
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
  singleInventory: null,
  currentPage:1,
  numRows:20
};

export const getAllInventories = createAsyncThunk(
  'inventories/getAllInventories',
  async ({ limit, page }: getAllInventoriesInput) => {
    try {
      const response = await axiosApiInstance.get<BasicInventory>(
        '/inventories',
        { params: { limit, page } }
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const inventoryReducer = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    changePage:(state,action:PayloadAction<number>)=>{
        state.currentPage=action.payload
    },
    changeNumRows:(state,action:PayloadAction<number>)=>{
       state.numRows=action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllInventories.pending, (state) => {
      state.getAllInventoriesPending = true;
    });
    builder.addCase(getAllInventories.fulfilled, (state, action) => {
      state.getAllInventoriesPending=false;
      state.data = action.payload?.data as Inventory[];
      state.numOfPages=action.payload?.numOfPages as number;
      state.total=action.payload?.total as number;
      state.nextPage=action.payload?.nextPage as number|null;
      state.prevPage=action.payload?.prevPage as number|null;
    });
    builder.addCase(getAllInventories.rejected, (state, action) => {
        state.getAllInventoriesPending=false;
      console.log(action.error.message);
    });
  },
});

export const {changePage,changeNumRows}=inventoryReducer.actions;

export default inventoryReducer.reducer;
