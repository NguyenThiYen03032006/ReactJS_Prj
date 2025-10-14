import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export interface Task{
    id: string,
    taskName: string,
    assigneeId: string,
    assigneeName:string,
    projectId: string,
    asignDate: string,
    dueDate: string,
    priority: "Cao" | "Trung bình" | "Thấp",
    progress:"Đúng tiến độ" | "Có rủi ro" | "Trễ hạn",
    status:"To do" | "In Progress" |"Pending" |"Done"
}

interface ListTaskState{
    status: "idle"|"pending"|"fullfilled"|"rejected",
    listTask: Task[],
    error: null| string
    taskEdit:Task |null
    sortBy: "choose" | "priority" | "progress";
}

const initialState:ListTaskState={
    status:'idle',
    listTask:[],
    error:null,
    taskEdit:null,
    sortBy: "choose",
}

export const fetchTask=createAsyncThunk(
    'task/fetchTask',
    async()=>{
        try{
            const res= await axios.get('http://localhost:8080/task')
            return res.data
        }catch(err){
            return err
        }
    }
)

export const addTask= createAsyncThunk(
    'task/addTask',
    async(task:Task)=>{
        try{
            const res= await axios.post('http://localhost:8080/task',task)
            return res.data
        }catch (err){
            return err
        }
    }
)

export const deleteTask= createAsyncThunk(
    'task/deleteTask',
    async(id: string)=>{
        await axios.delete(`http://localhost:8080/task/${id}`)
        return id;
    }
)

export const fixTask= createAsyncThunk(
    'task/fixTask',
    async(task:Task)=>{
        try {
            const res= await axios.put(`http://localhost:8080/task/${task.id}`,task)
            return res.data
        } catch (error) {
            return error
        }
    }
)
const TaskSlice= createSlice({
    name: 'task',
    initialState,
    reducers:{
        editTask:(state,action:{payload:Task|null})=>{
            state.taskEdit=action.payload
        },
        setSortBy: (state, action: PayloadAction<"choose" | "priority" | "progress">) => {
      state.sortBy = action.payload;
    },
    },
    extraReducers(builder) {
        builder
        //fetch
        .addCase(fetchTask.pending,(state)=>{state.status='pending'})
        .addCase(fetchTask.fulfilled,(state,action)=>{
            state.status='fullfilled'
            state.listTask=action.payload
        })
        .addCase(fetchTask.rejected,(state,action)=>{
            state.status='rejected'
            state.error=action.payload as string
        })
        //add
        .addCase(addTask.pending,(state)=>{state.status='pending'})
        .addCase(addTask.fulfilled,(state,action)=>{
            state.status='fullfilled'
            state.listTask.push(action.payload)
        })
        .addCase(addTask.rejected,(state,action)=>{
            state.status='rejected'
            state.error=action.payload as string
        })
        //delete
        .addCase(deleteTask.pending,(state)=>{state.status='pending'})
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.status='fullfilled'
            state.listTask=state.listTask.filter((t)=>t.id!==action.payload)
        })
        .addCase(deleteTask.rejected,(state,action)=>{
            state.status='rejected'
            state.error=action.payload as string
        })
        // fix
        .addCase(fixTask.pending,(state)=>{state.status='pending'})
        .addCase(fixTask.fulfilled,(state,action)=>{
            state.status='fullfilled'
            const index= state.listTask.findIndex((t)=>t.id===action.payload.id)
            if(index!==-1){
                state.listTask[index]=action.payload
            }
            state.taskEdit=null
        })
        .addCase(fixTask.rejected,(state,action)=>{
            state.status='rejected'
            state.error=action.payload as string
        })
    }
})
export const { setSortBy } = TaskSlice.actions;
export default TaskSlice.reducer