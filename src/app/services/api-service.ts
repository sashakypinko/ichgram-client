import type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { AuthStorage } from '@features/auth/services/auth-storage';
import { AuthData } from '@features/auth/types';

export default class ApiService {
  private readonly instance: AxiosInstance;

  constructor(protected readonly pathPrefix: string) {
    this.instance = axios.create({ baseURL: import.meta.env.VITE_API_URL });
    this.setupInterceptors();
  }

  private makeFormData = (data: object = {}): FormData => {
    const formData = new FormData();
    const appendFormData = (dataToAppend: object, path = '') => {
      Object.entries(dataToAppend || {}).forEach(([name, value]) => {
        const newPath = path ? `${path}[${name}]` : name;
        if (name === 'media') {
          formData.append(newPath, value);
        } else if (typeof value === 'object') {
          appendFormData(value, newPath);
        } else if (typeof value === 'boolean') {
          formData.append(newPath, value ? '1' : '0');
        } else {
          formData.append(newPath, value);
        }
      });
    };
    appendFormData(data);

    return formData;
  };

  get = (url: string, params = {}): Promise<AxiosResponse> => {
    return this.instance.get(`/${this.pathPrefix}/${url}`, { params });
  };

  post = async (url: string, data = {}, isJson = true): Promise<AxiosResponse> => {
    return this.instance.post(`/${this.pathPrefix}/${url}`, isJson ? data : this.makeFormData(data));
  };

  put = async (url: string, data = {}, isJson = true): Promise<AxiosResponse> => {
    return this.instance.put(`/${this.pathPrefix}/${url}`, isJson ? data : this.makeFormData(data));
  };

  patch = async (url: string, data = {}): Promise<AxiosResponse> => {
    return this.instance.patch(`/${this.pathPrefix}/${url}`, data);
  };

  delete = async (url: string, query = {}): Promise<AxiosResponse> => {
    return this.instance.delete(`/${this.pathPrefix}/${url}`, query);
  };

  private setupInterceptors() {
    const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      config.headers.Authorization = `Bearer ${AuthStorage.getAccessToken()}`;
      return config;
    };

    const onRequestError = async (error: AxiosError): Promise<AxiosError> => await Promise.reject(error);

    const onResponse = (response: AxiosResponse): AxiosResponse => response;

    const onResponseError = async (error: AxiosError): Promise<AxiosError | void> => {
      const config = error.config as AxiosRequestConfig & { tries?: number };
      config.tries = config.tries || 0;

      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      if (config.tries < 3) {
        config.tries += 1;

        try {
          const response = await this.instance.post<{
            data: AuthData;
          }>(
            `${import.meta.env.VITE_API_URL}/auth/refresh-tokens`,
            {
              refreshToken: AuthStorage.getRefreshToken(),
            },
            config,
          );

          AuthStorage.storeAccessToken(response.data.data.accessToken);
          AuthStorage.storeRefreshToken(response.data.data.refreshToken);

          return this.instance.request(config);
        } catch (e) {
          return Promise.reject(error);
        }
      }

      AuthStorage.removeAccessToken();
      AuthStorage.removeRefreshToken();

      window.location.reload();
    };

    this.instance.interceptors.request.use(onRequest, onRequestError);
    this.instance.interceptors.response.use(onResponse, onResponseError);
  }
}
