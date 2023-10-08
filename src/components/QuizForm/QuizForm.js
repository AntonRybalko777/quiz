import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { StyledForm, ErrMsg } from './QuizForm.styled';

const quizSchema = Yup.object().shape({
  topic: Yup.string().min(3, 'Too short').required('Required'),
  time: Yup.number()
    .min(10, 'Min 10 min')
    .max(45, 'Max 45 min')
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
        <label>
          Topic
          <Field name="topic" placeholder="Topic field" />
          <ErrMsg name="topic" component="div" />
        </label>

        <label>
          Time <Field type="number" name="time" />
          <ErrMsg name="time" component="div" />
        </label>
        <label>
          Questions <Field type="number" name="questions" />
          <ErrMsg name="questions" component="div" />
        </label>
        <label>
          Level
          <Field as="select" name="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Field>
          <ErrMsg name="level" component="div" />
        </label>
        <button type="submit">Add quiz</button>
      </StyledForm>
    </Formik>
  );
};
