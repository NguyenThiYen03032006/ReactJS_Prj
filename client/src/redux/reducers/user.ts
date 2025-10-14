import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export interface User{
    id: string,
    fullName: string,
    email: string,
    password: string
}
interface ListUserState{
    status:"idle"|"pending"|'fullfilled'|'rejected',
    lisUser: User[],
    error:null|string,
}
const initialState : ListUserState={
    status:'idle',
    lisUser:[],
    error:null
}

export const fetchUser= createAsyncThunk(
    'user/fetchUser',
    async () => {
        try{
            const res= await axios.get('http://localhost:8080/user')
            return res.data
        }catch(err){
            return err
        }
    }
)
const UserSlice= createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchUser.pending,(state)=>{state.status='pending'})
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status='fullfilled'
            state.lisUser=action.payload
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status='rejected'
            state.error=action.payload as string
        })
    }
})

export default UserSlice.reducer