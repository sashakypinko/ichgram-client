import { FC } from 'react';
import { Box, styled } from '@mui/material';
import { IPost } from '@entities/post/model/post';
import { getSmallMediaUrl } from '@shared/helpers/media-helper';
import { useAppDispatch } from '@app/hooks';
import { openPostViewDialog } from '@entities/post/store/slice';

const PostItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const Image = styled('img')({});

interface Props {
  post: IPost;
}

const PostItem: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const mediaUrl = getSmallMediaUrl(post.mediaId);

  return (
    <PostItemContainer onClick={() => dispatch(openPostViewDialog(post))}>
      <Image src={mediaUrl} alt="post_item" />
    </PostItemContainer>
  );
};

export default PostItem;
