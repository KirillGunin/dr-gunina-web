/**
 * Фильтрует объект GET-параметров удаляя параметры с пустыми значениями
 * @param params - query-параметры объектом
 */
export const filterParams = (params: Record<string, unknown>) => {
    return Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== null && value !== '')
    );
};

/**
 * Получить склоненное слово в зависимости от переданного числа
 * @param count - оцениваемое количество
 * @param arr массив форм слова, например (например: ['элемент', 'элемента', 'элементов'])
 */
export const declOfNum = (count: number = 0, arr: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2] as const;

    if (count % 100 > 4 && count % 100 < 20) {
        return arr[2];
    }

    const dec = count % 10;

    return dec < 5 ? arr[cases[dec]!] : arr[cases[5]];
};
