<template>
    <div class="contacts-map-section" id="contacts">
        <YandexMap
            ref="yandexMapRef"
            :center="mapCenter"
            :zoom="mapZoom"
            :locations="locations"
            @marker:click="markerClick"
        />

        <MapLocationList :locations="locations" @location:click="locationClick" />
    </div>
</template>
<script setup lang="ts">
import YandexMap from '~/components/YandexMap.vue';
import MapLocationList from '~/components/MapLocationList.vue';

import type { Location } from '@/types/location';

const mapZoom = ref<number>(14);
const mapCenter = ref<[number, number]>([30.120702, 59.572617]);
const yandexMapRef = ref<InstanceType<typeof YandexMap> | null>(null);

const markerClick = (location: Location) => {
    console.log('Clicked Location:', location);
};

const locationClick = (location: Location) => {
    yandexMapRef.value?.markerClick(location);
};

const locations: Location[] = [
    {
        address: 'ул. Хохлова, 9, Гатчина, Ленинградская область',
        coordinates: [30.118191, 59.570456],
        id: '1',
        phones: ['+7 (81371) 3-23-15', '+7 (81371) 2-26-50', '+7 (812) 460-04-29'],
        title: 'Гатчинская КМБ, поликлиника, детское поликлиническое отделение',
        website: 'gatchina-clinic.ru',
    },
    {
        address: 'ул. Хохлова, 8, Гатчина, Ленинградская область',
        coordinates: [30.123214, 59.574779],
        id: '2',
        phones: ['+7 (965) 067-79-77'],
        title: 'Медиком',
        website: '',
    },
];
</script>
