import { createSlice } from "@reduxjs/toolkit";
import { perfumesPageState } from "../../../lib/types/screen";

const initialState: perfumesPageState = {
    store: null,
    chosenperfume:null,
    perfumes: [],
    
};

const perfumePageSlice = createSlice({
    name: "perfumePage",
    initialState,
    reducers: {
        setStore: (state, action) => {
            state.store = action.payload;
        },
        setChosenPerfume: (state, action) => {
            state.chosenperfume = action.payload;
        },
        setPerfumes: (state, action) => {
            state.perfumes = action.payload;
        },
    },
});

export const {setStore, setChosenPerfume, setPerfumes} = 
perfumePageSlice.actions;

const PerfumePageReducer = perfumePageSlice.reducer;
export default PerfumePageReducer;