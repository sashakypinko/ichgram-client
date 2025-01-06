import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { Box, IconButton, styled, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { sendMessage, updateMessage } from '@entities/message/store/slice';
import { selectMessage } from '@entities/message/store/selectors';
import { Media } from '@shared/components/icons';
import HiddenFileInput from '@shared/components/hidden-file-input';
import Extensions from '@shared/enums/extensions.enum';
import Thumbnail from '@shared/components/thumbnail';
import { SendRounded } from '@mui/icons-material';

const InputContainer = styled(Box)(({ theme }) => ({
  padding: 8,
  borderRadius: 25,
  border: '1px solid',
  borderColor: theme.palette.text.disabled,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    padding: 0,

    '& fieldset': {
      border: 'none',
    },

    '& textarea': {
      fontSize: 15,
      padding: '0 40px',
    },
  },
}));

interface Props {
  conversationId: string;
  onSent?: () => void;
}

const MessageInput: FC<Props> = ({ conversationId, onSent }) => {
  const [text, setText] = useState<string>('');
  const [media, setMedia] = useState<File | null>(null);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);

  const { sending, editingMessage, replyingMessage } = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 512) {
      return;
    }
    setText(e.target.value);
  };

  const submit = () => {
    setText('');
    setMedia(null);

    if (editingMessage) {
      dispatch(
        updateMessage({
          payload: {
            messageId: editingMessage._id,
            content: text,
          },
          onSuccess: onSent,
        }),
      );
      return;
    }

    dispatch(
      sendMessage({
        payload: {
          conversationId,
          content: text,
          ...(replyingMessage?._id && { repliedTo: replyingMessage._id }),
          ...(media && { media }),
        },
        onSuccess: onSent,
      }),
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13 && !isShiftPressed) {
      e.preventDefault();
      submit();
    }
    if (e.keyCode === 16) {
      setIsShiftPressed(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.keyCode === 16) {
      setIsShiftPressed(false);
    }
  };

  useEffect(() => {
    setText(editingMessage ? editingMessage.content : '');
  }, [editingMessage]);

  return (
    <InputContainer>
      {media && <Thumbnail file={media} onCancel={() => setMedia(null)} />}
      <StyledTextField
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Message"
        disabled={sending}
        InputProps={{
          endAdornment: (
            <Box display="flex" alignItems="center">
              <IconButton component="label">
                <HiddenFileInput
                  accept={[Extensions.PNG, Extensions.GIF, Extensions.XLSX]}
                  onSelect={(files) => setMedia(files[0])}
                />
                <Media />
              </IconButton>
              <IconButton color="inherit" onClick={submit} disabled={!text && !media}>
                <SendRounded />
              </IconButton>
            </Box>
          ),
        }}
        maxRows={4}
        multiline
        fullWidth
      />
    </InputContainer>
  );
};

export default MessageInput;
