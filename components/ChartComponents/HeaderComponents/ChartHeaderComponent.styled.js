import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 1rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
  }

  .header_list {
    color: #311ed2;

    .header_list-item {
      padding-top: 8px;
      .city_name {
        color: #311ed2;
      }
    }
  }

  .stations_list {
    display: flex;
    font-size: 0.9rem;
    flex-direction: column;

    .list_item-station {
      margin-top: 0.2rem;
    }
  }
`;
