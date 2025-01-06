import { RouteEnum } from '@app/routes/enums/route.enum';

export const getActivePath = (): RouteEnum => {
  const currentURL = window.location.href;
  const domain = window.location.origin;
  const urlWithoutDomain = currentURL.replace(domain, '');

  return urlWithoutDomain.split('?')[0] as RouteEnum;
};

export const matchRoute = (route: RouteEnum): boolean => {
  const currentPath = getActivePath();

  const routeSegments = route.split(':').filter(Boolean);

  return currentPath.includes(routeSegments[0]);
};
