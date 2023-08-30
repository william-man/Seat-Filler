import axios from "axios";
import filmReducer from "../../features/films/filmSlice.js";
import { fetchFilms } from "../../features/films/filmSlice.js";
import MockAdapter from "axios-mock-adapter";

// test for filmsReducer

const initialState = {
  isLoading: false,
  isError: false,
  data: "",
};

xtest("fetchFilms.pending should set isLoading to true and isError to false.", () => {
  const newState = filmReducer(initialState, fetchFilms.pending());
  expect(newState.isLoading).toBe(true);
  expect(newState.isError).toBe(false);
});

xtest("fetchFilms.rejected should set isLoading to false and isError true and return an error payload.", () => {
  const error = "Fetch error.";
  const action = { ...fetchFilms.rejected(), payload: error };
  const state = filmReducer(initialState, action);

  expect(state.isLoading).toBe(false);
  expect(state.isError).toBe(true);
  expect(state.data).toBe(error);
});

xtest("fetchFilms.fulfilled should set isLoading to false and isError false and return a payload.", () => {
  const result = "Success.";
  const action = { ...fetchFilms.fulfilled(), payload: result };
  const state = filmReducer(initialState, action);

  expect(state.isLoading).toBe(false);
  expect(state.isError).toBe(false);
  expect(state.data).toBe(result);
});

// tests for fetchFilms, the createAsyncThunk fuction
const mockAxios = new MockAdapter(axios);

describe("fetchFilms returns the correct request", () => {
  //reset mock after each test
  afterEach(() => {
    mockAxios.reset();
  });

  it("should return the correct films data on successful request.", async () => {
    //mock film data
    const dummy = [
      { id: 1, title: "film A" },
      { id: 2, title: "film B" },
    ];
    mockAxios.onGet("/films").reply(200, dummy);

    const result = await fetchFilms();
    expect(result).toEqual(dummy);
  });
});
