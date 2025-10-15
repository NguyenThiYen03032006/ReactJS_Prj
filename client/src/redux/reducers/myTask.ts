import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface myModal{
    search: string
    sortBy: "choose" | "priority" | "progress";
}

const initialState:myModal={
    search:'',
    sortBy: "choose",
}
const modalMyTaskSlice= createSlice({
    name:'modalMyTask',
    initialState,
    reducers:{
        setMySearch:(state,action: PayloadAction<string>)=>{
            state.search=action.payload
        },
        setSortByMy: (state, action: PayloadAction<"choose" | "priority" | "progress">) => {
      state.sortBy = action.payload;
    },
    }
})

export const{setMySearch, setSortByMy}= modalMyTaskSlice.actions
export default modalMyTaskSlice.reducer