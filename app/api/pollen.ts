import type { LngLat } from '@yandex/ymaps3-types/common/types';

/**
 * Отправляет запрос на получение данных о пыльце
 */
export const fetchPollen = async (coordinates: LngLat) => {
    const { $axios } = useNuxtApp();
    const [lng, lat] = coordinates;

    return $axios
        .get(`/pollen?lat=${lat}&lng=${lng}`)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
