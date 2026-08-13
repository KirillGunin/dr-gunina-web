export type YandexMetrikaFn = ((...args: unknown[]) => void) & {
    a?: unknown[];
    l?: number;
};

declare global {
    interface Window {
        ym?: YandexMetrikaFn;
    }
}
