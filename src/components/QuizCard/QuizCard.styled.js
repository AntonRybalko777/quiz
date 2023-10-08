import styled from 'styled-components';

function getColorBorder(props) {
  switch (props.level) {
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
`;

export const Container = styled.div`
  border: 3px solid ${getColorBorder};
  border-radius: 5px;
  padding: 5px;
`;
