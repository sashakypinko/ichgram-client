import { FC, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { styled, Typography, useTheme } from '@mui/material';
import { SendResetPasswordLinkData } from '@features/auth/types';
import { sendResetPasswordLink } from '@features/auth/store/slice';
import TextField from '@shared/components/formik/text-field';
import Button from '@shared/components/button';
import { FormikErrors } from 'formik/dist/types';
import { selectAuth } from '@features/auth/store/selectors.ts';

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

const initialValues: SendResetPasswordLinkData = {
  username: '',
};

const PasswordRecoveryForm: FC = () => {
  const [sent, setSent] = useState<boolean>(false);

  const { sendLinkLoading } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleSubmit = async (
    values: SendResetPasswordLinkData,
    { resetForm, setErrors }: FormikHelpers<SendResetPasswordLinkData>,
  ) => {
    dispatch(
      sendResetPasswordLink({
        payload: values,
        onSuccess: () => {
          resetForm();
          setSent(true);
        },
        onError: (errors: FormikErrors<SendResetPasswordLinkData>) => {
          setErrors(errors);
        },
      }),
    );
  };

  if (sent) {
    return (
      <Typography variant="h5" textAlign="center" color={theme.palette.success.main}>
        Please check your email inbox
      </Typography>
    );
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} validateOnBlur>
      <StyledForm>
        <TextField placeholder="Email or Username" name="username" fullWidth />
        <Button sx={{ mt: 1 }} type="submit" variant="contained" loading={sendLinkLoading} fullWidth>
          Reset your password
        </Button>
      </StyledForm>
    </Formik>
  );
};

export default PasswordRecoveryForm;
