<template>
    <div class="skeleton-card-review">
        <div class="skeleton-card-review__avatar skeleton"></div>

        <div class="skeleton-card-review__name">
            <div class="skeleton-card-review__name-text skeleton"></div>
            <div class="skeleton-card-review__name-date skeleton"></div>
        </div>

        <div class="skeleton-card-review__info">
            <div class="skeleton-card-review__info-rating skeleton"></div>

            <div class="skeleton-card-review__info-text">
                <div
                    v-for="n in 3"
                    :key="n"
                    class="skeleton-card-review__info-text-line skeleton"
                ></div>
            </div>
        </div>
    </div>
</template>
