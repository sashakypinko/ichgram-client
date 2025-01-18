import { FC } from 'react';
import Button from '@shared/components/button';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { logout } from '@features/auth/store/slice';
import { selectAuth } from '@features/auth/store/selectors';

const LogoutButton: FC = () => {
  const { loading } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(
      logout({
        payload: null,
        onSuccess: () => {
          window.location.reload();
        },
      }),
    );
  };

  return (
    <Button variant="contained" color="inherit" onClick={handleLogout} loading={loading}>
      Logout
    </Button>
  );
};

export default LogoutButton;
