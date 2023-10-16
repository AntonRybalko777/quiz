import styled from 'styled-components';

function getColorBorder(props) {
  switch (props.$level) {
    case 'beginner':
      return 'green';
    case 'intermediate':
      return 'orange';
    case 'advanced':
      return 'red';
    default:
      return 'black';
  }
}

export const InfoWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-around;
  align-items: center;

  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

export const Card = styled.div`
  border: 3px solid ${getColorBorder};
  border-radius: 5px;
  padding: 5px;
  position: relative;
  width: 300px;
`;

export const Buttons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    &:nth-child(1) {
      svg {
        color: red;
        transition: 200ms ease-in;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
    &:nth-child(2) {
      svg {
        color: green;
        transition: 250ms ease-in;

        &:hover {
          transform: scale(1.3);
        }
      }
    }
  }
`;

export const InfoTitle = styled.span`
  color: #8a8a8a;
  font-size: 13px;
`;

export const InfoValue = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;
