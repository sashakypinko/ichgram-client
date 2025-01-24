import { FC, useState } from 'react';
import { Dialog as MuiDialog, styled, Box, IconButton, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { MoreHoriz } from '@mui/icons-material';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { openPostFormDialog, removePost } from '@entities/post/store/slice';
import { IPost } from '@entities/post/model/post';
import { selectPost } from '@entities/post/store/selectors';

const StyledDialog = styled(MuiDialog)({
  '& .MuiPaper-root': {
    borderRadius: 12,
  },
});

const ActionsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const ActionItem = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 700,
  borderBottom: '1px solid #DBDBDB',
  padding: 16,
  cursor: 'pointer',

  '&:last-child': {
    borderBottom: 'none',
  },

  '&:active': {
    background: '#cacaca',
  },
});

const DangerActionItem = styled(ActionItem)(({ theme }) => ({
  color: theme.palette.error.main,
}));

interface Props {
  post: IPost;
}

const PostActions: FC<Props> = ({ post }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const { removeLoading } = useAppSelector(selectPost);
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  const handleEdit = () => {
    dispatch(openPostFormDialog(post));
  };

  const handleDelete = () => {
    dispatch(
      removePost({
        payload: post._id,
        onSuccess: () => setOpened(false),
      }),
    );
  };

  if (post.author._id !== authUser?._id) {
    return null;
  }

  return (
    <>
      <IconButton onClick={() => setOpened(true)}>
        <MoreHoriz />
      </IconButton>
      <StyledDialog maxWidth="xs" open={opened} onClose={() => setOpened(false)} fullWidth>
        <ActionsList>
          <DangerActionItem {...(removeLoading ? {} : { onClick: handleDelete })}>
            {removeLoading ? <CircularProgress color="inherit" size={20} /> : 'Delete'}
          </DangerActionItem>
          <ActionItem onClick={handleEdit}>Edit</ActionItem>
          <ActionItem onClick={() => setOpened(false)}>Cancel</ActionItem>
        </ActionsList>
      </StyledDialog>
    </>
  );
};

export default PostActions;
