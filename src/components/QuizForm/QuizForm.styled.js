import styled from 'styled-components';
import { Form, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  padding: 20px;
  display: flex;
  gap: ${props => props.theme.spacing(5)};
`;

export const ErrMsg = styled(ErrorMessage)`
  color: ${p => p.theme.color.error};
`;
