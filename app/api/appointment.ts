import type { Appointment } from '~/types/appointment';

/**
 * Отправляет запрос для записи на консультацию
 * @param appointment - данные для записи консультации
 */
export const createAppointment = async (appointment: Appointment) => {
    const { $axios } = useNuxtApp();

    return $axios
        .post('/appointment', appointment)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
