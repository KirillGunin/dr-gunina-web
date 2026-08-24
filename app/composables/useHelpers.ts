/**
 * Фильтрует объект GET-параметров удаляя параметры с пустыми значениями
 * @param params - query-параметры объектом
 */
export const filterParams = (params: Record<string, unknown>) => {
    return Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== null && value !== '')
    );
};
