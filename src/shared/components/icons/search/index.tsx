import { FC } from 'react';
import { Icon, IconProps } from '../icon';
const Search: FC<IconProps> = ({ size = 25, inverse = false }) => (
  <Icon>
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill={inverse ? 'black' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 9.5C18 11.1811 17.5015 12.8245 16.5675 14.2223C15.6335 15.6202 14.306 16.7096 12.7528 17.353C11.1996 17.9963 9.49057 18.1647 7.84174 17.8367C6.1929 17.5087 4.67834 16.6992 3.4896 15.5104C2.30085 14.3217 1.4913 12.8071 1.16333 11.1583C0.835355 9.50943 1.00368 7.80036 1.64703 6.24719C2.29037 4.69402 3.37984 3.3665 4.77766 2.43251C6.17547 1.49852 7.81886 1 9.5 1C11.7543 1 13.9164 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5112 16.511L22.0002 22"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default Search;