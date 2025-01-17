import { FC, useRef, useState } from 'react';
import { Box, Dialog as MuiDialog, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { closePostViewDialog } from '@entities/post/store/slice';
import CommentList from '@entities/comment/components/comment-list';
import PostFeedbackActions from '@entities/post/components/post-feedback-actions';
import CommentInput from '@entities/comment/components/comment-input';
import { removeGetParam } from '@shared/helpers/url-helper';
import CircularLoader from '@shared/components/circular-loader';
import { selectComment } from '@entities/comment/store/selectors';
import usePaginatedComments from '@entities/comment/hooks/use-paginated-comments.hook';
import PostViewHeader from '@entities/post/components/post-view-dialog/post-view-header';
import PostViewContent from '@entities/post/components/post-view-dialog/post-view-content';
import PostDate from '@entities/post/components/post-date';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import PostMediaView from '@entities/post/components/post-media-view';

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
  },

  [theme.breakpoints.down(Breakpoint.SM)]: {
    height: 'calc(100% - 40px)',
  },
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    gridTemplateColumns: '1fr',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  padding: 16,
  flexGrow: 1,
  height: 0,
  overflowY: 'auto',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    height: 'auto',
  },

  [theme.breakpoints.up(Breakpoint.SM)]: {
    maxHeight: '100%',
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  padding: 16,
  borderTop: '1px solid #DBDBDB',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    padding: 8,
  },
}));

const PostViewDialog: FC = () => {
  const [commentMode, setCommentMode] = useState<boolean>(false);

  const { postViewDialogOpened, selectedPost } = useAppSelector(selectPost);
  const { fetchLoading } = useAppSelector(selectComment);
  const dispatch = useAppDispatch();
  const { data, next, reset } = usePaginatedComments(selectedPost?._id);
  const mainContainerRef = useRef<HTMLDivElement>();
  const isSm = useIsBreakpoint(Breakpoint.SM);

  const handleClose = () => {
    dispatch(closePostViewDialog());
    removeGetParam('postId');
    reset();
    setCommentMode(false);
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

  const handleBackClick = () => {
    if (commentMode) {
      setCommentMode(false);
    } else {
      handleClose();
    }
  };

  if (!selectedPost) {
    return null;
  }

  return (
    <StyledDialog maxWidth="xl" open={postViewDialogOpened} onClose={handleClose} fullWidth>
      {isSm && <PostViewHeader post={selectedPost} onBackClick={handleBackClick} />}
      <StyledContainer>
        <Box width="100%">
          {!commentMode && (
            <PostMediaView post={selectedPost} />
          )}
        </Box>
        <Box display="flex" flexDirection="column" width="100%">
          {!isSm && <PostViewHeader post={selectedPost} />}
          <MainContent
            sx={{ maxHeight: commentMode ? '50vh' : '20vh' }}
            ref={mainContainerRef}
            onScroll={handleScroll}
          >
            <PostViewContent post={selectedPost} />
            {(!isSm || commentMode) && (
              <>
                <CommentList emptyMessage="This post has no comments yet." />
                {!!data.length && fetchLoading && <CircularLoader />}
              </>
            )}
          </MainContent>
          <Footer>
            <PostFeedbackActions post={selectedPost} onCommentClick={() => isSm && setCommentMode(!commentMode)} />
            {(!isSm || commentMode) && (
              <>
                <Box paddingX={1}>
                  <PostDate post={selectedPost} />
                </Box>
                <CommentInput postId={selectedPost._id} />
              </>
            )}
          </Footer>
        </Box>
      </StyledContainer>
    </StyledDialog>
  );
};

export default PostViewDialog;
