import {
  aqi_failure,
  aqi_request,
  aqi_success,
  setActiveCity,
  setActiveStation,
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

    dispatch(aqi_success(sortedData));
    dispatch(setActiveCity(sortedData.active_city));
    dispatch(setActiveStation(sortedData.active_station));
  }

  //loaded with * error or empty
  if (!data || data.length === 0) {
    dispatch(aqi_failure());
  }

  return data;
};
