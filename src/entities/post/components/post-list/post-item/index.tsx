import { FC } from 'react';
import { Box, styled } from '@mui/material';
import { IPost } from '@entities/post/model/post';
import { getMediumMediaUrl } from '@shared/helpers/media-helper';
import { useAppDispatch } from '@app/hooks';
import { openPostViewDialog } from '@entities/post/store/slice';
import { addGetParam } from '@shared/helpers/url-helper';

const PostItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const Image = styled('img')({
  width: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
});

interface Props {
  post: IPost;
}

const PostItem: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openPostViewDialog(post));
    addGetParam('postId', post._id);
  }
  
  const mediaUrl = getMediumMediaUrl(post.mediaId);

  return (
    <PostItemContainer onClick={handleOpen}>
      <Image src={mediaUrl} alt="post_item" />
    </PostItemContainer>
  );
};

export default PostItem;
