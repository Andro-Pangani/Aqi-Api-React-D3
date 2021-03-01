import styled from 'styled-components';

export const Wrapper = styled.div`
  .chart_substance_list {
    /* box-shadow: ${(props) =>
      props.active ? '0 0 27px 7px blue' : '0 0 27px 7px transparent'}; */
  }

  .chart_substance-name {
    /* background: ${(props) => (props.active ? 'gray' : 'black')}; */
    font-size: ${(props) => (props.active ? '2rem' : '1rem')};
    background: #333333;
    color: #929292;
    padding: 3px;
    border-radius: 3px 3px 0 0;
  }

  .chart_substance-value {
    font-size: 1.5rem;
    padding: 3px;
    border: 1px solid #232323;
    text-align: center;
    background: linear-gradient(359deg, #ffffff, black);
    border-top: none;
    border-radius: 0 0 3px 3px;
    color: #000000;
  }

  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
    }
  }
`;
