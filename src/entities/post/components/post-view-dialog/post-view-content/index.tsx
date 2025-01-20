import { FC, useState } from 'react';
import { styled, Typography, Box, useTheme } from '@mui/material';
import UserAvatar from '@entities/user/components/user-avatar';
import { IPost } from '@entities/post/model/post';
import PostDate from '@entities/post/components/post-date';
import Breakpoint from '@shared/enums/breakpoint.enum';
import { shortenString } from '@shared/helpers/string-helper';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';

const Content = styled(Box)({
  display: 'flex',
  alignItems: 'start',
  paddingBottom: 16,
  gap: 24,
});

interface Props {
  post: IPost;
}

const PostViewContent: FC<Props> = ({ post }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const theme = useTheme();
  const isSm = useIsBreakpoint(Breakpoint.SM);

  return (
    <Content>
      <UserAvatar size={42} user={post.author} />
      <Box>
        <Typography sx={{ pr: 1 }} fontWeight={600} component="span">
          {post.author.username}
        </Typography>
        <Typography component="span">{showMore || !isSm ? post.content : shortenString(post.content, 56)}</Typography>
        {post.content.length > 56 && isSm && (
          <Typography
            component="span"
            sx={{ cursor: 'pointer' }}
            color={theme.palette.text.secondary}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? ' less' : ' more'}
          </Typography>
        )}
        <PostDate post={post} />
      </Box>
    </Content>
  );
};

export default PostViewContent;
