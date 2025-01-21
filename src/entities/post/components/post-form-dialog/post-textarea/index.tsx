import { ChangeEvent, FC, useRef, useState } from 'react';
import { Box, styled, TextField, Typography } from '@mui/material';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';
import EmojiPickers from '@shared/components/emoji-picker';

const InputContainer = styled(Box)({
  borderBottom: '1px solid #dbdbdb',
});

const BottomBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,
});

const SymbolCount = styled(Typography)({
  color: '#C7C7C7',
});

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

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  maxLength?: number;
}

const PostTextarea: FC<Props> = ({ value, onChange, maxLength = 2200 }) => {
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const isSm = useIsBreakpoint(Breakpoint.SM);

  const handleClick = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart;
      setCursorPosition(position || 0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  };

  const changeText = (newValue: string) => {
    if (newValue.length > maxLength) {
      return;
    }

    onChange(newValue);
  };

  return (
    <InputContainer>
      <StyledTextField
        inputRef={inputRef}
        placeholder="Add description here..."
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        rows={isSm ? 2 : 8}
        multiline
        fullWidth
      />
      <BottomBox>
        <EmojiPickers value={value} cursorPosition={cursorPosition} onChange={changeText} />
        <SymbolCount variant="body2">
          {value.length}/{maxLength}
        </SymbolCount>
      </BottomBox>
    </InputContainer>
  );
};

export default PostTextarea;
