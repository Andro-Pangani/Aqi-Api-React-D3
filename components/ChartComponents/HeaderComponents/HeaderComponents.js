import { useDispatch } from 'react-redux';
import { setActiveCity, setActiveStation } from '../../Redux/src/dataSlices';
import styled from 'styled-components';
import { useActiveCity, useActiveStation } from './headerHooks';

const CityWrapper = styled.div`
  background-color: ${(props) => (props.active ? `#e877e8` : 'black')};
`;

export const CityItem = ({ name, id, activeStationId }) => {
  const dispatch = useDispatch();

  const active = useActiveCity(id);

  const clickHandler = () => {
    dispatch(setActiveCity(id));
    dispatch(setActiveStation(activeStationId));
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
