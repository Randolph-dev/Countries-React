import { createSlice } from "@reduxjs/toolkit";
import { getAllCountries } from "../services/countriesServices"; // Adjust this path if needed

const initialState = {
  countries: [],
  isLoading: true,
  search: "",
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    search(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers() {},
});

export const { getCountries, isLoading, search } = countriesSlice.actions;

export const initializeCountries = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    try {
      const countries = await getAllCountries();
      dispatch(getCountries(countries));
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export default countriesSlice.reducer;
