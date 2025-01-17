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

// Create a slice for managing the candidates statistics based on the status
const statsSlice = createSlice({
  name: "stats",
  initialState: {
    Pending: 0,
    Hired: 0,
    Reviewed: 0,
  },
  reducers: {
    updateStats: (state, action) => {
      state.Pending = action.payload.Pending;
      state.Hired = action.payload.Hired;
      state.Reviewed = action.payload.Reviewed;
    },
  },
});

// Create Slice for to render the card component
const addSlice = createSlice({
  name: "add",
  initialState: {
    showAddCard: false,
  },
  reducers: { 
    toggleAdd: (state) => {
      state.showAddCard = !state.showAddCard;
    },
  }
}) 

// Create the Redux store
const store = configureStore({
  reducer: {
    search: searchSlice.reducer, // Use the reducer from searchSlice
    modal: modalSlice.reducer, // Use the reducer from modalSlice
    stats: statsSlice.reducer, // Use the reducer from statsSlice
    add: addSlice.reducer, // Use the reducer from addSlice
    
  },
});

// Export actions and store
export const { setSearch } = searchSlice.actions;
export const { openModal, closeModal } = modalSlice.actions;
export const { updateStats } = statsSlice.actions;
export const { toggleAdd } = addSlice.actions;
export default store;
