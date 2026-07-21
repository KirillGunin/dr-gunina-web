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
