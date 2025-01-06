import { FC, useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectPost } from '@entities/post/store/selectors';
import { closePostFormDialog, createPost } from '@entities/post/store/slice';
import { Box, Dialog as MuiDialog, Grid, styled, Typography } from '@mui/material';
import Button from '@shared/components/button';
import MediaDropZone from '@shared/components/media-drop-zone';
import UserAvatar from '@entities/user/components/user-avatar';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import MediaView from '@shared/components/media-view';
import { Size } from '@shared/enums/size.enum';

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    borderRadius: 12,
    background: '#fff',
  },
});

const DropZoneBox = styled(Grid)({
  borderRight: '1px solid #DBDBDB',
});

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 4,
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const PostFormDialog: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>('');

  const { postFormDialogOpened } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  useEffect(() => {
    console.log(file);
  }, [file]);

  const handleSubmit = () => {
    if (!file) return;

    dispatch(
      createPost({
        payload: {
          media: file,
          content,
        },
      }),
    );
  };

  const handleClose = () => {
    dispatch(closePostFormDialog());
  };

  const mediaUrl = useMemo(() => {
    if (!file) {
      return null;
    }

    return URL.createObjectURL(file);
  }, [file]);

  return (
    <StyledDialog maxWidth="lg" open={postFormDialogOpened} onClose={handleClose} fullWidth>
      <Header>
        <Box sx={{ p: 2 }} />
        <Typography variant="h5">Create new post</Typography>
        <Button onClick={handleSubmit}>Share</Button>
      </Header>
      <Grid sx={{ minHeight: 800 }} container>
        <DropZoneBox item xs={12} md={8}>
          {!file && false && (
            <MediaView sx={{ borderRadius: 1 }} mediaId={''} size={Size.ORIGINAL} withFullView={false} />
          )}
          {file ? <></> : <MediaDropZone onLoad={setFile} />}
        </DropZoneBox>
        <Grid item xs={12} md={4}>
          <UserAvatar user={authUser} withUsername />
        </Grid>
      </Grid>
    </StyledDialog>
  );
};

export default PostFormDialog;
