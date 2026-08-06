import type { PollenColor, PollenDate } from '~/types/pollen';

/**
 * Форматирует дату в локализованный вид, например "5 августа 2026"
 * @param date - дату в формате PollenDate
 * @param locale - локаль ("es", "en", "ru")
 */
export const formatPollenDate = (date: PollenDate, locale: string) => {
    if (!date) {
        return '';
    }

    const { year, month, day } = date;
    const jsDate = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        //year: 'numeric',
    }).format(jsDate);
};

/**
 * Конвертирует PollenColor (каналы 0-1, как в Google Pollen API) в CSS rgb()
 * @param color - цвет в формате PollenColor
 */
export const pollenColorToCss = (color?: PollenColor): string | undefined => {
    if (!color) {
        return undefined;
    }

    const { red = 0, green = 0, blue = 0 } = color;

    return `rgb(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)})`;
};

/**
 * Подбирает контрастный цвет текста (чёрный/белый) под фон PollenColor
 * @param color - цвет фона в формате PollenColor
 */
export const getContrastTextColor = (color?: PollenColor): string => {
    if (!color) {
        return '#1a1a1a';
    }

    const { red = 0, green = 0, blue = 0 } = color;
    const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;

    return luminance > 0.6 ? '#1a1a1a' : '#ffffff';
};
