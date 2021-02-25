import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { aqi_success } from '../components/Redux/src/dataSlices';

import { ApiHandler } from './lib/workWithAPI';
import { FetchWithThunk } from './lib/fetchMainDataThunk';

export const FetchAqiData = (url) => {
  const dispatch = useDispatch();

  const [aqi_data, setAqiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // - 1. Fetching Data
  // -       -       -

  useEffect(() => {
    const data = dispatch(FetchWithThunk(url));

    // const data = await (await fetch(url)).json();
    // #
    // # 2. Sort data for existance of Content
    // #
    // let sortedData = ApiHandler(data.data);

    // dispatch(aqi_success(sortedData));
    // setAqiData(sortedData);
    // setLoading(false);
  }, []);
};
