import { FC, useEffect, useRef } from 'react';
import { Dialog as MuiDialog, Grid, styled, Typography, Box } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { closePostViewDialog } from '@entities/post/store/slice';
import UserAvatar from '@entities/user/components/user-avatar';
import FollowUserAction from '@entities/user/components/user-actions/follow-user-action';
import MediaView from '@shared/components/media-view';
import { Size } from '@shared/enums/size.enum';
import CommentList from '@entities/comment/components/comment-list';
import PostFeedbackActions from '@entities/post/components/post-feedback-actions';
import CommentInput from '@entities/comment/components/comment-input';
import PostActions from '@entities/post/components/post-actions';
import { removeGetParam } from '@shared/helpers/url-helper';
import { getComments } from '@entities/comment/store/slice';
import usePagination from '@shared/hooks/use-pagination.hook';
import CircularLoader from '@shared/components/circular-loader';
import { selectComment } from '@entities/comment/store/selectors';

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    borderRadius: 12,
  },
});

const Header = styled(Box)({
  padding: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #DBDBDB',
});

const MainContainer = styled(Box)({
  padding: 16,
  flexGrow: 1,
  height: 0,
  overflowY: 'auto',
});

const Content = styled(Box)({
  display: 'flex',
  alignItems: 'start',
  paddingBottom: 16,
  gap: 24,
});

const Footer = styled(Box)({
  padding: 16,
  borderTop: '1px solid #DBDBDB',
});

const PostDate = styled(Typography)({
  color: '#737373',
});

const PostViewDialog: FC = () => {
  const { postViewDialogOpened, selectedPost } = useAppSelector(selectPost);
  const { comments, fetchLoading } = useAppSelector(selectComment);
  const dispatch = useAppDispatch();
  const { offset, limit, next, reset } = usePagination();
  const mainContainerRef = useRef<HTMLDivElement>();

  const fetchComments = (postId: string) => {
    dispatch(getComments({ postId, offset, limit }));
  };

  const handleClose = () => {
    dispatch(closePostViewDialog());
    removeGetParam('postId');
    reset();
  };

  const handleScroll = () => {
    if (
      mainContainerRef.current &&
      mainContainerRef.current.scrollTop + mainContainerRef.current.clientHeight ===
        mainContainerRef.current.scrollHeight
    ) {
      next();
    }
  };

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost._id);
    }
  }, [selectedPost, offset, limit]);

  if (!selectedPost) {
    return null;
  }

  const postDate = formatDistanceToNow(selectedPost.createdAt);

  return (
    <StyledDialog maxWidth="xl" open={postViewDialogOpened} onClose={handleClose} fullWidth>
      <Grid container>
        <Grid item xs={12} md={6}>
          <MediaView
            sx={{ borderRadius: 1 }}
            mediaId={selectedPost.mediaId}
            size={Size.ORIGINAL}
            withFullView={false}
          />
        </Grid>
        <Grid display="flex" flexDirection="column" item xs={12} md={6}>
          <Header>
            <Box display="flex" alignItems="center" gap={2}>
              <UserAvatar size={42} user={selectedPost.author} withUsername />
              <Typography sx={{ ml: 2 }} variant="h4">
                •
              </Typography>
              <FollowUserAction user={selectedPost.author} variant="text" />
            </Box>
            <PostActions post={selectedPost} />
          </Header>
          <MainContainer ref={mainContainerRef} onScroll={handleScroll}>
            <Content>
              <UserAvatar size={42} user={selectedPost.author} />
              <Box>
                <Typography sx={{ pr: 1 }} fontWeight={600} component="span">
                  {selectedPost.author.username}
                </Typography>
                <Typography component="span">{selectedPost.content}</Typography>
                <PostDate variant="body2">{postDate}.</PostDate>
              </Box>
            </Content>
            <CommentList emptyMessage="This post has no comments yet." />
            {!!comments.length && fetchLoading && <CircularLoader />}
          </MainContainer>
          <Footer>
            <PostFeedbackActions post={selectedPost} />
            <PostDate paddingX={1} variant="body2">
              {postDate}
            </PostDate>
            <CommentInput postId={selectedPost._id} />
          </Footer>
        </Grid>
      </Grid>
    </StyledDialog>
  );
};

export default PostViewDialog;
