import { FC, MouseEvent, useState } from 'react';
import CommonEmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { SentimentSatisfiedOutlined } from '@mui/icons-material';
import { Box, IconButton, Popover } from '@mui/material';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

interface Props {
  value: string;
  cursorPosition: number;
  onChange: (newValue: string) => void;
}

const EmojiPickers: FC<Props> = ({ value, cursorPosition, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isSm = useIsBreakpoint(Breakpoint.SM);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = (data: EmojiClickData) => {
    onChange(value.slice(0, cursorPosition) + data.emoji + value.slice(cursorPosition));
  };

  if (isSm) {
    return null;
  }

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpen}>
        <SentimentSatisfiedOutlined fontSize="large" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ sx: { borderRadius: 2 } }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <CommonEmojiPicker onEmojiClick={handleEmojiClick} emojiStyle={EmojiStyle.NATIVE} />
      </Popover>
    </Box>
  );
};

export default EmojiPickers;
