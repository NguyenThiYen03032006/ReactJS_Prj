import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios  from "axios";

export interface Employee {
  userId: string;
  role: string;
}

interface EmployeeState {
  listEmployees: Employee[];
  status: "idle" | "pending" | "fullfilled" | "rejected";
  error: null | string;
}

const initialState: EmployeeState = {
  listEmployees: [],
  status: "idle",
  error: null,
};

export const fetchMember = createAsyncThunk(
  "member/fetchMember",
  async (idPrj: string) => {
    const res = await axios.get(`http://localhost:8080/project/${idPrj}`);
    return res.data;
  }
);
export const addMember = createAsyncThunk(
  'member/addMember',
  async ({ idPrj, newEmployee }: { idPrj: string; newEmployee: Employee }) => {
    try {
      const res = await axios.get(`http://localhost:8080/project/${idPrj}`);
      const project = res.data;
      const updatedMembers = [...project.members, newEmployee];
      const updateRes = await axios.put(`http://localhost:8080/project/${idPrj}`, {
        ...project,
        members: updatedMembers,
      });

      return updateRes.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export const updateMemberRole = createAsyncThunk(
  "member/updateMemberRole",
  async ({
    idPrj,
    userId,
    newRole,
  }: {
    idPrj: string;
    userId: string;
    newRole: string;
  }) => {
    try {
      const res = await axios.get(`http://localhost:8080/project/${idPrj}`);
      const project = res.data;
      const updatedMembers = project.members.map((m: Employee) =>
        m.userId === userId ? { ...m, role: newRole } : m
      );

      const updateRes = await axios.put(
        `http://localhost:8080/project/${idPrj}`,
        { ...project, members: updatedMembers }
      );

      return updateRes.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
export const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async ({ idPrj, userId }: { idPrj: string; userId: string }) => {
    try {
      // Lấy project hiện tại
      const res = await axios.get(`http://localhost:8080/project/${idPrj}`);
      const project = res.data;

      // Lọc bỏ member muốn xóa
      const updatedMembers = project.members.filter(
        (m: Employee) => m.userId !== userId
      );

      // Cập nhật lại project
      const updateRes = await axios.put(`http://localhost:8080/project/${idPrj}`, {
        ...project,
        members: updatedMembers,
      });

      return updateRes.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);



const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //fetch
      .addCase(fetchMember.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMember.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.listEmployees = action.payload.members || [];
      })
      .addCase(fetchMember.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Lỗi khi tải dữ liệu";
      })
    //add
        .addCase(addMember.pending,(state)=>{state.status='pending'})
        .addCase(addMember.fulfilled, (state, action) => {
            state.status = "fullfilled";
            if (action.payload) {
                state.listEmployees.push(action.payload);
            }
            })
        .addCase(addMember.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload as string;
        })
        .addCase(updateMemberRole.fulfilled, (state, action) => {
            state.status = "fullfilled";
            if (action.payload && action.payload.members) {
                state.listEmployees = action.payload.members;
            }
        })
        //delete
        .addCase(deleteMember.pending, (state) => {
            state.status = "pending";
        })
        .addCase(deleteMember.fulfilled, (state, action) => {
            state.status = "fullfilled";
            if (action.payload && action.payload.members) {
                state.listEmployees = action.payload.members;
            }
        })
        .addCase(deleteMember.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.error.message || "Xóa member thất bại";
        });
   
  },
});

// export const { setEmployees, clearEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
