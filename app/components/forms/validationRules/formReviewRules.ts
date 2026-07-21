import type { Ref } from 'vue';
import { validationMessages } from '@/composables/useCustomRules';
import type { NewReview } from '~/types/reviews';

/**
 * Возвращает правила валидации формы отзыва
 * @param state - стейт формы
 */
export const useReviewRules = (state: Ref<NewReview>) => {
    const { required, name, isTruthy, phone } = validationMessages(state);

    const reviewRules = {
        name: { required, name },
        last_name: { required, name },
        phone: { required, phone },
        text: { required },
        agreement: { isTruthy },
    };

    return { reviewRules };
};
