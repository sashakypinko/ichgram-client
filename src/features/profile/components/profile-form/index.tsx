import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormikErrors } from 'formik/dist/types';
import { Box, styled, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import TextField from '@shared/components/formik/text-field';
import Button from '@shared/components/button';
import { UpdateUserData } from '@entities/user/types';
import { updateUser } from '@entities/user/store/slice';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { RouteEnum } from '@app/routes/enums/route.enum';
import UserAvatar from '@entities/user/components/user-avatar';
import { selectUser } from '@entities/user/store/selectors';

const StyledForm = styled(Form)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const AvatarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  borderRadius: 20,
  background: '#EFEFEF',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 12,
    background: theme.palette.background.default,
  },
}));

const FieldContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 0',
  gap: 4,
});

const Label = styled(Typography)({
  color: '#000',
});

const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const validationSchema = () =>
  Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    username: Yup.string().required('Username is required'),
    website: Yup.string().url('Website  must be a correct URL'),
    about: Yup.string().max(256, 'About must be shorter than or equal to 150 characters'),
  });

const ProfileForm: FC = () => {
  const { editLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const user = useAuthUser();
  const navigate = useNavigate();

  const handleSubmit = async (values: UpdateUserData, { resetForm, setErrors }: FormikHelpers<UpdateUserData>) => {
    if (user) {
      dispatch(
        updateUser({
          payload: {
            id: user._id,
            data: values,
          },
          onSuccess: () => {
            resetForm();
            navigate(RouteEnum.OWN_PROFILE);
          },
          onError: (errors: FormikErrors<UpdateUserData>) => {
            setErrors(errors);
          },
        }),
      );
    }
  };

  const initialValues: UpdateUserData = {
    fullName: user?.fullName || '',
    username: user?.username || '',
    website: user?.website || '',
    about: user?.about || '',
    avatar: null,
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnBlur
    >
      {({ setFieldValue, values }) => (
        <StyledForm>
          <AvatarContainer>
            <UserAvatar
              user={user}
              size={60}
              url={values.avatar ? URL.createObjectURL(values.avatar) : null}
              withUsername
              withName
              withoutLink
            />
            <Button component="label" variant="contained">
              Change photo
              <VisuallyHiddenInput
                type="file"
                accept={'.png,.jpg'}
                onChange={(e) => setFieldValue('avatar', (e.target.files || [])[0])}
                hidden
                multiple
              />
            </Button>
          </AvatarContainer>
          <FieldContainer>
            <Label variant="h5">Full Name</Label>
            <StyledTextField name="fullName" fullWidth />
          </FieldContainer>
          <FieldContainer>
            <Label variant="h5">Username</Label>
            <StyledTextField name="username" fullWidth />
          </FieldContainer>
          <FieldContainer>
            <Label variant="h5">Website</Label>
            <StyledTextField name="website" fullWidth />
          </FieldContainer>
          <FieldContainer>
            <Label variant="h5">About</Label>
            <StyledTextField name="about" minRows={2} maxLength={256} multiline fullWidth />
          </FieldContainer>
          <Box display="flex" justifyContent="end">
            <Button sx={{ p: 1, minWidth: 240 }} type="submit" variant="contained" loading={editLoading}>
              Submit
            </Button>
          </Box>
        </StyledForm>
      )}
    </Formik>
  );
};

export default ProfileForm;
