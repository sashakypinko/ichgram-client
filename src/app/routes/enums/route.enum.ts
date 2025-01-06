export enum RouteEnum {
  MAIN = '/feed',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  PASSWORD_RECOVERY = '/password-recovery',
  DIRECT = '/direct',
  DIRECT_CONVERSATION = '/direct/:id',
  EXPLORE = '/explore',
  PROFILE = '/profile/:username',
  OWN_PROFILE = '/profile/me',
  EDIT_PROFILE = '/edit-profile',
  NOT_FOUND = '*',
}
