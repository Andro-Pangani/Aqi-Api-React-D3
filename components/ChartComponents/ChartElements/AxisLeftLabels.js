export const AxisLeftLabels = ({ labelsScale, data }) => {
  return labelsScale.domain().map((i) => {
    return (
      <g
        key={i}
        transform={`translate(-30,${
          labelsScale(i) + labelsScale.bandwidth() / 2
        })`}
      >
        <text className="substance_name" key={i.type} dy=".5rem">
          {i}
        </text>
      </g>
    );
  });
};
