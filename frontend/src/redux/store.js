import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice for searching the candidates
const searchSlice = createSlice({
  name: "search",
  initialState: {
    nameSearch: "",
    filteredValue: "none",
  },
  reducers: {
    setSearch: (state, action) => {
      state.nameSearch = action.payload.nameSearch;
      state.filteredValue = action.payload.filteredValue;
    },
  },
});

// Create a slice for managing the modal state
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

// Create the Redux store
const store = configureStore({
  reducer: {
    search: searchSlice.reducer, // Use the reducer from searchSlice
    modal: modalSlice.reducer, // Use the reducer from modalSlice
  },
});

// Export actions and store
export const { setSearch } = searchSlice.actions;
export const { openModal, closeModal } = modalSlice.actions;
export default store;
