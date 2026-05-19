/**
 * Управляет сменой темы интерфейсов сайта и карты
 */
export const useTheme = () => {
    const theme = useCookie('theme');
    const { setTheme } = useYandexMap();

    const isDarkMode = computed(() => theme.value === 'dark');

    const toggleMode = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';

        if (theme.value === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark-mode');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark-mode');
        }
    };

    return { isDarkMode, toggleMode };
};
