import Button from '@shared/components/button';
import PlainLink from '@shared/components/plain-link';
import { RouteEnum } from '@app/routes/enums/route.enum';
import { UserAction } from '@entities/user/types';
import VisibleForOwner from '@entities/user/hoc/visible-for-owner.hoc';

const EditUserAction: UserAction = () => {
  return (
    <PlainLink to={RouteEnum.EDIT_PROFILE}>
      <Button variant="contained" color="inherit">
        Edit profile
      </Button>
    </PlainLink>
  );
};

export default VisibleForOwner(EditUserAction);
