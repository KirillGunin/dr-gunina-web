const waitForYmaps = (): Promise<void> => {
    return new Promise((resolve) => {
        if (window.ymaps3) {
            resolve();
            return;
        }

        const interval = setInterval(() => {
            if (window.ymaps3) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
};

let mapInstance: any = null;
let schemeLayerInstance: any = null;

export const useYandexMap = () => {
    const initMap = async (
        containerId: string,
        center: [number, number],
        zoom: number,
        markers?: Array<{ coordinates: [number, number]; title?: string; onClick?: () => void }>
    ) => {
        await waitForYmaps();
        await window.ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
            window.ymaps3;

        const theme = useCookie('theme').value === 'dark' ? 'dark' : 'light';

        const map = new YMap(document.getElementById(containerId)!, {
            location: { center, zoom },
            theme: theme,
        });

        const schemeLayer = new YMapDefaultSchemeLayer({});

        mapInstance = map;
        schemeLayerInstance = schemeLayer;

        map.addChild(schemeLayer);
        map.addChild(new YMapDefaultFeaturesLayer({}));

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

    const setTheme = (theme: 'light' | 'dark') => {
        if (!mapInstance || !schemeLayerInstance) {
            return;
        }

        const { YMapDefaultSchemeLayer } = window.ymaps3;

        mapInstance.removeChild(schemeLayerInstance);
        schemeLayerInstance = new YMapDefaultSchemeLayer({ theme });
        mapInstance.addChild(schemeLayerInstance, 0);
    };

    return { initMap, setTheme };
};
