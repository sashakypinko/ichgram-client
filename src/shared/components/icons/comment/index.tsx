import { FC } from 'react';
import { Icon, IconProps } from '../icon';
const Comment: FC<IconProps> = ({ size = 24 }) => (
  <Icon>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  </Icon>
);

export default Comment;
