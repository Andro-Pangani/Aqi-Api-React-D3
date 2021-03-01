import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 61%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #171717;
  border-radius: 5px;
`;

export const SubstanceWrapper = styled.div`
  width: 100%;
  height: 49%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const ChartWrapper = styled.div`
  height: 61%;
  width: 100%;

  svg {
    width: 100%;
    height: 100%;
    background: linear-gradient(1deg, black, #1f33de);
    .substance_name {
      fill: #4c3838;
      font-size: 0.8rem;
    }

    rect {
      stroke: gray;
      stroke-width: 1px;
    }

    .chart_line_path {
      fill: none;
      stroke: #d14232;
    }

    circle {
      fill: #d14232;
    }

    .x_axis_line {
      stroke: #1365d1;
    }
    .x_axis_text {
      fill: #6b2323;
      font-size: 0.8rem;
    }

    .y_axis_text {
      fill: rgb(51 30 30);
      font-size: 0.9rem;
    }
  }
`;
