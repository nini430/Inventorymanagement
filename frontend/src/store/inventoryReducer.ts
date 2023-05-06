import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  BasicInventory,
  Inventory,
  InventoryForm,
  InventoryInitialState,
  LocationFilter,
  SortDirection,
  SortOptions,
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
  filter: '',
  sort:'name_en',
  sortDir:'ASC'
};

export const getAllInventories = createAsyncThunk(
  'inventories/getAllInventories',
  async ({ limit, page, filter,sort,sortDir }: getAllInventoriesInput, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<BasicInventory>(
        '/inventories',
        { params: { limit, page, filter,sort,sortDir } }
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

export const getSingleInventory = createAsyncThunk(
  'inventories/getSingleInventory',
  async (id: string, thunkApi) => {
    try {
      const response = await axiosApiInstance.get<{ data: Inventory }>(
        `/inventories/${id}`
      );
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateInventory = createAsyncThunk(
  'inventories/updateInventories',
  async (
    {
      input,
      id,
      onSuccess,
    }: { input: InventoryForm; id: string; onSuccess: VoidFunction },
    thunkApi
  ) => {
    try {
      const response = await axiosApiInstance.put<{ data: Inventory }>(
        `/inventories/${id}`,
        input
      );
      onSuccess && onSuccess();
      return response.data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const deleteInventory = createAsyncThunk(
  'inventories/deleteInventory',
  async ({id,currentPage,limit,onSuccess}:{id:string,currentPage:number,limit:number,onSuccess:VoidFunction}, thunkApi) => {
    try {
      const response = await axiosApiInstance.delete<{newCurrentPage:number,total:number,lastPage:boolean}>(`/inventories/${id}`,{params:{currentPage,limit}});
      if(!response.data.lastPage) {
        onSuccess();
      }
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

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
    clearSingleinventory: (state) => {
      state.singleInventory = null;
    },
    changeFilter: (state, action: PayloadAction<LocationFilter | ''>) => {
      state.filter = action.payload;
      state.currentPage=1;
    },
    changeSort:(state,action:PayloadAction<{sort:SortOptions,sortDir:SortDirection}>)=>{
      state.sort=action.payload.sort;
      state.sortDir=action.payload.sortDir;
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
    builder.addCase(getSingleInventory.pending, (state) => {
      state.getInventoryPending = true;
    });
    builder.addCase(getSingleInventory.fulfilled, (state, action) => {
      state.getInventoryPending = false;
      state.singleInventory = action.payload;
    });
    builder.addCase(getSingleInventory.rejected, (state) => {
      state.getInventoryPending = false;
    });
    builder.addCase(updateInventory.pending, (state) => {
      state.updateInventoryPending = true;
    });
    builder.addCase(updateInventory.fulfilled, (state, action) => {
      state.updateInventoryPending = false;
      state.data = state.data?.map((item) =>
        item.uuid === action.payload.uuid ? action.payload : item
      ) as Inventory[];
    });
    builder.addCase(updateInventory.rejected, (state) => {
      state.updateInventoryPending = false;
    });
    builder.addCase(deleteInventory.pending, (state) => {
      state.deleteInventoryPending = true;
    });
    builder.addCase(deleteInventory.fulfilled, (state, action) => {
      state.deleteInventoryPending = false;
      state.currentPage=action.payload.newCurrentPage;
      state.total=action.payload.total;
      console.log(action.meta.arg);
      state.data=state.data?.filter(item=>item.uuid!==action.meta.arg.id) as Inventory[];
    });
    builder.addCase(deleteInventory.rejected, (state, action) => {
      state.deleteInventoryPending = false;
    });
  },
});

export const { changePage, changeNumRows, clearErrors, clearSingleinventory,changeFilter,changeSort} =
  inventoryReducer.actions;

export default inventoryReducer.reducer;
