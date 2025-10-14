import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  action: string;
  projectIdToDelete: string | null;
  projectIdToFix: string | null;
  search: string; 
  currentPage: number; 
  itemsPerPage: number; 
}

const initialState: ModalState = {
  action: "",
  projectIdToDelete: null,
  projectIdToFix: null,
  search: "",
  currentPage: 1,
  itemsPerPage: 5, // 5 du an / trang
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAction: (state, action: PayloadAction<string>) => {
      state.action = action.payload;
    },
    clearAction: (state) => {
      state.action = "";
      state.projectIdToDelete = null;
      state.projectIdToFix = null;
    },
    setProjectIdToDelete: (state, action: PayloadAction<string>) => {
      state.projectIdToDelete = action.payload;
    },
    setProjectIdToFix: (state, action: PayloadAction<string>) => {
      state.projectIdToFix = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1; //reset ve trang dau khi tim kiem
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setAction,
  clearAction,
  setProjectIdToDelete,
  setProjectIdToFix,
  setSearch,
  setCurrentPage,
} = modalSlice.actions;

export default modalSlice.reducer;
