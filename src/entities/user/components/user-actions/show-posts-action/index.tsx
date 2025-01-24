import ButtonWithCount from '@shared/components/button-with-count';
import { UserAction } from '@entities/user/types';

const ShowPostsAction: UserAction = ({ user }) => {
  return <ButtonWithCount count={user.postsCount || 0} entity="posts" />;
};

export default ShowPostsAction;
