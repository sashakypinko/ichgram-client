import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { IUser } from '@entities/user/model/user';
import { ComponentType } from 'react';

interface Props {
  user: IUser;
}

const VisibleForOwner =
  <P extends Props>(Wrapped: ComponentType<P>) =>
  (props: P) => {
    const authUser = useAuthUser();

    if (authUser?._id !== props.user._id) return null;

    return <Wrapped {...props} />;
  };

export default VisibleForOwner;
