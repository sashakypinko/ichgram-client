import { FC } from 'react';
import { Icon, IconProps } from '../icon';

const Home: FC<IconProps> = ({ size = 25, inverse = false }) => (
  <Icon>
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={inverse ? 'black' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Img - &#208;&#147;&#208;&#187;&#208;&#176;&#208;&#178;&#208;&#189;&#208;&#176;&#209;&#143;">
        <path
          id="Vector"
          d="M10.005 15.545C10.005 14.7501 10.3208 13.9878 10.8828 13.4258C11.4448 12.8638 12.2071 12.548 13.002 12.548C13.3957 12.5479 13.7855 12.6253 14.1492 12.7758C14.5129 12.9264 14.8434 13.1471 15.1218 13.4254C15.4002 13.7038 15.6211 14.0342 15.7718 14.3979C15.9224 14.7615 16 15.1513 16 15.545V21H23V10.543L13 1L3 10.543V21H10.005V15.545Z"
          stroke="black"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  </Icon>
);

export default Home;
