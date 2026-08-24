<template>
    <div class="page-pollen">
        <div class="container">
            <AppBreadcrumb :breadcrumbs="breadcrumbs" />

            <div class="page-pollen__content">
                <h1 class="page-pollen__title">{{ t('pages.pollen.title') }}</h1>
                <p class="page-pollen__subtitle">{{ t('pages.pollen.subtitle') }}</p>

                <!--Map-->
                <section class="page-pollen__content-map">
                    <YandexMap
                        :center="mapCenter"
                        :zoom="10"
                        :locations="[]"
                        pin-on-click
                        @map:click="(coordinates: LngLat) => loadPollen(coordinates)"
                    />

                    <div class="page-pollen__content-map-hint">
                        <h3>{{ t('pages.pollen.instruction') }}</h3>

                        <ul>
                            <li>
                                <span>1</span>
                                {{ t('pages.pollen.map-hint-step-1') }}
                            </li>
                            <li>
                                <span>2</span>
                                {{ t('pages.pollen.map-hint-step-2') }}
                            </li>
                        </ul>
                    </div>
                </section>

                <AppSkeletonPollenForecast v-if="loading" />

                <!--Controls-->
                <section
                    v-if="!loading && dates?.length"
                    class="page-pollen__content-info-calendar"
                >
                    <h4>{{ t('pages.pollen.forecast') }}:</h4>

                    <div class="page-pollen__content-info-calendar-controls">
                        <AppButton
                            v-for="date in dates"
                            :key="date.day"
                            :label="formatPollenDate(date, locale)"
                            :severity="
                                date.day === currentDailyInfo?.date.day ? 'contrast' : 'secondary'
                            "
                            size="small"
                            raised
                            @click="selectDayForecast(date)"
                        />
                    </div>
                </section>

                <!--Forecast-->
                <section
                    v-if="!loading && dates?.length"
                    class="page-pollen__content-info-forecast"
                >
                    <AppCard
                        v-for="group in groupedPollenTypes"
                        :key="group.code"
                        :title="`${t('pages.pollen.plant')}: ${group.displayName}`"
                        :subtitle="`${group.inSeason ? t('pages.pollen.in-season') : t('pages.pollen.not-in-season')}`"
                    >
                        <span
                            class="page-pollen__content-info-forecast-recommendation"
                            v-for="recommendation in group.healthRecommendations"
                            :key="recommendation"
                        >
                            - {{ recommendation }}
                        </span>

                        <PollenPlantCard
                            v-for="plant in group.plants"
                            :key="plant.code"
                            :plant="plant"
                        />
                    </AppCard>

                    <AppCard
                        v-if="uncategorizedPlants.length"
                        :subtitle="t('pages.pollen.uncategorized-title')"
                    >
                        <PollenPlantCard
                            v-for="plant in uncategorizedPlants"
                            :key="plant.code"
                            :plant="plant"
                        />
                    </AppCard>

                    <p
                        v-if="
                            currentDailyInfo &&
                            !groupedPollenTypes.length &&
                            !uncategorizedPlants.length
                        "
                    >
                        {{ t('pages.pollen.no-data') }}
                    </p>
                </section>
            </div>

            <AppReviews />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { fetchPollen } from '~/api/pollen';
import { useSeoPollen } from '~/composables/seo-pollen';
import type {
    PollenForecast,
    DailyInfo,
    PollenDate,
    PollenTypeInfo,
    PlantInfo,
} from '@/types/pollen';
import { formatPollenDate } from '~/utils/pollen';
import YandexMap from '~/components/YandexMap.vue';
import AppSkeletonPollenForecast from '~/components/skeletons/AppSkeletonPollenForecast.vue';
import type { LngLat } from '@yandex/ymaps3-types/common/types';
import AppReviews from '~/components/AppReviews.vue';
import AppBreadcrumb from '~/components/AppBreadcrumb.vue';

const { t, locale } = useI18n();

useSeoPollen();

const loading = ref<boolean>(false);
const error = ref<boolean>(false);
const mapCenter = ref<[number, number]>([30.120702, 59.572617]);
const pollenData = ref<PollenForecast | null>(null);
const currentDailyInfo = ref<DailyInfo | null>(null);

const dates = computed(() => {
    if (pollenData.value === null) {
        return;
    }

    const availableInfo = pollenData.value.dailyInfo.filter((el: DailyInfo) =>
        el.pollenTypeInfo.some((info: PollenTypeInfo) => info.indexInfo !== undefined)
    );

    return availableInfo.map((el: DailyInfo) => el.date);
});

const visiblePlants = computed(
    () =>
        currentDailyInfo.value?.plantInfo.filter(
            (plant: PlantInfo) => Boolean(plant.indexInfo) || Boolean(plant.plantDescription)
        ) ?? []
);

const groupedPollenTypes = computed(() => {
    if (!currentDailyInfo.value) {
        return [];
    }

    return currentDailyInfo.value.pollenTypeInfo
        .map((typeInfo: PollenTypeInfo) => ({
            ...typeInfo,
            plants: visiblePlants.value.filter(
                (plant: PlantInfo) => plant.plantDescription?.type === typeInfo.code
            ),
        }))
        .filter(
            (group) =>
                Boolean(group.indexInfo) ||
                Boolean(group.healthRecommendations?.length) ||
                group.plants.length > 0
        );
});

const uncategorizedPlants = computed(() =>
    visiblePlants.value.filter((plant: PlantInfo) => !plant.plantDescription?.type)
);

const selectDayForecast = (date: PollenDate) => {
    currentDailyInfo.value =
        pollenData.value?.dailyInfo.find(
            (el: DailyInfo) =>
                el.date.year === date.year &&
                el.date.month === date.month &&
                el.date.day === date.day
        ) ?? null;
};

const getTodayPollenDate = (): PollenDate => {
    const now = new Date();

    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
};

const loadPollen = (coordinates: LngLat) => {
    loading.value = true;

    fetchPollen(coordinates)
        .then((response) => {
            pollenData.value = response.data.data;

            const today = getTodayPollenDate();

            currentDailyInfo.value =
                pollenData.value?.dailyInfo.find(
                    (el: DailyInfo) =>
                        el.date.year === today.year &&
                        el.date.month === today.month &&
                        el.date.day === today.day
                ) ??
                pollenData.value?.dailyInfo[0] ??
                null;
        })
        .catch(() => (error.value = true))
        .finally(() => (loading.value = false));
};

const breadcrumbs = computed(() => [{ label: t('header.pollen') }]);
</script>
