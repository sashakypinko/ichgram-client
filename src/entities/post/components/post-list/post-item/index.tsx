import { FC, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { IPost } from '@entities/post/model/post';
import { getMediumMediaUrl } from '@shared/helpers/media-helper';
import { useAppDispatch } from '@app/hooks';
import { openPostViewDialog } from '@entities/post/store/slice';
import { addGetParam } from '@shared/helpers/url-helper';
import Comment from '../../../../../shared/components/icons/comment';
import { FavoriteRounded } from '@mui/icons-material';

const PostItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
});

const Image = styled('img')({
  width: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
});

const PostInfo = styled(Box)({
  background: 'rgba(0,0,0,0.34)',
  color: '#fff',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 24,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
});

interface Props {
  post: IPost;
}

const PostItem: FC<Props> = ({ post }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openPostViewDialog(post));
    addGetParam('postId', post._id);
  }
  
  const mediaUrl = getMediumMediaUrl(post.mediaId);

  return (
    <PostItemContainer
      onClick={handleOpen} 
      onMouseOver={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      {
        hovered && (
          <PostInfo>
            <Box display="flex" alignItems="center" gap={1}>
              <FavoriteRounded fontSize="large" />
              <Typography variant="h5">{post.likedBy.length}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Comment />
              <Typography variant="h5">{post.commentsCount}</Typography>
            </Box>
          </PostInfo>
        )
      }
      <Image src={mediaUrl} alt="post_item" />
    </PostItemContainer>
  );
};

export default PostItem;
