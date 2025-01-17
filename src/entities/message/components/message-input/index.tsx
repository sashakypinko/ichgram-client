import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Box, IconButton, styled, TextField } from '@mui/material';
import { SendRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { sendMessage, updateMessage } from '@entities/message/store/slice';
import { selectMessage } from '@entities/message/store/selectors';
import { Media } from '@shared/components/icons';
import HiddenFileInput from '@shared/components/hidden-file-input';
import Extensions from '@shared/enums/extensions.enum';
import Thumbnail from '@shared/components/thumbnail';
import { validateFileSize } from '@shared/helpers/file-helper';
import useSnackbar from '@shared/components/snackbar/hooks/use-snackbar.hook';
import EmojiPickers from '@shared/components/emoji-picker';

const InputContainer = styled(Box)(({ theme }) => ({
  padding: 8,
  borderRadius: 25,
  border: '1px solid',
  borderColor: theme.palette.text.disabled,
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    padding: 0,

    '& fieldset': {
      border: 'none',
    },

    '& textarea': {
      fontSize: 15,
      padding: '0 16px',
    },
  },
});

interface Props {
  conversationId: string;
  onSent?: () => void;
}

const MessageInput: FC<Props> = ({ conversationId, onSent }) => {
  const [text, setText] = useState<string>('');
  const [media, setMedia] = useState<File | null>(null);
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const { sending, editingMessage, replyingMessage } = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();
  const { errorSnackbar } = useSnackbar();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeText(e.target.value);
  };

  const changeText = (newText: string) => {
    if (newText.length > 512) {
      return;
    }

    setText(newText);
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
          onError: () => {
            errorSnackbar("Something went wrong. Can't send message!");
          },
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

  const handleClick = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart;
      setCursorPosition(position || 0);
    }
  };

  const handleSelectFile = ([file]: FileList) => {
    if (!file) return;

    if (validateFileSize(file, 20)) {
      setMedia(file);
    } else {
      errorSnackbar('The file size cannot be greater then 20MB.');
    }
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
        onClick={handleClick}
        placeholder="Message"
        disabled={sending}
        inputRef={inputRef}
        InputProps={{
          startAdornment: <EmojiPickers value={text} cursorPosition={cursorPosition} onChange={changeText} />,
          endAdornment: (
            <Box display="flex" alignItems="center">
              <IconButton component="label">
                <HiddenFileInput
                  accept={[Extensions.PNG, Extensions.GIF, Extensions.XLSX]}
                  onSelect={handleSelectFile}
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
