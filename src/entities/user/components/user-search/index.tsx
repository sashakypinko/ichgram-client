import { FC } from 'react';
import SearchField from '@shared/components/search-field';
import { useAppDispatch } from '@app/hooks';
import { searchUsers } from '@entities/user/store/slice';

const UserSearch: FC = () => {
  const dispatch = useAppDispatch();

  const handleSearch = (search: string) => {
    dispatch(searchUsers(search));
  };

  return <SearchField onSearch={handleSearch} />;
};

export default UserSearch;
