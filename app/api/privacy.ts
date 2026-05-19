/**
 * Отправляет запрос на получение html для страницы с политикой конфиденциальности и оферты
 */
export const fetchPrivacyContent = async () => {
    const { $axios } = useNuxtApp();

    return $axios
        .get('/privacy')
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
