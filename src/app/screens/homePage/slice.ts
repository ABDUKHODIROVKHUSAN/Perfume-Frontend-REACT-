import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
popularPerfumes: [],
comingSoon: [], 
};

const homePageSlice = createSlice ({
name: "homePage",
initialState,
reducers: {
    setPopularPerfumes : (state, action) => {
        state.popularPerfumes = action.payload // storeda saqlamoqchi bolgan datamiz keladi
    },
    setComingSoon : (state, action) => {
        state.comingSoon = action.payload
    },
   
}
})

export const {setComingSoon, setPopularPerfumes} 
= homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer
export default HomePageReducer;