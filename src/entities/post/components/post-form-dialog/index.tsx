import { FC, useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { closePostFormDialog, createPost, updatePost } from '@entities/post/store/slice';
import { Box, Dialog as MuiDialog, IconButton, styled, Typography } from '@mui/material';
import Button from '@shared/components/button';
import MediaDropZone from '@shared/components/media-drop-zone';
import UserAvatar from '@entities/user/components/user-avatar';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { CloseRounded } from '@mui/icons-material';
import PostTextarea from '@entities/post/components/post-form-dialog/post-textarea';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import PostMediaView from '@entities/post/components/post-media-view';
import BackButton from '@shared/components/back-button';
import useSnackbar from '@shared/components/snackbar/hooks/use-snackbar.hook.ts';
import { validateFileSize } from '@shared/helpers/file-helper.ts';

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    borderRadius: 12,
    background: '#fff',
    overflow: 'hidden',
  },
});

const DropZoneBox = styled(Box)(({ theme }) => ({
  borderRight: '1px solid #DBDBDB',
  position: 'relative',

  [theme.breakpoints.down(Breakpoint.SM)]: {
    height: ' 100%',
  },
}));

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 4,
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
});

const PostFormDialog: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>('');

  const { postFormDialogOpened, editablePost, updateLoading, createLoading } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();
  const isSm = useIsBreakpoint(Breakpoint.SM);
  const { errorSnackbar } = useSnackbar();

  useEffect(() => {
    if (editablePost) {
      setContent(editablePost.content);
    }
  }, [editablePost]);

  const handleSubmit = () => {
    if (editablePost) {
      dispatch(
        updatePost({
          payload: {
            id: editablePost._id,
            data: { content },
          },
          onSuccess: handleClose,
          onError: () => {
            errorSnackbar("Something went wrong. Can't edit post!");
          },
        }),
      );
      return;
    }

    if (!file) {
      return;
    }

    dispatch(
      createPost({
        payload: {
          media: file,
          content,
        },
        onSuccess: handleClose,
        onError: () => {
          errorSnackbar("Something went wrong. Can't create post!");
        },
      }),
    );
  };

  const handleFileChange = (file: File) => {
    if (validateFileSize(file, 20)) {
      setFile(file);
    } else {
      errorSnackbar('The file size cannot be greater then 20MB.');
    }
  };

  const handleClose = () => {
    dispatch(closePostFormDialog());
    setFile(null);
    setContent('');
  };

  const mediaUrl = useMemo(() => {
    if (!file) {
      return '';
    }

    return URL.createObjectURL(file);
  }, [file]);

  const loading = updateLoading || createLoading;
  const disabled = !content || (!file && !editablePost);

  return (
    <StyledDialog maxWidth="lg" open={postFormDialogOpened} onClose={handleClose} fullWidth>
      <Header>
        {isSm ? <BackButton onClick={handleClose} /> : <Box sx={{ p: 2 }} />}
        <Typography variant="h5">{editablePost ? 'Edit' : 'Create new'} post</Typography>
        <Button onClick={handleSubmit} disabled={disabled} loading={loading}>
          {editablePost ? 'Save changes' : 'Share'}
        </Button>
      </Header>
      <Box display="grid" gridTemplateColumns={isSm ? '1fr' : '2fr 1fr'} height="80vh">
        <DropZoneBox>
          {editablePost && <PostMediaView post={editablePost} />}
          {mediaUrl && (
            <>
              <CloseButton color="inherit" onClick={() => setFile(null)}>
                <CloseRounded fontSize="large" />
              </CloseButton>
              <PostMediaView post={editablePost} mediaUrl={mediaUrl} />
            </>
          )}
          {!file && !editablePost && <MediaDropZone onLoad={handleFileChange} />}
        </DropZoneBox>
        <Box>
          <Box padding={1}>
            <UserAvatar size={42} user={authUser} withUsername />
          </Box>
          <PostTextarea value={content} onChange={setContent} />
        </Box>
      </Box>
    </StyledDialog>
  );
};

export default PostFormDialog;
