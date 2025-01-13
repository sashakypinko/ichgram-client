import { FC, useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { closePostFormDialog, createPost, updatePost } from '@entities/post/store/slice';
import { Box, Dialog as MuiDialog, Grid, IconButton, styled, Typography } from '@mui/material';
import Button from '@shared/components/button';
import MediaDropZone from '@shared/components/media-drop-zone';
import UserAvatar from '@entities/user/components/user-avatar';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import MediaView from '@shared/components/media-view';
import { Size } from '@shared/enums/size.enum';
import { CloseRounded } from '@mui/icons-material';
import PostTextarea from '@entities/post/components/post-form-dialog/post-textarea';

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    borderRadius: 12,
    background: '#fff',
  },
});

const DropZoneBox = styled(Grid)({
  borderRight: '1px solid #DBDBDB',
  position: 'relative',
});

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
      }),
    );
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
        <Box sx={{ p: 2 }} />
        <Typography variant="h5">{editablePost ? 'Edit' : 'Create new'} post</Typography>
        <Button onClick={handleSubmit} disabled={disabled} loading={loading}>
          {editablePost ? 'Save changes' : 'Share'}
        </Button>
      </Header>
      <Grid sx={{ minHeight: 800 }} container>
        <DropZoneBox item xs={12} md={8}>
          {editablePost && (
            <MediaView
              sx={{ borderRadius: 1 }}
              mediaId={editablePost.mediaId}
              size={Size.ORIGINAL}
              withFullView={false}
            />
          )}
          {mediaUrl && (
            <>
              <CloseButton color="inherit" onClick={() => setFile(null)}>
                <CloseRounded fontSize="large" />
              </CloseButton>
              <MediaView sx={{ borderRadius: 1 }} mediaUrl={mediaUrl} size={Size.ORIGINAL} withFullView={false} />
            </>
          )}
          {!file && !editablePost && <MediaDropZone onLoad={setFile} />}
        </DropZoneBox>
        <Grid item xs={12} md={4}>
          <Box padding={1}>
            <UserAvatar size={42} user={authUser} withUsername />
          </Box>
          <PostTextarea value={content} onChange={setContent} />
        </Grid>
      </Grid>
    </StyledDialog>
  );
};

export default PostFormDialog;
