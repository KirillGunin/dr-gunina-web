import { ref } from 'vue';
import { defineStore } from 'pinia';
import { meRequest, loginRequest, logoutRequest } from '~/api/auth';
import type { LoginPayload } from '~/types/auth';
import type { User } from '~/types/user';

export const useAuth = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const accessToken = ref<string | null>(null);

    const hasRole = (role: User['role']) => user.value?.role === role;

    /**
     * Функция вызыввет запрос на вход в аккаунт
     */
    const login = async (data: LoginPayload) => {
        const response = await loginRequest(data);

        accessToken.value = response.data.access_token;
        user.value = response.data.user;

        return response;
    };

    /**
     * Функция вызыввет запрос на выход из аккаунта
     */
    const logout = async () => {
        try {
            await logoutRequest();
        } finally {
            accessToken.value = null;
            user.value = null;
        }
    };

    /**
     * Функция вызыввет запрос на получение текущего пользователя по access_token
     */
    const me = async () => {
        const response = await meRequest();

        user.value = response.data;

        return response.data;
    };

    return {
        user,
        accessToken,
        hasRole,
        login,
        logout,
        me,
    };
});
