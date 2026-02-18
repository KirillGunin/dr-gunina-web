export const useYandexMap = () => {
    const initMap = async (
        containerId: string,
        center: [number, number],
        zoom: number,
        markers?: Array<{ coordinates: [number, number]; title?: string; onClick?: () => void }>
    ) => {
        await window.ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
            window.ymaps3;

        const map = new YMap(document.getElementById(containerId)!, {
            location: { center, zoom },
        });

        //map.addChild(new YMapDefaultSchemeLayer({ theme: 'dark' }));
        map.addChild(new YMapDefaultSchemeLayer({}));
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

    return { initMap };
};
