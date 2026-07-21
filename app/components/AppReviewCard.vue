<template>
    <div class="review-card">
        <div class="review-card__avatar">
            <p>{{ review.name[0] }}</p>
        </div>

        <div class="review-card__name">
            <span>{{ review.name }} {{ review.last_name[0] }}.</span>
            <span>{{ formatDate(review.created_at) }}</span>
        </div>

        <div class="review-card__info">
            <AppRating
                class="review-card__info-rating"
                :model-value="review.rating"
                :readonly="true"
                :pt="{
                    root: {
                        style: {
                            gap: '4px',
                        },
                    },
                    onIcon: {
                        style: {
                            color: 'var(--p-gold-300)',
                            width: '20px',
                            height: '20px',
                        },
                    },
                    offIcon: {
                        style: {
                            color: 'var(--p-gold-300)',
                            width: '20px',
                            height: '20px',
                        },
                    },
                }"
            />
            <span class="review-card__info-text">{{ review.text }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { formatDate } from '~/utils/formatTime';
import type { Review } from '~/types/reviews';

defineProps<{
    review: Review;
}>();
</script>
