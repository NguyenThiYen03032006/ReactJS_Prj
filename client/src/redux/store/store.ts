import { configureStore } from "@reduxjs/toolkit";
import listUserReducer from '../reducers/user'
import listProjectReducer from '../reducers/project'
import listTaskReducer from '../reducers/task'
import modalReducer from '../reducers/modal'
import modalTaskReducer from '../reducers/modalTask'
import employeesReducer from '../reducers/employees'
import myTaskReducer from'../reducers/myTask'
export const store =configureStore({
    reducer:{
        listUser:listUserReducer,
        listProject:listProjectReducer,
        listTask:listTaskReducer,
        modal:modalReducer,
        modalTask:modalTaskReducer,
        employees:employeesReducer,
        myTask:myTaskReducer,
    }
})

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch