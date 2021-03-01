import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSubstance } from '../Redux/src/dataSlices';
import { Wrapper } from './ChartSubstances.styled';

export const ChartSubstanceItem = ({ substance, activeId, name }) => {
  const dispatch = useDispatch();
  const activeSubstance = useSelector(
    (state) => state.data.active_substance?.substance?.name
  );
  const [meActive, setMeActive] = useState(false);

  let lastValue = substance.data1hour_set.length - 1;
  let substanceValue = substance.data1hour_set[lastValue];

  const clickHandler = () => {
    console.log(name, activeSubstance, 'My Name from props BEFORE');
    dispatch(setActiveSubstance(substance));
    console.log(name, activeSubstance, 'My Name from props AFTER');
  };

  useEffect(() => {
    console.log(
      activeSubstance,
      meActive,
      name,
      ' |||||||||||| <<<< active substance'
    );
    if (activeSubstance === name) {
      setMeActive(true);
    } else {
      setMeActive(false);
    }
  }, [activeSubstance]);

  return (
    <Wrapper active={meActive}>
      <div className="chart_substance-item" onClick={clickHandler}>
        <ul className="chart_substance_list">
          <li className="chart_substance-name">{substance.substance.name}</li>
          <li className="chart_substance-value">
            {substanceValue.value.toFixed(2)}
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};
