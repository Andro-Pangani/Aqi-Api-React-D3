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

// let data = [
//   { type: 'PM10', count: 332, time: '2021-02-16T15:00:00' },
//   { type: 'PM2.5', count: 31, time: '2021-02-16T16:00:00' },
//   { type: 'NO2', count: 200, time: '2021-02-16T17:00:00' },
//   { type: 'SO2', count: 24, time: '2021-02-16T18:00:00' },
//   { type: 'O3', count: 342, time: '2021-02-16T19:00:00' },
//   { type: 'CO', count: 34, time: '2021-02-16T20:00:00' },
//   { type: 'Sum', count: 23, time: '2021-02-16T21:00:00' },
// ];

// data = data.map((item) => {
//   return { ...item, time: new Date(item.time).getTime() };
// });

const ChartD3 = ({ station }) => {
  const svgRef = useRef(null);
  const [svgProps, setSvgProps] = useState({ width: 10, height: 10 });
  console.log(station, ' << Station from Chart');

  let data = station?.data1hour_set.map((item) => {
    return { value: item.value, time: new Date(item.date_time).getTime() };
  });

  let indexLevel = station.substance.airqualityindexlevel_set[0];

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

  return (
    <Wrapper>
      <SubstanceWrapper className="chart_substances">Pm</SubstanceWrapper>

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
