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
    totalTimeTaken: 0,
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
      const { id, selectedPlanet, selectedPlanetDistance } = action.payload;
      const { selectedData, vehicalsData, planetsData } = findFalcone;

      selectedData[id].selectedPlanet = selectedPlanet;
      selectedData[id].selectedPlanetDistance = selectedPlanetDistance;

      selectedData[id].availableVehicals = vehicalsData.filter(
        (vehical) => vehical.max_distance >= selectedPlanetDistance
      );

      //del selected one planet data from planetsData
      planetsData.map((planet) => planet.name !== selectedPlanet);
      //assigining available planets to all other
      selectedData.map((data, index) => {
        if (index !== id) {
          data.availablePlanets = data.availablePlanets.filter(
            (planet) => planet.name !== selectedPlanet
          );
          return data;
        }
        return data;
      });
    },
    vehicalSelected: (findFalcone, action) => {
      const { id, selectedVehical } = action.payload;
      const { selectedData, vehicalsData } = findFalcone;
      selectedData[id].selectedVehical = selectedVehical;
      vehicalsData.map((vehical) => {
        if (vehical.name === selectedVehical && vehical.total_no > 0) {
          vehical.total_no -= 1;
          return vehical;
        }
        return vehical;
      });

      const { selectedPlanetDistance } = selectedData[id];
      const vehicalData = vehicalsData.filter(
        (vehical) => vehical.name === selectedVehical
      );
      console.log(vehicalsData);
      // findFalcone.totalTimeTaken = Math.ceil(selectedPlanetDistance / speed);
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
  planetSelected,
  vehicalSelected
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
