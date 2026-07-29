/**
 * Форматирует дату и возвращает ее в формате ДД.ММ.ГГГГ
 * @param date - дату в формате Date
 */
export const formatDate = (date: string) => {
    if (!date) {
        return '';
    }

    const [yyyy, mm, dd] = date.split('T')[0]!.split('-');

    return `${dd}.${mm}.${yyyy}`;
};
