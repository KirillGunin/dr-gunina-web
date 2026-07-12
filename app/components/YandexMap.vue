<template>
    <div ref="mapContainer" class="yandex-map" id="yandex-map"></div>
</template>

<script setup lang="ts">
import { useYandexMap } from '~/composables/useYandexMap';
import type { YMap } from '@yandex/ymaps3-types';
import type { Location } from '~/types/location';

const { initMap } = useYandexMap();

const mapContainer = useTemplateRef('mapContainer');
let mapInstance: YMap | null = null;

interface Props {
    center: [number, number];
    zoom: number;
    locations: Location[];
}

const props = defineProps<Props>();
const emits = defineEmits<{
    (event: 'marker:click', location: Location): void;
}>();

const markerClick = (location: Location) => {
    mapInstance?.setLocation({
        center: location.coordinates,
        zoom: 17,
        duration: 500,
    });

    emits('marker:click', location);
};

defineExpose({ markerClick });

const { stop } = useIntersectionObserver(
    mapContainer,
    async ([entry]) => {
        if (!entry?.isIntersecting) {
            return;
        }

        stop();

        mapInstance = await initMap(
            'yandex-map',
            props.center,
            props.zoom,
            props.locations.map((locations) => ({
                ...locations,
                onClick: () => markerClick(locations),
            }))
        );
    },
    { rootMargin: '200px' }
);
</script>
