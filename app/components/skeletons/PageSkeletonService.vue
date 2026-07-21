<template>
    <div class="page-skeleton-service">
        <div class="page-skeleton-service__content">
            <div class="page-skeleton-service__image skeleton"></div>

            <div class="page-skeleton-service__info">
                <div class="page-skeleton-service__title skeleton"></div>

                <div class="page-skeleton-service__text">
                    <div
                        v-for="n in 2"
                        :key="n"
                        class="page-skeleton-service__text-line skeleton"
                    ></div>
                </div>

                <ul class="page-skeleton-service__details">
                    <li v-for="n in 3" :key="n" class="page-skeleton-service__detail skeleton"></li>
                </ul>

                <div class="page-skeleton-service__tags">
                    <div v-for="n in 3" :key="n" class="page-skeleton-service__tag skeleton"></div>
                </div>

                <div class="page-skeleton-service__price skeleton"></div>

                <div class="page-skeleton-service__controls">
                    <div class="page-skeleton-service__button skeleton"></div>
                </div>
            </div>
        </div>
    </div>
</template>
