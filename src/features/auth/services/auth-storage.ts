import StorageService from '@app/services/storage-service';

class AuthStorageService extends StorageService {
  getAccessToken = (): string | null => this.get('accessToken');

  storeAccessToken = (token: string | undefined): void => {
    this.store('accessToken', token);
  };

  removeAccessToken = (): void => {
    this.remove('accessToken');
  };

  getRefreshToken = (): string | null => this.get('refreshToken');

  storeRefreshToken = (token: string | undefined): void => {
    this.store('refreshToken', token);
  };

  removeRefreshToken = (): void => {
    this.remove('refreshToken');
  };
}

export const AuthStorage = new AuthStorageService();
