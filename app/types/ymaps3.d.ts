/// <reference types="@yandex/ymaps3-types" />

declare global {
    interface Window {
        ymaps3: typeof import('@yandex/ymaps3-types');
    }
}

export {};
