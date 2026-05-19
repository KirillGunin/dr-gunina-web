export default defineNuxtPlugin(() => {
    const theme = useCookie('theme');

    if (theme.value === 'dark') {
        document.documentElement.classList.add('dark-mode');
    }
});
