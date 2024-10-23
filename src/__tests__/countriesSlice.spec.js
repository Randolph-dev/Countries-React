import { configureStore } from "@reduxjs/toolkit";
import { getAllCountries } from "../services/countriesServices";
import countriesReducer from "../store/countriesSlice";

describe("countriesSlice tests: ", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        countries: countriesReducer,
      },
    });
    console.log(store.getState());
  });

  it("initial state exists", () => {
    expect(store.getState().countries).toBeDefined();
  });
  // Tests below will be to check the redux state at different points following certain actions
  it("countries should contain an initial state with certain properties", () => {
    const { countries, isLoading, search } = store.getState().countries;
    // can also be written like:
    // const countries = store.getState().countries.countries
    // const isLoading = store.getState().countries.isLoading
    // const search = store.getState().countries.search

    expect(countries).toEqual([]);
    expect(isLoading).toBe(true);
    expect(search).toBe("");
  });

  it("should handle getCountries action inside countriesSlice", () => {
    const countriesPayload = [{ name: "Nigeria" }];

    store.dispatch({
      type: "countries/getCountries",
      payload: countriesPayload,
    });
    console.log(
      "Countries after payload: ",
      store.getState().countries.countries
    );
    expect(store.getState().countries.countries).toEqual(countriesPayload);
  });
});

// Need to fix below:
describe("Countries API should return data", () => {
  let data;
  let store;

  beforeAll(async () => {
    data = await getAllCountries();
  });

  beforeAll(async () => {
    store = configureStore({
      reducer: {
        countries: countriesReducer,
      },
    });
  });

  it("Should handle initializeCountries action", async () => {
    console.log("Data after fetch before test: ", data);
    store.dispatch({
      type: "countries/getCountries",
      payload: data,
    });

    expect(store.getState().countries.countries).toEqual(data);

    const testData = store.getState().countries.countries;

    testData.forEach((country) => {
      expect(country).toHaveProperty("name");
      expect(country).toHaveProperty("area");
      expect(country).toHaveProperty("population");
    });
  });
});