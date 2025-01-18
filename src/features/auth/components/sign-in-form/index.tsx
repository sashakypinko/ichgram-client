import { FC } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material';
import { useAppDispatch } from '@app/hooks';
import { UserCredentials } from '@features/auth/types';
import TextField from '@shared/components/formik/text-field';
import Button from '@shared/components/button';
import { signIn } from '@features/auth/store/slice';
import { FormikErrors } from 'formik/dist/types';

const StyledForm = styled(Form)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const validationSchema = () =>
  Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

const initialValues: UserCredentials = {
  username: '',
  password: '',
};

const SignInForm: FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: UserCredentials,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<UserCredentials>,
  ) => {
    dispatch(
      signIn({
        payload: values,
        onSuccess: () => {
          setSubmitting(false);
          resetForm();
          // window.location.reload();
        },
        onError: (errors: FormikErrors<UserCredentials>) => {
          setSubmitting(false);
          setErrors(errors);
        },
      }),
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} validateOnBlur>
      {({ isSubmitting, isValid }) => {
        return (
          <StyledForm>
            <TextField placeholder="Username or email" name="username" fullWidth />
            <TextField type="password" placeholder="Password" name="password" fullWidth />
            <Button
              sx={{ mt: 1 }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={!isValid}
              fullWidth
            >
              Log in
            </Button>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
