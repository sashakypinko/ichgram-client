import { FC } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '@app/hooks';
import { styled } from '@mui/material';
import { ResetPasswordData } from '@features/auth/types';
import { resetPassword } from '@features/auth/store/slice';
import TextField from '@shared/components/formik/text-field';
import Button from '@shared/components/button';
import { FormikErrors } from 'formik/dist/types';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '@app/routes/enums/route.enum';

const StyledForm = styled(Form)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const validationSchema = () =>
  Yup.object().shape({
    username: Yup.string().required('Username is required'),
  });

const initialValues: ResetPasswordData = {
  username: '',
};

const PasswordRecoveryForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          <TextField placeholder="Email or Username" name="username" fullWidth />
          <Button sx={{ mt: 1 }} type="submit" variant="contained" loading={isSubmitting} fullWidth>
            Reset your password
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default PasswordRecoveryForm;
