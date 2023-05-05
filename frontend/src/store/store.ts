import {configureStore} from '@reduxjs/toolkit';
import {useDispatch,TypedUseSelectorHook,useSelector} from 'react-redux'
import inventoryReducer from './inventoryReducer';

const store=configureStore({
    reducer:{
        inventory:inventoryReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
