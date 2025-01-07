import { type ReactElement, useMemo } from 'react';
import { Navigate, Route, Routes as CommonRoutes } from 'react-router-dom';
import { type RouteInterface } from './interfaces/route.interface';
import { RouteEnum } from './enums/route.enum';
import { AuthStorage } from '@features/auth/services/auth-storage';

import SignInPage from '@pages/sign-in';
import SignUpPage from '@pages/sign-up';
import FeedPage from '@pages/feed';
import NotFoundPage from '@pages/not-found';
import ProfilePage from '@pages/profile';
import ExplorePage from '@pages/explore';
import DirectPage from '@pages/direct';
import EditProfilePage from '@pages/edit-profile';
import PasswordRecoveryPage from '@pages/password-recovery';

const DEFAULT_REDIRECT: string = RouteEnum.SIGN_IN;

const routes: RouteInterface[] = [
  {
    path: RouteEnum.SIGN_IN,
    Component: SignInPage,
    unauthorizedOnly: true,
    redirectTo: RouteEnum.MAIN,
  },
  {
    path: RouteEnum.SIGN_UP,
    Component: SignUpPage,
    unauthorizedOnly: true,
    redirectTo: RouteEnum.MAIN,
  },
  {
    path: RouteEnum.PASSWORD_RECOVERY,
    Component: PasswordRecoveryPage,
    unauthorizedOnly: true,
    redirectTo: RouteEnum.MAIN,
  },
  {
    path: RouteEnum.MAIN,
    Component: FeedPage,
    authOnly: true,
  },
  {
    path: RouteEnum.PROFILE,
    Component: ProfilePage,
    authOnly: true,
  },
  {
    path: RouteEnum.EDIT_PROFILE,
    Component: EditProfilePage,
    authOnly: true,
  },
  {
    path: RouteEnum.DIRECT_CONVERSATION,
    Component: DirectPage,
    authOnly: true,
  },
  {
    path: RouteEnum.DIRECT,
    Component: DirectPage,
    authOnly: true,
  },
  {
    path: RouteEnum.EXPLORE,
    Component: ExplorePage,
    authOnly: true,
  },
  {
    path: '/',
    Component: () => <Navigate to={RouteEnum.MAIN} />,
  },
];

const Routes = (): ReactElement => {
  const isAuth = !!AuthStorage.getAccessToken();

  const allowedRoutes: RouteInterface[] = useMemo(() => {
    return routes.map((route: RouteInterface) => {
      if ((route.authOnly && isAuth) || (route.unauthorizedOnly && !isAuth)) {
        return route;
      }

      return {
        ...route,
        Component: () => <Navigate to={route.redirectTo || DEFAULT_REDIRECT} />,
      };
    });
  }, [isAuth]);

  return (
    <CommonRoutes>
      {allowedRoutes.map((route: RouteInterface) => (
        <Route key={route.path} path={route.path} Component={route.Component} />
      ))}
      <Route path={RouteEnum.NOT_FOUND} Component={NotFoundPage} />
    </CommonRoutes>
  );
};

export default Routes;
