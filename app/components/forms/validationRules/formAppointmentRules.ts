import type { Ref } from 'vue';
import { validationMessages } from '@/composables/useCustomRules';

/**
 * Возвращает правила валидации формы записи консультации
 * @param state - стейт формы
 */
export const useAppointmentRules = (state: Ref<Record<string, any>>) => {
    const { required, isTruthy, phoneOrTelegram, phone, minLength } = validationMessages(state);

    const appointmentRules = {
        name: { required },
        childName: { required },
        childAge: { required },
        childGender: { required },
        phone: { phoneOrTelegram, phone },
        telegram: { phoneOrTelegram, minLength: minLength(5) },
        description: { required },
        agreement: { isTruthy },
    };

    return { appointmentRules };
};
