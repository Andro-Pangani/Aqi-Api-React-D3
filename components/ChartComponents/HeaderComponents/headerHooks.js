import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useActiveCity = (my_id) => {
  const [active, setActive] = useState(false);
  const activeCity = useSelector((state) => state.data.active_city);

  useEffect(() => {
    if (!active && activeCity === my_id) {
      setActive(true);
    } else {
      setActive(false);
    }
    console.log(activeCity, active, '  <<<<< active City');
  }, [activeCity]);

  return active;
};

export const useActiveStation = (my_id) => {
  const [active, setActive] = useState(false);
  const activeCity = useSelector((state) => state.data.active_station);

  useEffect(() => {
    if (!active && activeCity === my_id) {
      setActive(true);
    } else {
      setActive(false);
    }
    console.log(activeCity, active, '  <<<<< active City');
  }, [activeCity]);

  return active;
};
