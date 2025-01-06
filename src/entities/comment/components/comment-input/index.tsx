import { ChangeEvent, FC, useState } from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@shared/components/button';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { createComment } from '@entities/comment/store/slice';
import { selectComment } from '@entities/comment/store/selectors';

interface Props {
  postId: string;
}

const CommentInput: FC<Props> = ({ postId }) => {
  const [text, setText] = useState<string>('');
  const { createLoading } = useAppSelector(selectComment);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      createComment({
        payload: { post: postId, text },
        onSuccess: () => {
          setText('');
        },
      }),
    );
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField value={text} onChange={handleChange} fullWidth />
      <Button onClick={handleSubmit} disabled={!text} loading={createLoading}>
        Send
      </Button>
    </Box>
  );
};

export default CommentInput;
