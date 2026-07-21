<template>
    <div class="page-service">
        <div class="container">
            <PageSkeletonService v-if="loading" />

            <div v-if="service && !loading" class="page-service__content">
                <NuxtImg
                    :src="service.img"
                    :alt="service.title"
                    format="webp"
                    loading="lazy"
                    width="360"
                    height="471"
                    sizes="767:100vw 768:360px"
                />

                <div class="page-service__info">
                    <h1>{{ service.title }}</h1>

                    <p>{{ service.content }}</p>

                    <ul class="page-service__info-details">
                        <li
                            class="page-service__info-detail"
                            v-for="detail in service.details"
                            :key="detail"
                        >
                            <span>- {{ detail }}</span>
                        </li>
                    </ul>

                    <div class="page-service__info-tags">
                        <AppTag
                            v-for="tag in service.tags"
                            :key="tag.name"
                            :name="tag.name"
                            :color="tag.color"
                            size="xs"
                            raised
                        />
                    </div>

                    <div class="page-service__info-price">
                        <span>{{ formatPrice(service.price) }}</span>
                    </div>

                    <div class="page-service__controls">
                        <AppButton
                            severity="contrast"
                            rounded
                            raised
                            :label="service.actionTitle"
                            @click="selectAction"
                        />
                    </div>
                </div>
            </div>

            <AppReviews class="page-service__reviews" />
        </div>

        <Transition :duration="300">
            <LazyModalsModalAppointment
                v-if="modalAppointment"
                :visible="modalAppointment"
                @close:visible="modalAppointment = false"
                @success:appointment="(response) => successAppointment(response)"
            />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatPrice } from '@/utils/formatPrice';
import { fetchService } from '~/api/services';
import type { Service } from '@/types/service';
import type { AxiosResponse } from 'axios';
import { useCookieAgreement } from '~/composables/useCookieAgreement';

import PageSkeletonService from '@/components/skeletons/PageSkeletonService.vue';
import AppReviews from '~/components/AppReviews.vue';

const route = useRoute();
const toast = useToast();

const service = ref<Service | null>(null);
const loading = ref<boolean>(true);
const modalAppointment = ref<boolean>(false);

fetchService(route.params.service as string)
    .then((response) => (service.value = response.data.data))
    .catch((error) => {})
    .finally(() => (loading.value = false));

const selectAction = () => {
    if (service.value?.service === 'info-service') {
        modalAppointment.value = true;
    } else {
        if (service.value?.actionUrl) {
            window.open(service.value?.actionUrl, '_blank', 'noopener, noreferrer');
        }
    }
};

const successAppointment = (response: AxiosResponse) => {
    const message = response.data.message;
    toast.add({ severity: 'success', summary: message.label, detail: message.text, life: 6000 });
    useCookieAgreement().setAgreement('accept');
    modalAppointment.value = false;
};
</script>
