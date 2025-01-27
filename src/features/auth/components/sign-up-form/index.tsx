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
import PasswordField from '@shared/components/formik/password-field';

const StyledForm = styled(Form)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email address is required'),
    username: Yup.string().min(5, 'Username must be at least 5 characters').required('Username is required'),
    fullName: Yup.string().min(5, 'Full Name must be at least 5 characters').required('Full Name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/(?=(.*[A-Z]){2})/, 'Password must contain at least 2 uppercase letters.')
      .matches(/(?=(.*[a-z]){2})/, 'Password must contain at least 2 lowercase letters.')
      .matches(/(?=(.*\d){1})/, 'Password must contain at least 1 number.')
      .matches(/(?=.*[@$!%*?&])/, 'Password must contain at least 1 special character (@, $, !, %, *, ?, &).')
      .matches(/^[\w@$!%*?&]+$/, 'Password can only contain letters, numbers, and @$!%*?& symbols.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required(() => 'Please confirm password'),
  });

const initialValues: SignUpData = {
  username: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
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
          <PasswordField placeholder="Password" name="password" fullWidth />
          <PasswordField placeholder="Confirm Password" name="confirmPassword" fullWidth />
          <Button sx={{ mt: 1 }} type="submit" variant="contained" loading={isSubmitting} fullWidth>
            Sign up
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default SignUpForm;
