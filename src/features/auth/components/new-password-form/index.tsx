import { FC } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@app/hooks';
import { styled } from '@mui/material';
import { ResetPasswordData } from '@features/auth/types';
import { resetPassword } from '@features/auth/store/slice';
import Button from '@shared/components/button';
import { FormikErrors } from 'formik/dist/types';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum';
import PasswordField from '@shared/components/formik/password-field';

const StyledForm = styled(Form)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const validationSchema = () =>
  Yup.object().shape({
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

interface Props {
  token: string;
}

const NewPasswordForm: FC<Props> = ({ token }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: ResetPasswordData = {
    token,
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (
    values: ResetPasswordData,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<ResetPasswordData>,
  ) => {
    dispatch(
      resetPassword({
        payload: values,
        onSuccess: () => {
          setSubmitting(false);
          resetForm();
          navigate(RouteEnum.SIGN_IN);
        },
        onError: (errors: FormikErrors<ResetPasswordData>) => {
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
          <PasswordField placeholder="Password" name="password" fullWidth />
          <PasswordField placeholder="Conform Password" name="confirmPassword" fullWidth />
          <Button sx={{ mt: 1 }} type="submit" variant="contained" loading={isSubmitting} fullWidth>
            Change password
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default NewPasswordForm;
