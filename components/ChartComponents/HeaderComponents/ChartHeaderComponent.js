import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Wrapper } from './ChartHeaderComponent.styled';

import { todoAdded } from '../../Redux/src/store';
import { CityItem, StationItem } from './HeaderComponents';

const ChartHeaderComponent = () => {
  const dispatch = useDispatch();
  const { loading, loaded, error } = useSelector(
    (state) => state.data.loading_state
  );
  const headerData = useSelector((state) => state.data.aqi_data.cities);

  const handleClick = () => {
    dispatch(todoAdded('*'));
  };

  // console.log(data, ' from header compnent');

  if (loaded)
    return (
      <Wrapper>
        <button onClick={handleClick}>Test</button>
        <ul className="header_list">
          {Object.keys(headerData).map((item) => {
            return (
              <li key={item.city} className="header_list-item">
                <CityItem
                  key={headerData[item].id}
                  activeStationId={headerData[item].active_station}
                  name={item}
                  id={headerData[item].id}
                />
                <ul key={item.city} className="stations_list">
                  {headerData[item].stations.map((station) => {
                    return (
                      <StationItem
                        key={station.id}
                        name={station.address}
                        id={station.id}
                        cityId={headerData[item].id}
                      />
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    );
};

export default ChartHeaderComponent;
