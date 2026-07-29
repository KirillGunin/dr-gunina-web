import type { Ref } from 'vue';
import { validationMessages } from '@/composables/useCustomRules';
import type { LoginPayload } from '~/types/auth';

/**
 * Возвращает правила валидации формы логина
 * @param state - стейт формы
 */
export const useLoginRules = (state: Ref<LoginPayload>) => {
    const { required, email, maxLength } = validationMessages(state);

    const loginRules = {
        email: { required, email },
        password: { required, maxLength: maxLength(30) },
    };

    return { loginRules };
};
