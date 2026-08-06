<template>
    <div ref="mapContainer" class="yandex-map"></div>
</template>

<script setup lang="ts">
import { useYandexMap } from '~/composables/useYandexMap';
import type { YMap } from '@yandex/ymaps3-types';
import type { LngLat } from '@yandex/ymaps3-types/common/types';
import type { Location } from '~/types/location';

const { initMap, setPointMarker } = useYandexMap();

const mapContainer = useTemplateRef('mapContainer');
let mapInstance: YMap | null = null;

interface Props {
    center: [number, number];
    zoom: number;
    locations: Location[];
    pinOnClick?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<{
    (event: 'marker:click', location: Location): void;
    (event: 'map:click', coordinates: LngLat): void;
}>();

const markerClick = (location: Location) => {
    mapInstance?.setLocation({
        center: location.coordinates,
        zoom: 17,
        duration: 500,
    });

    emits('marker:click', location);
};

const mapClick = (coordinates: LngLat) => {
    if (props.pinOnClick && mapInstance) {
        setPointMarker(mapInstance, coordinates);
    }

    emits('map:click', coordinates);
};

defineExpose({ markerClick, mapClick });

const { stop } = useIntersectionObserver(
    mapContainer,
    async ([entry]) => {
        if (!entry?.isIntersecting) {
            return;
        }

        stop();

        mapInstance = await initMap(
            mapContainer.value!,
            props.center,
            props.zoom,
            props.locations.map((locations) => ({
                ...locations,
                onClick: () => markerClick(locations),
            })),
            mapClick
        );
    },
    { rootMargin: '200px' }
);
</script>
