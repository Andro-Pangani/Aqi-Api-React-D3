import React, { useEffect, useRef, useState } from 'react';
import {
  scaleTime,
  timeFormat,
  extent,
  scaleLinear,
  scaleBand,
  max,
  index,
} from 'd3';

// Chart Elements
import { AxisBottom, AxisLeft, Marks } from './ChartElements/ChartElements';
import { Wrapper, SubstanceWrapper, ChartWrapper } from './Chart.styled';
import { AxisLeftLabels } from './ChartElements/AxisLeftLabels';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { ChartSubstanceItem } from './ChartSubstanceItem';

const activeStationSelector = createSelector(
  (state) => state.data.aqi_data.stations,
  (_, active_station_id) => active_station_id,
  (stations, active_station_id) => {
    let activeEquipment = null;
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].id === active_station_id) {
        activeEquipment = stations[i].stationequipment_set;
        break;
      }
    }

    // returns Array of StationEquipment Set of Active Station
    return activeEquipment;
  }
);

const ChartD3 = () => {
  const active_substance = useSelector((state) => state.data.active_substance);
  const active_station_id = useSelector((state) => state.data.active_station);

  const activeEquipmentSet = useSelector((state) =>
    activeStationSelector(state, active_station_id)
  );

  const svgRef = useRef(null);
  const [svgProps, setSvgProps] = useState({ width: 10, height: 10 });
  console.log(active_substance, ' << Station from Chart');

  let data = active_substance?.data1hour_set.map((item) => {
    return { value: item.value, time: new Date(item.date_time).getTime() };
  });

  let indexLevel = active_substance?.substance.airqualityindexlevel_set[0];

  let from = indexLevel.good_from;
  let to = indexLevel.very_poor_from;

  const [groupCenter, setGroupCenter] = useState({ x: 0, y: 0 });

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50,
  };

  useEffect(() => {});

  useEffect(() => {
    const { width, height } = svgRef.current.getBoundingClientRect();
    setSvgProps({ width, height });
    setGroupCenter({ x: width / 2, y: height / 2 });
  }, []);

  const innerHeight = svgProps.height - (margin.top + margin.bottom);
  const innerWidth = svgProps.width - (margin.left + margin.right);

  // left Axis titles scale
  // const LeftAxisLabels = (d) => d.type;
  // const left_Axis_labels = scaleBand()
  //   .domain(data.map((d) => d.type))
  //   .range([innerHeight, 0]);

  // Y scale
  const yValue = (d) => d.value;
  const yScale = scaleLinear()
    // .domain(extent(data, yValue))
    .domain([from, to])
    .range([innerHeight, 0]);

  // X scale
  const xValue = (d) => {
    return d.time;
  };

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth > 0 ? innerWidth : 300]);

  // X axis tick format

  const tickFormat = timeFormat('%H:%M');

  // Active Substance UI
  const [activeSubstance, setActiveSubstance] = useState(null);

  const ActiveSubstanceHandler = (id) => {
    console.log(id, ' ActiveSubstance');
    setActiveSubstance(id);
  };

  return (
    <Wrapper>
      <SubstanceWrapper className="chart_substances">
        {activeEquipmentSet.length > 0
          ? activeEquipmentSet.map((substance, index) => {
              return (
                <ChartSubstanceItem
                  key={index}
                  setActiveSubstance={ActiveSubstanceHandler}
                  // active={activeSubstanceId}
                  name={substance.substance.name}
                  substance={substance}
                />
              );
            })
          : null}
      </SubstanceWrapper>

      <ChartWrapper>
        <svg ref={svgRef}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={tickFormat}
            />
            {/* <AxisLeft yScale={yScale} /> */}
            {/* <AxisLeftLabels labelsScale={left_Axis_labels} data={data} /> */}
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
            />
          </g>
        </svg>
      </ChartWrapper>
    </Wrapper>
  );
};

export default ChartD3;
