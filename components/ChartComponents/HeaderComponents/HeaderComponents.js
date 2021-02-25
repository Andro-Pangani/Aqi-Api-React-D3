import { useDispatch, useSelector } from 'react-redux';
import { setActiveCity, setActiveStation } from '../../Redux/src/dataSlices';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useActiveCity, useActiveStation } from './headerHooks';
import { createSelector } from '@reduxjs/toolkit';

const CityWrapper = styled.div`
  background-color: ${(props) => (props.active ? `#e877e8` : 'black')};
`;

const _eventCity_setStation = createSelector(
  (state) => state.data.aqi_data.stations,
  (_, activeCity) => activeCity,
  (stations, activeCity) => {
    let result = null;
    for (let station of stations) {
      console.log(
        'Station for of ',
        station,
        ' <<<>>> activeCity ',
        activeCity
      );

      if (station.municipality_id === activeCity && !station.empty) {
        let station_id = station.id;
        // activeTools.dispatch(setActiveStation(station_id));        result = station;
        console.log(result, ' <== ######## Result from Selected stations');
        break;
      }
    }

    // returns from Selector
    return result;
  }
);
// const activeStation = useSelector((state) =>
//   _eventCity_setStation(state, activeTools)
// );

export const CityItem = ({ name, id, activeStation }) => {
  const dispatch = useDispatch();
  const activeCity = useSelector((state) => state.data.active_city);

  const active = useActiveCity(id);

  const clickHandler = () => {
    dispatch(setActiveCity(id));
    dispatch(setActiveStation(activeStation));
  };

  return (
    <CityWrapper
      active={active}
      className="city_name"
      onClick={clickHandler}
      key={id}
    >
      {name}
    </CityWrapper>
  );
};

const StationWrapper = styled.li`
  background: ${({ active }) => (active ? '#9c9c9c' : 'black')};
`;

export const StationItem = ({ name, id, cityId }) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setActiveStation(id));
    dispatch(setActiveCity(cityId));
  };

  const active = useActiveStation(id);

  return (
    <StationWrapper
      active={active}
      key={id}
      className="list_item-station"
      onClick={clickHandler}
    >
      {name}
    </StationWrapper>
  );
};
