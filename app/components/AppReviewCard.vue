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
            <div class="review-card__info-text-wrap">
                <span
                    ref="textRef"
                    class="review-card__info-text"
                    :class="{ 'review-card__info-text--expanded': isExpanded }"
                >
                    {{ review.text }}
                </span>

                <button
                    v-if="hasOverflow && !isExpanded"
                    type="button"
                    class="review-card__info-more"
                    @click="isExpanded = true"
                >
                    {{ $t('others.more') }}
                </button>
            </div>

            <button
                v-if="hasOverflow && isExpanded"
                type="button"
                class="review-card__info-collapse"
                @click="isExpanded = false"
            >
                {{ $t('others.collapse') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { formatDate } from '~/utils/formatTime';
import type { Review } from '~/types/reviews';

defineProps<{
    review: Review;
}>();

const textRef = ref<HTMLElement | null>(null);
const hasOverflow = ref(false);
const isExpanded = ref(false);

onMounted(async () => {
    await nextTick();

    if (textRef.value) {
        hasOverflow.value = textRef.value.scrollHeight > textRef.value.clientHeight;
    }
});
</script>
