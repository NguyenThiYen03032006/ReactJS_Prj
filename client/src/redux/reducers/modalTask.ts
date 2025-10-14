import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface ModalTaskState{
    action: string
    taskIdToDelete: string|null
    taskIdToFix: string|null
    taskIdToMember: string|null
    search: string
}

const initialState:ModalTaskState={
    action:'',
    taskIdToDelete:null,
    taskIdToFix:null,
    taskIdToMember:null,
    search:'',
}

const modalTaskSlice= createSlice({
    name:'modalTask',
    initialState,
    reducers:{
        setActionTask:(state,action:PayloadAction<string>)=>{
            state.action=action.payload
        },
        clearActionTask:(state)=>{
            state.action=''
        },
        setTaskIdToDelete:(state,action:PayloadAction<string>)=>{
            state.taskIdToDelete=action.payload
        },
        setTaskIdToFix:(state,action:PayloadAction<string>)=>{
            state.taskIdToFix=action.payload
        },
        setTaskIdToMember:(state,action:PayloadAction<string>)=>{
            state.taskIdToMember=action.payload
        },
        setTaskSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    }
})
export const {setActionTask,clearActionTask,setTaskIdToDelete,setTaskIdToFix,setTaskIdToMember,setTaskSearch}=modalTaskSlice.actions
export default modalTaskSlice.reducer