import {
  aqi_failure,
  aqi_request,
  aqi_success,
  setActiveCity,
  setActiveStation,
  setActiveSubstance,
} from '../../components/Redux/src/dataSlices';
import { ApiHandler } from './workWithAPI';

export const FetchWithThunk = (url) => async (dispatch, getState) => {
  // loading
  dispatch(aqi_request());

  const response = await (await fetch(url)).json();
  const data = response.data;

  console.log(data, data.length, ' Data from thunk ');
  // success
  if (data && data.length > 0) {
    let sortedData = ApiHandler(data);

    dispatch(setActiveCity(sortedData.active_city));
    dispatch(setActiveStation(sortedData.active_station));
    dispatch(setActiveSubstance(sortedData.active_substance));

    dispatch(aqi_success(sortedData));
  }

  //loaded with * error or empty
  if (!data || data.length === 0) {
    dispatch(aqi_failure());
  }

  return data;
};
