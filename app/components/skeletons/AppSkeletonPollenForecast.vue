<template>
    <div class="skeleton-pollen-forecast">
        <div v-for="card in 3" :key="card" class="skeleton-pollen-forecast__card">
            <div class="skeleton-pollen-forecast__title skeleton"></div>
            <div class="skeleton-pollen-forecast__subtitle skeleton"></div>

            <div class="skeleton-pollen-forecast__plant">
                <div class="skeleton-pollen-forecast__plant-picture skeleton"></div>

                <div class="skeleton-pollen-forecast__plant-content">
                    <div class="skeleton-pollen-forecast__plant-name skeleton"></div>
                    <div class="skeleton-pollen-forecast__plant-scale skeleton"></div>
                    <div class="skeleton-pollen-forecast__plant-line skeleton"></div>
                    <div class="skeleton-pollen-forecast__plant-line skeleton"></div>
                </div>
            </div>
        </div>
    </div>
</template>
