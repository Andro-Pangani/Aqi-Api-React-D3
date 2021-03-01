import { line } from 'd3';

export const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
  xScale.ticks().map((tickValue, i) => {
    return (
      <g transform={`translate(${xScale(tickValue)},0)`} key={i}>
        <line
          className="x_axis_line"
          key={Math.random()}
          y2={innerHeight - 50}
        />
        <text
          className="x_axis_text"
          key={tickValue}
          y={innerHeight + 5}
          style={{ textAnchor: 'middle' }}
          dy=".71em"
        >
          {tickFormat(tickValue)}
        </text>
      </g>
    );
  });

export const AxisLeft = ({ yScale }) =>
  yScale.ticks().map((i) => (
    <g transform={`translate(0,${yScale(i)})`} key={i}>
      <text
        className="y_axis_text"
        key={i}
        x={-5}
        style={{ textAnchor: 'end' }}
      >
        {i}
      </text>
    </g>
  ));

// xValue = (d) => d.time
// yValue = (d) => d.country

export const Marks = ({ data, xScale, yScale, xValue, yValue }) => (
  <>
    <path
      className="chart_line_path"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))(data)}
    />
    {data.map((d, i) => {
      return (
        <circle
          key={d.time}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={3}
        >
          <title>{xValue(d)}</title>
        </circle>
      );
    })}
  </>
);
