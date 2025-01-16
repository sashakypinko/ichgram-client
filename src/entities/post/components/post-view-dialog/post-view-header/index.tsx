import { FC } from 'react';
import { styled, Box } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import FollowUserAction from '@entities/user/components/user-actions/follow-user-action';
import PostActions from '@entities/post/components/post-actions';
import { IPost } from '@entities/post/model/post';
import Breakpoint from '@shared/enums/breakpoint.enum';
import BackButton from '@shared/components/back-button';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';

const Header = styled(Box)(({ theme }) => ({
  padding: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #DBDBDB',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    padding: 8,
  },
}));

interface Props {
  post: IPost;
  onBackClick?: () => void;
}

const PostViewHeader: FC<Props> = ({ post, onBackClick }) => {
  const isSm = useIsBreakpoint(Breakpoint.SM);
  
  return (
    <Header>
      <Box display="flex" alignItems="center" gap={isSm ? 1 : 2}>
        {isSm && <BackButton onClick={onBackClick} />}
        <UserAvatar size={42} user={post.author} withUsername />
        <FollowUserAction user={post.author} variant="text" />
      </Box>
      <PostActions post={post} />
    </Header>
  );
};

export default PostViewHeader;
