import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface Member{
    userId: string,
    role: string | "Project owner"
}
export interface Project{
    id: string,
    projectName: string,
    image: string,
    description:string,
    members: Member[]
}

interface ListProjectState{
    status:"idle"|"pending"|"fullfilled"|"rejected",
    listProject:Project[],
    error:null | string,
    prjEdit:Project|null
}

const initialState : ListProjectState={
    status: "idle",
    listProject:[],
    error: null,
    prjEdit:null
}

export const fetchProject= createAsyncThunk(
    'prj/fetchProject',
    async()=>{
        try{
            const res= await axios.get('http://localhost:8080/project')
            return res.data
        }catch (err){
            return err
        }
    }
)

export const addProject= createAsyncThunk(
    'prj/addPrj',
    async (prj:Project)=>{
        try{
            const res=await axios.post('http://localhost:8080/project',prj)
            return res.data
        }catch (err){
            return err
        }
    }
)

export const deleteProject = createAsyncThunk(
  "prj/deleteProject",
  async (id: string) => {
    await axios.delete(`http://localhost:8080/project/${id}`);
    return id; // trả về id để remove khỏi state
  }
);

export const fixProject= createAsyncThunk(
    'prj/fixPrj',
    async(prj:Project)=>{
        try{
            const res=await axios.put(`http://localhost:8080/project/${prj.id}`,prj)
            return res.data
        }catch(err){
            return err
        }
    }
)
const ProjectSlice= createSlice({
    name:'project',
    initialState,
    reducers:{
        editPrj:(state,action:{payload:Project|null})=>{
            state.prjEdit=action.payload
        }
    },
    extraReducers(builder){
        builder
        //fetch
        .addCase(fetchProject.pending,(state)=>{state.status='pending'})
        .addCase(fetchProject.fulfilled,(state,action)=>{
            state.status='fullfilled'
            state.listProject=action.payload
        })
        .addCase(fetchProject.rejected,(state,action)=>{
            state.status='rejected'
            state.error=action.payload as string
        })
        //ADD
        .addCase(addProject.pending,(state)=>{state.status='pending'})
        .addCase(addProject.fulfilled,(state,action)=>{
            state.status='fullfilled'
            state.listProject.push(action.payload)
        })
        .addCase(addProject.rejected,(state,action)=>{
            state.status='rejected'
            state.error=action.payload as string
        })
        // DELETE
      .addCase(deleteProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.listProject = state.listProject.filter(
          (prj) => prj.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      })
      // FIX
      .addCase(fixProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fixProject.fulfilled, (state, action) => {
        state.status = "fullfilled";
        const index=state.listProject.findIndex((prj)=>prj.id==action.payload.id)
        if(index!==-1){
            state.listProject[index]=action.payload
        }
        state.prjEdit=null
      })
      .addCase(fixProject.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload as string;
      });
    }
})
export default ProjectSlice.reducer