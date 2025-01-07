import ButtonWithCount from '@shared/components/button-with-count';
import { UserAction } from '@entities/user/types';

const ShowPostsAction: UserAction = () => {
  return <ButtonWithCount count={3} entity="posts" />;
};

export default ShowPostsAction;
