import { FC } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@app/hooks';
import { styled } from '@mui/material';
import { SignUpData } from '@features/auth/types';
import { signUp } from '@features/auth/store/slice';
import TextField from '@shared/components/formik/text-field';
import Button from '@shared/components/button';
import { FormikErrors } from 'formik/dist/types';

const StyledForm = styled(Form)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string().required('Email address is required'),
    username: Yup.string().required('Username is required'),
    fullName: Yup.string().required('Full Name is required'),
    password: Yup.string().required('Password is required'),
  });

const initialValues: SignUpData = {
  username: '',
  fullName: '',
  email: '',
  password: '',
};

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: SignUpData,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<SignUpData>,
  ) => {
    dispatch(
      signUp({
        payload: values,
        onSuccess: () => {
          setSubmitting(false);
          resetForm();
          window.location.reload();
        },
        onError: (errors: FormikErrors<SignUpData>) => {
          setSubmitting(false);
          setErrors(errors);
        },
      }),
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} validateOnBlur>
      {({ isSubmitting }) => (
        <StyledForm>
          <TextField placeholder="Email" name="email" fullWidth />
          <TextField placeholder="Full Name" name="fullName" fullWidth />
          <TextField placeholder="Username" name="username" fullWidth />
          <TextField placeholder="Password" name="password" fullWidth />
          <Button sx={{ mt: 1 }} type="submit" variant="contained" loading={isSubmitting} fullWidth>
            Sign up
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default SignUpForm;
