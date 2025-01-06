import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Box, Chip, styled } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { IUser } from '@entities/user/model/user';
import { CloseRounded } from '@mui/icons-material';
import { useAppDispatch } from '@app/hooks';
import { searchUsers } from '@entities/user/store/slice';
import debounce from 'debounce';

const SearchContainer = styled(Box)({
  padding: 4,
});

const SelectedUsers = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'wrap',
});

const Input = styled('input')({
  outline: 'none',
  border: 'none',
  background: 'none',
  fontSize: 14,
  padding: 8,
});

interface Props {
  selected: IUser[];
  onChange: (newSelected: IUser[]) => void;
}

const UserMultiSearch: FC<Props> = ({ selected, onChange }) => {
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearch('');
  }, [selected]);

  const debouncedSearch = debounce((searchValue: string) => {
    dispatch(searchUsers(searchValue));
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleDelete = (deletableId: string) => {
    onChange(selected.filter(({ _id }) => deletableId !== _id));
  };

  return (
    <SearchContainer>
      <SelectedUsers>
        {selected.map((user: IUser) => (
          <Chip
            key={user._id}
            avatar={<UserAvatar user={user} />}
            label={user.username}
            variant="outlined"
            onDelete={() => handleDelete(user._id)}
            deleteIcon={<CloseRounded />}
          />
        ))}
        <Input value={search} onChange={handleChange} placeholder="Search..." />
      </SelectedUsers>
    </SearchContainer>
  );
};

export default UserMultiSearch;
