import { createSlice } from "@reduxjs/toolkit";
import momment from "momment";
import * as actions from "./api";

const slice = createSlice({
  name: "planets",
  initialState: {
    loading: false,
    list: [],
    lastFetch: null
  },
  reducers: {
    planetsRequested: (planets, action) => {
      planets.loading = true;
    },
    planetsReceived: (planets, action) => {
      planets.list = action.payload;
      planets.loading = false;
      planets.lastFetch = Date.now();
    },
    planetsFailed: (planets, action) => {
      planets.loading = false;
    }
  }
});

const { planetsRequested, planetsReceived, planetsFailed } = slice.actions;

export default slice.reducer;

//use thunk for not repetation of fetch
export const loadPlanets = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.planets;
  const minDiff = momment().diff(momment(lastFetch), "minutes");
  if (minDiff < 10) return;

  dispatch(
    actions.apiCallBegan({
      url: "https://findfalcone.herokuapp.com/planets",
      method: "get",
      onStart: planetsRequested.type,
      onError: planetsFailed.type,
      dataType: planetsReceived.type
      // onSuccess: actions.apiCallSuccess.type,
      // onFailure: actions.apiCallFailure.type
    })
  );
};
