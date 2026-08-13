<template>
    <section class="reviews-carousel">
        <div class="reviews-carousel__header">
            <span>{{ $t('review.reviews') }}</span>

            <AppButton variant="outlined" raised size="small" rounded @click="modalReview = true">
                <i class="pi pi-pencil" />
                {{ $t('review.add-review') }}
            </AppButton>
        </div>

        <div class="reviews-carousel__content">
            <template v-if="pending">
                <AppSkeletonCardReview v-for="n in 6" :key="n" />
            </template>

            <template v-else>
                <AppReviewCard v-for="review in reviews" :key="review.id" :review="review" />
            </template>
        </div>

        <LazyModalsModalReview
            v-if="modalReview"
            :visible="modalReview"
            @close:visible="modalReview = false"
            @success:review="(response) => successReview(response)"
        />
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { fetchReviews } from '~/api/reviews';
import { useSeoReviews } from '~/composables/seo-reviews';
import type { Review } from '~/types/reviews';
import type { AxiosResponse } from 'axios';

import AppSkeletonCardReview from '~/components/skeletons/AppSkeletonCardReview.vue';
import AppReviewCard from '~/components/AppReviewCard.vue';

const { locale } = useI18n();
const toast = useToast();
const modalReview = ref<boolean>(false);

const { data: reviews, pending } = useAsyncData<Review[]>(
    'all-reviews',
    () =>
        fetchReviews()
            .then((response) => response.data.data)
            .catch(() => {}),
    { watch: [() => locale] }
);

useSeoReviews(reviews);

const successReview = (response: AxiosResponse) => {
    const message = response.data.message;
    toast.add({ severity: 'success', summary: message.label, detail: message.text, life: 6000 });
    modalReview.value = false;
};
</script>
