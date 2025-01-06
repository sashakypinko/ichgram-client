import { type FC } from 'react';

export interface RouteInterface {
  path: string;
  Component: FC<any>;
  authOnly?: boolean;
  unauthorizedOnly?: boolean;
  allowedFor?: string[];
  redirectTo?: string;
}
