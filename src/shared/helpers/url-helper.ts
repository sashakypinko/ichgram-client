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

export const fetchGetParam = (key: string): string | null => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};

export const addGetParam = (key: string, value: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  history.pushState(null, '', url);
};


export const removeGetParam = (key: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  history.pushState(null, '', url);
};

