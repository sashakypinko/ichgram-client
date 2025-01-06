import { FC } from 'react';
import { Icon, IconProps } from '../icon';

const Reply: FC<IconProps> = ({ size = 25 }) => (
  <Icon>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="black" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 8.999H4.413l5.294-5.292a1 1 0 1 0-1.414-1.414l-7 6.998c-.014.014-.019.033-.032.048A.933.933 0 0 0 1 9.998V10c0 .027.013.05.015.076a.907.907 0 0 0 .282.634l6.996 6.998a1 1 0 0 0 1.414-1.414L4.415 11H14a7.008 7.008 0 0 1 7 7v3.006a1 1 0 0 0 2 0V18a9.01 9.01 0 0 0-9-9Z"
        stroke="black"
        strokeWidth="0.1"
      />
    </svg>
  </Icon>
);

export default Reply;
