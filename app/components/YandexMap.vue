<template>
    <div class="yandex-map" id="yandex-map"></div>
</template>

<script setup lang="ts">
import { useYandexMap } from '~/composables/useYandexMap';
import type { Location } from '~/types/location';

const { initMap } = useYandexMap();

let mapInstance: any = null;

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
    mapInstance.setLocation({
        center: location.coordinates,
        zoom: 17,
        duration: 500,
    });

    emits('marker:click', location);
};

defineExpose({ markerClick });

onMounted(async () => {
    mapInstance = await initMap(
        'yandex-map',
        props.center,
        props.zoom,
        props.locations.map((locations) => ({
            ...locations,
            onClick: () => markerClick(locations),
        }))
    );
});
</script>
