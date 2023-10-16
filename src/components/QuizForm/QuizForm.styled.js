import styled from 'styled-components';
import { Form, ErrorMessage, Field } from 'formik';

export const StyledForm = styled(Form)`
  max-width: 450px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 5px;
  box-shadow: 3px 6px 3px -2px rgba(0, 0, 0, 0.28);
  gap: ${props => props.theme.spacing(5)};
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-weight: bold;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ErrMsg = styled(ErrorMessage)`
  color: ${p => p.theme.color.error};
  font-size: 10px;
`;

export const StyledField = styled(Field)`
  border-radius: 5px;
  border: 1px solid grey;
  padding: 5px;

  &[name='questions'],
  &[name='time'] {
    width: 50px;
  }
`;

export const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  max-width: 150px;
  cursor: pointer;
  transition: 250ms ease-in;

  &:hover {
    background-color: #0a9b10;
  }
`;
