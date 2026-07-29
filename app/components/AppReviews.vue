<template>
    <section class="reviews-carousel">
        <div class="reviews-carousel__header">
            <span>Отзывы</span>

            <AppButton variant="outlined" raised size="small" rounded @click="modalReview = true">
                <SvgIcon name="home" style="stroke-width: 2.5" />
                Добавить отзыв
            </AppButton>
        </div>

        <div class="reviews-carousel__content">
            <template v-if="reviewsLoading">
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
import type { Review } from '~/types/reviews';
import type { AxiosResponse } from 'axios';

import AppSkeletonCardReview from '~/components/skeletons/AppSkeletonCardReview.vue';
import AppReviewCard from '~/components/AppReviewCard.vue';

const toast = useToast();

const reviews = ref<Review[]>([]);
const reviewsLoading = ref<boolean>(true);
const modalReview = ref<boolean>(false);

fetchReviews()
    .then((response) => (reviews.value = response.data.data))
    .catch((error) => {})
    .finally(() => (reviewsLoading.value = false));

const successReview = (response: AxiosResponse) => {
    const message = response.data.message;
    toast.add({ severity: 'success', summary: message.label, detail: message.text, life: 6000 });
    modalReview.value = false;
};
</script>
