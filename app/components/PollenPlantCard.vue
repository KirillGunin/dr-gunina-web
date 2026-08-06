<template>
    <div class="pollen-plant-card">
        <img
            v-if="plant.plantDescription?.picture"
            class="pollen-plant-card__picture"
            :src="plant.plantDescription.picture"
            :alt="plant.displayName"
        />

        <div class="pollen-plant-card__content">
            <h3 class="pollen-plant-card__content-title">{{ plant.displayName }}</h3>

            <PollenScale v-if="plant.indexInfo" :index-info="plant.indexInfo" />

            <div class="pollen-plant-card__content-description" v-if="plant.plantDescription">
                <p>
                    <span>{{ t('pages.pollen.family') }}:</span>
                    {{ plant.plantDescription.family }}
                </p>

                <p v-if="plant.plantDescription.season">
                    <span>{{ t('pages.pollen.season') }}:</span>
                    {{ plant.plantDescription.season }}
                </p>

                <p v-if="plant.plantDescription.crossReaction">
                    <span>{{ t('pages.pollen.cross-reaction') }}:</span>
                    {{ plant.plantDescription.crossReaction }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PlantInfo } from '~/types/pollen';

defineProps<{
    plant: PlantInfo;
}>();

const { t } = useI18n();
</script>
