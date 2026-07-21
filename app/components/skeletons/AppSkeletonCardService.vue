<template>
    <div class="skeleton-card-service">
        <div class="skeleton-card-service__header skeleton"></div>

        <div class="skeleton-card-service__content">
            <div>
                <div class="skeleton-card-service__title skeleton"></div>
                <div class="skeleton-card-service__description skeleton"></div>
            </div>

            <div>
                <div class="skeleton-card-service__tags">
                    <div v-for="n in 3" :key="n" class="skeleton-card-service__tag skeleton"></div>
                </div>

                <div class="skeleton-card-service__price skeleton"></div>
            </div>

            <div class="skeleton-card-service__footer">
                <div class="skeleton-card-service__button skeleton"></div>
                <div class="skeleton-card-service__button skeleton"></div>
            </div>
        </div>
    </div>
</template>
