<template>
    <div class="map-location-items">
        <article
            v-for="location in locations"
            :key="location.id"
            class="map-location-items__location"
        >
            <h3 class="map-location-items__location-title">
                {{ location.title }}
            </h3>

            <address class="map-location-items__location-address">
                <i class="pi pi-map-marker" aria-hidden="true"></i>
                <span>{{ location.address }}</span>
            </address>

            <div class="map-location-items__location-contacts">
                <div class="map-location-items__location-phones-content">
                    <i class="pi pi-phone" aria-hidden="true"></i>

                    <div class="map-location-items__location-phones">
                        <a
                            class="map-location-items__location-phone"
                            v-for="phone in location.phones"
                            :href="`tel:${phone.replace(/\s/g, '')}`"
                        >
                            {{ phone }}
                        </a>
                    </div>
                </div>

                <div v-if="location.website" class="map-location-items__location-website-content">
                    <i class="pi pi-globe" aria-hidden="true"></i>

                    <a
                        :href="location.website"
                        class="map-location-items__location-website"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ location.website }}
                    </a>
                </div>
            </div>

            <AppButton
                variant="outlined"
                severity="success"
                rounded
                size="small"
                @click="emits('location:click', location)"
            >
                Показать на карте
            </AppButton>
        </article>
    </div>
</template>
<script setup lang="ts">
import type { Location } from '~/types/location';

defineProps<{
    locations: Location[];
}>();

const emits = defineEmits<{
    (event: 'location:click', location: Location): void;
}>();
</script>
