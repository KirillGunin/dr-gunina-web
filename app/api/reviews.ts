import type { NewReview } from '~/types/reviews';

/**
 * Отправляет запрос на получение списка отзывов
 */
export const fetchReviews = async () => {
    const { $axios } = useNuxtApp();

    return $axios
        .get('/reviews')
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

/**
 * Отправляет запрос на создание отзыва
 */
export const createReview = async (review: NewReview) => {
    const { $axios } = useNuxtApp();

    return $axios
        .post('/reviews', review)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

/**
 * Отправляет запрос на получение списка отзывов для можерации
 */
export const fetchPendingReviews = async () => {
    const { $axios } = useNuxtApp();

    return $axios
        .get('/reviews/pending')
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

/**
 * Отправляет запрос на подтверждения отзыва
 */
export const approvePendingReviews = async (id: string) => {
    const { $axios } = useNuxtApp();

    return $axios
        .patch(`/reviews/${id}/approve`)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

/**
 * Отправляет запрос на отклонения отзыва
 */
export const rejectPendingReviews = async (id: string) => {
    const { $axios } = useNuxtApp();

    return $axios
        .patch(`/reviews/${id}/reject`)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
