import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refresh } from '~/api/auth';
import { useAuth } from '~/stores/auth';

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const axiosInstance = axios.create({
        baseURL: import.meta.server ? `${config.public.apiBaseUrl}/api` : '/api',
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        const i18n = nuxtApp.$i18n as { locale: Ref<string> };
        config.headers['Accept-Language'] = i18n.locale.value;

        const auth = useAuth();

        if (auth.accessToken) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }

        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) =>
            nuxtApp.runWithContext(async () => {
                const originalRequest = error.config as RetryableRequestConfig | undefined;
                const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh');
                const isLoginRequest = originalRequest?.url?.includes('/auth/login');

                if (
                    error.response?.status !== 401 ||
                    !originalRequest ||
                    originalRequest._retry ||
                    isRefreshRequest ||
                    isLoginRequest
                ) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                const auth = useAuth();

                try {
                    const { data } = await refresh();

                    auth.accessToken = data.access_token;
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    auth.accessToken = null;
                    auth.user = null;

                    await navigateTo('/');

                    return Promise.reject(refreshError);
                }
            })
    );

    return {
        provide: {
            axios: axiosInstance,
        },
    };
});
