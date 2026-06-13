import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const axiosInstance = axios.create({
        baseURL: config.public.apiBaseUrl + '/api',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        const i18n = nuxtApp.$i18n as { locale: Ref<string> };
        config.headers['Accept-Language'] = i18n.locale.value;
        return config;
    });

    return {
        provide: {
            axios: axiosInstance,
        },
    };
});
