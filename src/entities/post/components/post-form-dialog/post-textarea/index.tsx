import { ChangeEvent, FC } from 'react';
import { Box, IconButton, styled, TextField, Typography } from '@mui/material';
import { SentimentSatisfiedOutlined } from '@mui/icons-material';

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
}

const PostTextarea: FC<Props> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (newValue.length > 2200) {
      return;
    }

    onChange(newValue);
  };
  
  return (
    <InputContainer>
      <StyledTextField
        value={value}
        onChange={handleChange}
        rows={8} 
        multiline
        fullWidth
      />
      <BottomBox>
        <IconButton>
          <SentimentSatisfiedOutlined fontSize="large" />
        </IconButton>
        <SymbolCount variant="body2">{value.length}/2200</SymbolCount>
      </BottomBox>
    </InputContainer>
  );
};

export default PostTextarea;
