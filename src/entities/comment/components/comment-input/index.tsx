import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { Box, styled, TextField, Typography } from '@mui/material';
import Button from '@shared/components/button';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { createComment } from '@entities/comment/store/slice';
import { selectComment } from '@entities/comment/store/selectors';
import Breakpoint from '@shared/enums/breakpoint.enum';
import EmojiPickers from '@shared/components/emoji-picker';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: 0,

    '& fieldset': {
      border: 'none',
    },

    '& textarea': {
      fontSize: 15,
      padding: 16,
    },

    [theme.breakpoints.down(Breakpoint.SM)]: {
      '& textarea': {
        fontSize: 12,
      },
    },

    [theme.breakpoints.down(Breakpoint.MD)]: {
      '& textarea': {
        fontSize: 13,
      },
    },
  },
}));

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
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const { createLoading } = useAppSelector(selectComment);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  };

  const changeText = (newText: string) => {
    if (newText.length > maxLength) {
      return;
    }

    setText(newText);
  };

  const handleClick = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart;
      setCursorPosition(position || 0);
    }
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
      <EmojiPickers value={text} cursorPosition={cursorPosition} onChange={changeText} />
      <StyledTextField
        inputRef={inputRef}
        value={text}
        onClick={handleClick}
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
