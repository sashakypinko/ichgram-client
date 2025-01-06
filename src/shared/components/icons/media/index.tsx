import { FC } from 'react';
import { Icon, IconProps } from '../icon';

const Media: FC<IconProps> = ({ size = 25 }) => (
  <Icon>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="black" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path>
      <path
        d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
        fill="none"
        stroke="black"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
      <path
        d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  </Icon>
);

export default Media;
