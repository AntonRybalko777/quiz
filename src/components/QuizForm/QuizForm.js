import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  ErrMsg,
  Label,
  StyledField,
  Button,
} from './QuizForm.styled';

const quizSchema = Yup.object().shape({
  topic: Yup.string().min(2, 'Too short').required('Required'),
  time: Yup.number()
    .min(10, 'Min 10 minutes')
    .max(45, 'Max 45 minutes')
    .required('Required'),
  questions: Yup.number().min(3, 'Min 3 questions').required('Required'),
  level: Yup.string()
    .oneOf(['beginner', 'intermediate', 'advanced'])
    .required('Required'),
});
export const QuizForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        topic: '',
        time: 0,
        questions: 0,
        level: 'beginner',
      }}
      validationSchema={quizSchema}
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      <StyledForm>
        <Label>
          Topic
          <StyledField name="topic" />
          <ErrMsg name="topic" component="div" />
        </Label>

        <Label>
          Time (min)
          <StyledField type="number" name="time" />
          <ErrMsg name="time" component="div" />
        </Label>
        <Label>
          Questions
          <StyledField type="number" name="questions" />
          <ErrMsg name="questions" component="div" />
        </Label>
        <Label>
          Level
          <StyledField as="select" name="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </StyledField>
          <ErrMsg name="level" component="div" />
        </Label>

        <Button type="submit">Add quiz</Button>
      </StyledForm>
    </Formik>
  );
};
