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
import { computed } from 'vue';
import { useI18n } from '#imports';

import YandexMap from '~/components/YandexMap.vue';
import MapLocationList from '~/components/MapLocationList.vue';

import type { Location } from '@/types/location';

const { t } = useI18n();

const mapZoom = ref<number>(14);
const mapCenter = ref<[number, number]>([30.120702, 59.572617]);
const yandexMapRef = ref<InstanceType<typeof YandexMap> | null>(null);

const markerClick = (location: Location) => {
    //console.log('Clicked Location:', location);
};

const locationClick = (location: Location) => {
    yandexMapRef.value?.markerClick(location);
};

const locations = computed<Location[]>(() => [
    {
        address: t('addresses.kmb.address'),
        coordinates: [30.118191, 59.570456],
        id: '1',
        phones: ['+7 (81371) 3-23-15', '+7 (81371) 2-26-50', '+7 (812) 460-04-29'],
        title: t('addresses.kmb.title'),
        website: 'https://gatchina-clinic.ru',
    },
    {
        address: t('addresses.medicom.address'),
        coordinates: [30.123214, 59.574779],
        id: '2',
        phones: ['+7 (965) 067-79-77'],
        title: t('addresses.medicom.title'),
        website: 'https://medicom-plus.ru',
    },
]);
</script>
