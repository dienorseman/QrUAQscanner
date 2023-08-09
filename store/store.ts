import { configureStore } from "@reduxjs/toolkit";
import { qrSlice } from './qr/qrSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({

    reducer: {
        qr: qrSlice.reducer 
    },
    
});

export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector

