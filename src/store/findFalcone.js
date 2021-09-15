import { createSlice } from "@reduxjs/toolkit";

import * as actions from "./api";

const slice = createSlice({
  name: "findFalcone",
  initialState: {
    isPlanetsDataLoading: false,
    planetsData: [],
    isVehicalsDataLoading: false,
    vehicalsData: []
  },
  reducers: {
    planetsRequested: (planets, action) => {
      planets.isPlanetsDataLoading = true;
    },
    planetsReceived: (planets, action) => {
      planets.planetsData = action.payload;
      planets.isPlanetsDataLoading = false;
    },
    planetsFailed: (planets, action) => {
      planets.isPlanetsDataLoading = false;
    },
    vehicalsRequested: (vehicals, action) => {
      vehicals.isVehicalsDataLoading = true;
    },
    vehicalsReceived: (vehicals, action) => {
      vehicals.vehicalsData = action.payload;
      vehicals.isVehicalsDataLoading = false;
    },
    vehicalsFailed: (vehicals, action) => {
      vehicals.isVehicalsDataLoading = false;
    }
  }
});

const {
  planetsRequested,
  planetsReceived,
  planetsFailed,
  vehicalsRequested,
  vehicalsReceived,
  vehicalsFailed
} = slice.actions;

export default slice.reducer;

//use thunk for not repetation of fetch
export const loadPlanets = () => (dispatch, getState) => {
  dispatch(
    actions.apiCallBegan({
      url: "https://findfalcone.herokuapp.com/planets",
      method: "get",
      onStart: planetsRequested.type,
      onError: planetsFailed.type,
      dataType: planetsReceived.type
    })
  );
};

export const loadVehicals = () => (dispatch, getState) => {
  dispatch(
    actions.apiCallBegan({
      url: "https://findfalcone.herokuapp.com/vehicles",
      method: "get",
      onStart: vehicalsRequested.type,
      onError: vehicalsFailed.type,
      dataType: vehicalsReceived.type
    })
  );
};
