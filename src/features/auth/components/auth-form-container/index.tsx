import { FC, ReactNode } from 'react';
import BorderedBox from '../bordered-box';
import logo from '@assets/img/logo.svg';

interface Props {
  imgSrc?: string;
  children: ReactNode;
}

const AuthFormContainer: FC<Props> = ({ imgSrc = logo, children }) => {
  return (
    <BorderedBox>
      <img src={imgSrc} alt="logo" />
      {children}
    </BorderedBox>
  );
};

export default AuthFormContainer;
