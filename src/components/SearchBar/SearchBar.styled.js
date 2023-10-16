import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10px;

  input {
    border-radius: 5px;
    border: 1px solid grey;
    padding: 5px 10px;
  }

  select {
    border-radius: 5px;
    border: 1px solid grey;
    padding: 5px 10px;
  }

  button {
    background-color: #ffb33f;
    border: none;
    color: white;
    padding: 5px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    max-width: 150px;
    cursor: pointer;
    transition: 250ms ease-in;

    &:hover {
      background-color: #ff9a00;
    }
  }
`;
