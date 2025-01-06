import { FC } from 'react';
import { Dialog as MuiDialog, Divider, Grid, styled, Typography, Box } from '@mui/material';
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

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    borderRadius: 12,
  },
});

const PostViewDialog: FC = () => {
  const { postViewDialogOpened, selectedPost } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closePostViewDialog());
  };

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
          <Box padding={2}>
            <UserAvatar user={selectedPost.author} withUsername />
            <FollowUserAction user={selectedPost.author} />
            <Typography>{selectedPost.content}</Typography>
          </Box>
          <Box padding={2} flexGrow={1}>
            <CommentList postId={selectedPost._id} />
          </Box>
          <Box padding={2}>
            <PostFeedbackActions post={selectedPost} />
            {postDate}
            <CommentInput postId={selectedPost._id} />
          </Box>
        </Grid>
      </Grid>
    </StyledDialog>
  );
};

export default PostViewDialog;
