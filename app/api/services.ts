/**
 * Отправляет запрос на получение списка сервисов
 */
export const fetchServices = async () => {
    const { $axios } = useNuxtApp();

    return $axios
        .get('/services')
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};

/**
 * Отправляет запрос на получение сервиса по его наименованию
 * @service - название сервиса
 */
export const fetchService = async (service: string) => {
    const { $axios } = useNuxtApp();

    return $axios
        .get(`/services/${service}`)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
