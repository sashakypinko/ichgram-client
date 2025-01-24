import { FC } from 'react';
import { IPost } from '@entities/post/model/post';
import { Size } from '@shared/enums/size.enum';
import MediaView from '@shared/components/media-view';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

interface Props {
  post: IPost | null;
  mediaUrl?: string;
}

const PostMediaView: FC<Props> = ({ post, mediaUrl }) => {
  const isSm = useIsBreakpoint(Breakpoint.SM);

  return (
    <MediaView
      sx={{
        borderRadius: isSm ? 0 : 1,
        maxHeight: isSm ? '45vh' : 'calc(100vh - 66px)',
        height: 'calc(100vh - 66px)',
      }}
      mediaId={post?.mediaId}
      mediaUrl={mediaUrl}
      size={Size.LARGE}
      withFullView={false}
    />
  );
};

export default PostMediaView;
