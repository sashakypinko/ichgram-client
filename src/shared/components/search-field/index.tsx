import { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from 'react';
import { IconButton, styled, TextField } from '@mui/material';
import debounce from 'debounce';
import { CancelRounded } from '@mui/icons-material';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    background: '#EFEFEF',
    borderRadius: 8,
    padding: 4,

    '& fieldset': {
      border: 'none',
    },

    '& input': {
      fontSize: 16,
      fontWeight: 300,
      padding: '8px 12px',
    },
  },
});

interface Props {
  placeholder?: string;
  onSearch: (search: string) => void;
}

const SearchField: FC<Props> = ({ onSearch, placeholder = 'Search' }) => {
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onSearch(searchValue);
    }, 500),
    [onSearch],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch('');
    onSearch('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSearch(search);
    }
  };

  return (
    <StyledTextField
      value={search}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleClear}>
            <CancelRounded />
          </IconButton>
        ),
      }}
      fullWidth
    />
  );
};

export default SearchField;
