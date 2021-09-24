import { createSlice } from "@reduxjs/toolkit";

import * as actions from "./api";

const planetInfo = {
  selectedPlanet: "",
  selectedVehical: "",
  selectedPlanetDistance: "",
  availablePlanets: [],
  availableVehicals: []
};
const selectedDefaultData = [];

for (let i = 0; i < 4; i++) {
  selectedDefaultData.push({ ...planetInfo, id: i });
}

const slice = createSlice({
  name: "findFalcone",
  initialState: {
    selectedData: selectedDefaultData,
    isPlanetsDataLoading: false,
    planetsData: [],
    isVehicalsDataLoading: false,
    vehicalsData: []
  },
  reducers: {
    planetsRequested: (findFalcone, action) => {
      findFalcone.isPlanetsDataLoading = true;
    },
    planetsReceived: (findFalcone, action) => {
      findFalcone.planetsData = action.payload;
      findFalcone.isPlanetsDataLoading = false;
      findFalcone.selectedData.map((data) => {
        return (data.availablePlanets = Object.values(findFalcone.planetsData));
      });
    },
    planetsFailed: (findFalcone, action) => {
      findFalcone.isPlanetsDataLoading = false;
    },
    vehicalsRequested: (findFalcone, action) => {
      findFalcone.isVehicalsDataLoading = true;
    },
    vehicalsReceived: (findFalcone, action) => {
      findFalcone.vehicalsData = action.payload;
      findFalcone.isVehicalsDataLoading = false;
    },
    vehicalsFailed: (findFalcone, action) => {
      findFalcone.isVehicalsDataLoading = false;
    },
    planetSelected: (findFalcone, action) => {
      findFalcone.selectedData[action.payload.id].selectedPlanet =
        action.payload.selectedPlanet;
      const selectedPlanetData = findFalcone.planetsData.filter((data) => {
        if (data.name === action.payload.selectedPlanet) return data.distance;
        return null;
      });
      findFalcone.selectedData[action.payload.id].selectedPlanetDistance =
        selectedPlanetData[0].distance;
      findFalcone.selectedData[action.payload.id].availableVehicals =
        findFalcone.vehicalsData;
    }
  }
});

export const {
  planetsRequested,
  planetsReceived,
  planetsFailed,
  vehicalsRequested,
  vehicalsReceived,
  vehicalsFailed,
  planetSelected
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
