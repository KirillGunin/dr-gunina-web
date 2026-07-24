/**
 * Возвращает номер телефона в формате +7 (999) 999-99-99
 * @param phone - строка с номером телефона (10 или 11 цифр)
 */
export const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '').slice(-10);

    if (digits.length !== 10) {
        return '';
    }

    return digits.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4');
};
