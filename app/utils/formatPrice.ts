/**
 * Форматирует цену добавляя разделитель и обозначение валюты
 * @param price - цена строкой или числом
 */
export const formatPrice = (price: number | string) => {
    const priceToNumber = Number(price);

    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumSignificantDigits: 1,
    });

    return formatter.format(priceToNumber);
};
