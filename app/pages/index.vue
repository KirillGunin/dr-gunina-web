<template>
    <div class="page-home">
        <div class="container">
            <section class="page-home__welcome">
                <div class="page-home__welcome-content">
                    <div class="page-home__welcome-hook">
                        <div class="page-home__welcome-hook-content">
                            <span class="page-home__welcome-hook-title">
                                {{ $t('pages.home.hook-text') }}
                            </span>

                            <AppButton
                                class="page-home__welcome-hook-action"
                                :label="$t('pages.home.hook-action')"
                                raised
                                severity="success"
                                rounded
                                size="large"
                                @click="modalAppointment = true"
                            />
                        </div>
                    </div>

                    <div class="page-home__welcome-image">
                        <NuxtImg
                            src="/images/main.png"
                            :alt="$t('pages.facts.me')"
                            width="1000"
                            height="1000"
                            format="webp"
                            loading="eager"
                            fetchpriority="high"
                            sizes="767:100vw 768:650px"
                        />
                    </div>
                </div>
            </section>

            <section class="page-home__about" id="section-about">
                <div class="page-home__about-image">
                    <NuxtImg
                        src="/images/about.png"
                        :alt="$t('pages.home.about')"
                        width="600"
                        height="600"
                        format="webp"
                        loading="lazy"
                    />
                </div>

                <div class="page-home__about-content">
                    <h4 class="page-home__about-title">{{ $t('pages.home.about') }}</h4>

                    <ul class="page-home__about-facts">
                        <li class="page-home__about-fact" v-for="fact in facts" :key="fact.title">
                            <a v-if="fact.link" :href="fact.link" target="_blank">
                                <SvgIcon name="circle" />
                                {{ fact.title }}
                            </a>

                            <span v-else>
                                <SvgIcon name="circle" />
                                {{ fact.title }}
                            </span>
                        </li>
                    </ul>

                    <div class="page-home__about-accordion">
                        <AppAccordion :label="$t('pages.home.about')" :items="facts" />
                    </div>
                </div>
            </section>

            <section class="page-home__services" id="section-services">
                <template v-if="pending">
                    <AppSkeletonCardService v-for="n in 6" :key="n" />
                </template>

                <template v-else>
                    <AppCardService
                        v-for="service in services"
                        :key="service.service"
                        :service="service"
                        @purchase:service="purchaseService(service)"
                    />
                </template>
            </section>

            <AppReviews class="page-home__reviews" />
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
const { t } = useI18n();
import { useSeoHome } from '~/composables/seo-index-ru';
import { fetchServices } from '~/api/services';
import { useCookieAgreement } from '~/composables/useCookieAgreement';
import type { Service } from '@/types/service';
import type { AxiosResponse } from 'axios';

import AppReviews from '@/components/AppReviews.vue';
import AppSkeletonCardService from '@/components/skeletons/AppSkeletonCardService.vue';

useSeoHome();
const { locale } = useI18n();
const toast = useToast();
const $img = useImage();
const heroImageSizes = $img.getSizes('/images/main.png', {
    modifiers: { format: 'webp', width: 1000, height: 1000, quality: $img.options.quality },
    sizes: '767:100vw 768:650px',
});

useHead({
    link: [
        {
            rel: 'preload',
            as: 'image',
            href: heroImageSizes.src,
            imagesizes: heroImageSizes.sizes,
            imagesrcset: heroImageSizes.srcset,
            fetchpriority: 'high',
        },
    ],
});

const modalAppointment = ref<boolean>(false);

const { data: services, pending } = useAsyncData<Service[]>(
    'all-services',
    () =>
        fetchServices()
            .then((response) => response.data.data)
            .catch(() => {}),
    { watch: [() => locale] }
);

const purchaseService = (service: Service) => {
    if (service.service === 'info-service') {
        modalAppointment.value = true;
    } else {
        if (service.actionUrl) {
            window.open(service.actionUrl, '_blank', 'noopener, noreferrer');
        }
    }
};

const successAppointment = (response: AxiosResponse) => {
    const message = response.data.message;
    toast.add({ severity: 'success', summary: message.label, detail: message.text, life: 6000 });
    useCookieAgreement().setAgreement('accept');
    modalAppointment.value = false;
};

const facts = [
    { title: t('pages.facts.me'), link: '' },
    { title: t('pages.facts.education'), link: '' },
    { title: t('pages.facts.additional'), link: '' },
    { title: t('pages.facts.member'), link: '' },
    { title: t('pages.facts.practice'), link: '' },
    { title: t('pages.facts.diagnosis'), link: '' },
    // { title: t('pages.facts.certificate'), link: '' },
];
</script>
