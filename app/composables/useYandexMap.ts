import type { YMap, YMapDefaultSchemeLayer, YMapMarker } from '@yandex/ymaps3-types';
import type { LngLat } from '@yandex/ymaps3-types/common/types';

let ymapsScriptPromise: Promise<void> | null = null;

const loadYmapsScript = (): Promise<void> => {
    if (window.ymaps3) {
        return Promise.resolve();
    }

    if (!ymapsScriptPromise) {
        const { public: publicConfig } = useRuntimeConfig();

        ymapsScriptPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/v3/?apikey=${publicConfig.yandexMapsApiKey}&lang=ru_RU`;
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    return ymapsScriptPromise;
};

let mapInstance: YMap | null = null;
let schemeLayerInstance: YMapDefaultSchemeLayer | null = null;
const pointMarkers = new WeakMap<YMap, YMapMarker>();

export const useYandexMap = () => {
    const initMap = async (
        container: HTMLElement,
        center: [number, number],
        zoom: number,
        markers?: Array<{ coordinates: [number, number]; title?: string; onClick?: () => void }>,
        onMapClick?: (coordinates: LngLat) => void
    ) => {
        await loadYmapsScript();
        await window.ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapListener } =
            window.ymaps3;

        const theme = useCookie('theme').value === 'dark' ? 'dark' : 'light';

        const map = new YMap(container, {
            location: { center, zoom },
            theme: theme,
        });

        const schemeLayer = new YMapDefaultSchemeLayer({});

        mapInstance = map;
        schemeLayerInstance = schemeLayer;

        map.addChild(schemeLayer);
        map.addChild(new YMapDefaultFeaturesLayer({}));

        if (onMapClick) {
            const listener = new YMapListener({
                onClick: (_object, event) => onMapClick(event.coordinates),
            });
            map.addChild(listener);
        }

        if (markers && markers.length > 0) {
            markers.forEach((markerData) => {
                const markerElement = document.createElement('div');
                markerElement.className = 'yandex-marker';

                if (markerData.onClick) {
                    markerElement.addEventListener('click', markerData.onClick);
                }

                const marker = new YMapMarker(
                    {
                        coordinates: markerData.coordinates,
                        draggable: false,
                    },
                    markerElement
                );

                map.addChild(marker);
            });
        }

        return map;
    };

    const setPointMarker = (map: YMap, coordinates: LngLat) => {
        const { YMapMarker } = window.ymaps3;

        const existingMarker = pointMarkers.get(map);

        if (existingMarker) {
            map.removeChild(existingMarker);
        }

        const markerElement = document.createElement('div');
        markerElement.className = 'yandex-marker';

        const marker = new YMapMarker({ coordinates, draggable: false }, markerElement);

        map.addChild(marker);
        pointMarkers.set(map, marker);
    };

    const setTheme = (theme: 'light' | 'dark') => {
        if (!mapInstance || !schemeLayerInstance) {
            return;
        }

        const { YMapDefaultSchemeLayer } = window.ymaps3;

        mapInstance.removeChild(schemeLayerInstance);
        schemeLayerInstance = new YMapDefaultSchemeLayer({ theme });
        mapInstance.addChild(schemeLayerInstance, 0);
    };

    return { initMap, setTheme, setPointMarker };
};
