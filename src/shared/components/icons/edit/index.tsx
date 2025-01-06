import { FC } from 'react';
import { Icon, IconProps } from '../icon';

const Edit: FC<IconProps> = ({ size = 24 }) => (
  <Icon>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="black" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="translate(-2, 1)"
      ></path>
      <line
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="translate(-2, 1)"
        x1="16.848"
        x2="20.076"
        y1="3.924"
        y2="7.153"
      ></line>
    </svg>
  </Icon>
);

export default Edit;
