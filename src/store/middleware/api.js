import axios from "axios";
import * as actions from "../api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }
  const { url, method, data, dataType, onStart, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    const respond = await axios.request({ url, method, data });
    dispatch(actions.apiCallSuccess(respond.data));
    if (dataType) dispatch({ type: dataType, payload: respond.data });
  } catch (error) {
    dispatch(actions.apiCallSuccess(error.message));
    dispatch({ type: onError, payload: error.message });
  }
};

export default api;
