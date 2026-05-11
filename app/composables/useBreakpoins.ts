import { computed } from 'vue';

export const useBreakpoints = () => {
    const { width } = useWindowSize({ initialWidth: 0 });

    const isMobile = computed(() => width.value < 768);
    const isTablet = computed(() => width.value >= 768 && width.value < 1024);
    const isDesktop = computed(() => width.value >= 1024);

    return { isMobile, isTablet, isDesktop };
};
