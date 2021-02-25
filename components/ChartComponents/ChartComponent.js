import React, { useEffect, useState } from 'react';
import { FetchAqiData } from '../../HelperFunctions/AqiHelperFunctions';

//styles
import { Wrapper } from './ChartComponent.styled';

// Components
import ChartHeaderComponent from './HeaderComponents/ChartHeaderComponent';
import Chart from './Chart';
import { useSelector } from 'react-redux';

const ChartComponent = () => {
  const [data, setData] = useState(null);
  const { error, loaded, loading } = useSelector(
    (state) => state.data.loading_state
  );

  // Fetching Data
  FetchAqiData('/aqi');

  let substance = null;

  return (
    <Wrapper>
      {loading ? (
        <div className="content_loading_request">Is Loading ...</div>
      ) : loaded ? (
        <>
          <ChartHeaderComponent />
          {/*
          <Chart station={substance} substances={substance} /> */}
        </>
      ) : error ? (
        <div className="content_loading_error">SOMTHING WENT WRONG !</div>
      ) : null}
    </Wrapper>
  );
};

export default ChartComponent;
