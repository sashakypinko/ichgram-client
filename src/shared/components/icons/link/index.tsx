import { FC } from 'react';
import { Icon, IconProps } from '../icon';

const Link: FC<IconProps> = ({ size = 12, inverse = false }) => (
  <Icon>
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={inverse ? 'black' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.86287 2.56149L5.47687 1.94749C6.08368 1.34081 6.90665 1.00003 7.76472 1.00012C8.62279 1.00022 9.44568 1.34117 10.0524 1.94799C10.659 2.5548 10.9998 3.37777 10.9997 4.23584C10.9996 5.09392 10.6587 5.91681 10.0519 6.52349L9.43837 7.13699M7.13687 9.43849L6.52287 10.0525C5.91605 10.6592 5.09309 11 4.23501 10.9999C3.37694 10.9998 2.55405 10.6588 1.94737 10.052C1.34068 9.44517 0.999906 8.62221 1 7.76414C1.00009 6.90606 1.34105 6.08317 1.94787 5.47649L2.56137 4.86299"
        stroke="#00376B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.23535 7.76447L7.76435 4.23547" stroke="#00376B" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Icon>
);

export default Link;