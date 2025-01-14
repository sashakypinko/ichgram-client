import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Box, IconButton, styled, TextField, Typography } from '@mui/material';
import Button from '@shared/components/button';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { createComment } from '@entities/comment/store/slice';
import { selectComment } from '@entities/comment/store/selectors';
import { SentimentSatisfiedOutlined } from '@mui/icons-material';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    padding: 0,

    '& fieldset': {
      border: 'none',
    },

    '& textarea': {
      fontSize: 15,
      padding: 16,
    },
  },
});

const SymbolCount = styled(Typography)({
  position: 'absolute',
  right: 100,
  bottom: 6,
  color: '#C7C7C7',
});

interface Props {
  postId: string;
  maxLength?: number;
}

const CommentInput: FC<Props> = ({ postId, maxLength = 256 }) => {
  const [text, setText] = useState<string>('');
  const { createLoading } = useAppSelector(selectComment);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.length > maxLength) {
      return;
    }

    setText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit();
    }
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
    <Box position="relative" display="flex" alignItems="end" gap={2}>
      <IconButton>
        <SentimentSatisfiedOutlined fontSize="large" />
      </IconButton>
      <StyledTextField
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment..."
        maxRows={4}
        multiline
        fullWidth
      />
      <Button onClick={handleSubmit} disabled={!text} loading={createLoading}>
        Send
      </Button>
      {!!text.length && (
        <SymbolCount variant="body2">
          {text.length}/{maxLength}
        </SymbolCount>
      )}
    </Box>
  );
};

export default CommentInput;
