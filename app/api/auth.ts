import { appendResponseHeader } from 'h3';
import type { LoginPayload, LoginResponse, RefreshResponse } from '~/types/auth';
import type { User } from '~/types/user';

/**
 * Ротация refresh-токена на /auth/refresh приходит как Set-Cookie на серверный
 * (SSR) HTTP-запрос к бэкенду, а не на ответ, который Nitro шлёт браузеру.
 * Без ручной пересылки браузер продолжает слать уже удалённый на бэкенде
 * refresh-токен и разлогинивается на следующей перезагрузке.
 */
const relaySetCookie = (setCookie: unknown) => {
    if (!setCookie) {
        return;
    }

    const event = useRequestEvent();

    if (!event) {
        return;
    }

    const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

    for (const cookie of cookies) {
        appendResponseHeader(event, 'set-cookie', String(cookie));
    }
};

/**
 * Отправляет запрос на логин пользователя
 * @param data - почта и пароль для логина
 */
export const loginRequest = async (data: LoginPayload) => {
    const { $axios } = useNuxtApp();

    return $axios
        .post<LoginResponse>('/auth/login', data)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

/**
 * Отправляет запрос на выход из аккаунта
 */
export const logoutRequest = async () => {
    const { $axios } = useNuxtApp();

    return $axios
        .post('/auth/logout')
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

/**
 * Обновляет access_token по httpOnly refresh-cookie.
 * На SSR cookie браузера не форвардится в исходящие запросы автоматически,
 * поэтому её нужно прокинуть вручную из входящего запроса.
 *
 * Использует await вместо .then()/.catch(): вызов useRequestEvent() в
 * relaySetCookie должен идти как продолжение await, а не колбэк промиса —
 * иначе он теряет Nuxt SSR-контекст на границе реального сетевого запроса.
 */
export const refresh = async () => {
    const { $axios } = useNuxtApp();
    const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined;

    const response = await $axios.post<RefreshResponse>('/auth/refresh', undefined, { headers });

    if (import.meta.server) {
        relaySetCookie(response.headers['set-cookie']);
    }

    return response;
};

/**
 * Отправляет запрос на получение текущего пользователя по access_token.
 * На SSR cookie браузера не форвардится в исходящие запросы автоматически,
 * поэтому её нужно прокинуть вручную из входящего запроса (см. refresh()).
 */
export const meRequest = async () => {
    const { $axios } = useNuxtApp();
    const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined;

    return $axios
        .get<User>('/auth/me', { headers })
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
