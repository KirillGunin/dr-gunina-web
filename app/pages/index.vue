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
                                v-if="infoService !== null"
                                class="page-home__welcome-hook-action"
                                :label="$t('pages.home.hook-action')"
                                raised
                                severity="success"
                                rounded
                                size="large"
                                @click="openModalConsultation($event)"
                            />
                        </div>
                    </div>

                    <div class="page-home__welcome-image">
                        <img src="/images/main.png" alt="Главная заставка" />
                    </div>
                </div>
            </section>

            <section class="page-home__about" id="about">
                <div
                    class="page-home__about-image"
                    v-animateonscroll="{
                        enterClass: 'swipe-in',
                        leaveClass: 'swipe-out',
                        threshold: 0,
                    }"
                >
                    <img src="/images/main.png" alt="Главная заставка" />
                </div>

                <div
                    class="page-home__about-content"
                    v-animateonscroll="{
                        enterClass: 'swipe-in',
                        leaveClass: 'swipe-out',
                        threshold: 0,
                    }"
                >
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
                </div>
            </section>

            <section class="page-home__services" id="services">
                <AppCardService
                    v-for="service in services"
                    :key="service.img"
                    :service="service"
                    @open:info-modal="openModalService(service)"
                />
            </section>
        </div>

        <LazyModalsModalService
            v-if="selectedService"
            :visible="modalService"
            :service="selectedService"
            @close:visible="modalService = false"
        />
    </div>
</template>
<script setup lang="ts">
const { t } = useI18n();
import type { Service } from '@/types/service';

const modalService = ref<boolean>(false);
const selectedService = ref<Service | null>(null);

const infoService = computed(
    () => services.find((service: Service) => service.key === 'info_service') ?? null
);

const openModalService = (service: Service) => {
    selectedService.value = service;
    modalService.value = true;
};

const openModalConsultation = (event: MouseEvent) => {
    const service = infoService.value;
    if (!service) return;

    (event.target as HTMLElement).blur();

    scrollToSection();
    setTimeout(() => openModalService(service), 0);
};

const scrollToSection = () => {
    const element = document.getElementById('services');
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
};

const facts = [
    { title: 'Меня зовут Гунина Ксения Александровна;', link: '' },
    {
        title: 'Закончила СПБГПМУ в 2015 году и интернатур у по специальности педиатрия там же в 2016 году;',
        link: '',
    },
    {
        title: 'В 2019 окончила курсы первичной переподготовки в СЗГМУ им. И. И. Мечникова по специальности аллерголог-иммунолог;',
        link: '',
    },
    {
        title: 'Член EAACI, WAO и Союза Педиатров России, РААКИ, слушатель аллергологического конгресса WAO 2022 и лекций EAACI;',
        link: '',
    },
    { title: 'Практика по принципу доказательной медицины;', link: '' },
    { title: 'Диагностика и лечение с опорой на зарубежные рекомендации.', link: '' },
    { title: 'Сертификаты', link: '#' },
];

const services: Service[] = [
    {
        img: '/images/services/lure.png',
        title: t('services.lure.title'),
        content: t('services.lure.content'),
        price: '4000',
        actionTitle: t('services.lure.actionTitle'),
        details: [
            t('services.lure.details.detail_1'),
            t('services.lure.details.detail_2'),
            t('services.lure.details.detail_3'),
            t('services.lure.details.detail_4'),
        ],
        attachment: {
            title: t('services.lure.attachment.title'),
            link: '#',
        },
        modalActionButton: t('services.lure.modalActionButton'),
        payLink: '#',
        key: 'lure',
    },
    {
        img: '/images/services/chat-group.png',
        title: t('services.group_chat.title'),
        content: t('services.group_chat.content'),
        price: '5000',
        actionTitle: t('services.group_chat.actionTitle'),
        details: [
            t('services.group_chat.details.detail_1'),
            t('services.group_chat.details.detail_2'),
            t('services.group_chat.details.detail_3'),
            t('services.group_chat.details.detail_4'),
            t('services.group_chat.details.detail_5'),
            t('services.group_chat.details.detail_6'),
        ],
        attachment: null,
        modalActionButton: t('services.group_chat.modalActionButton'),
        payLink: '#',
        key: 'group_chat',
    },
    {
        img: '/images/services/service.png',
        title: t('services.info_service.title'),
        content: t('services.info_service.content'),
        price: '4000',
        actionTitle: t('services.info_service.actionTitle'),
        details: [
            t('services.info_service.details.detail_1'),
            t('services.info_service.details.detail_2'),
            t('services.info_service.details.detail_3'),
        ],
        attachment: null,
        modalActionButton: t('services.info_service.modalActionButton'),
        payLink: '#',
        key: 'info_service',
    },
    {
        img: '/images/services/first-aid-kit.png',
        title: t('services.no_panic.title'),
        content: t('services.no_panic.content'),
        price: '5000',
        actionTitle: t('services.no_panic.actionTitle'),
        details: [
            t('services.no_panic.details.detail_1'),
            t('services.no_panic.details.detail_2'),
            t('services.no_panic.details.detail_3'),
            t('services.no_panic.details.detail_4'),
            t('services.no_panic.details.detail_5'),
            t('services.no_panic.details.detail_6'),
            t('services.no_panic.details.detail_7'),
            t('services.no_panic.details.detail_8'),
            t('services.no_panic.details.detail_9'),
            t('services.no_panic.details.detail_10'),
        ],
        attachment: {
            title: t('services.no_panic.attachment.title'),
            link: '#',
        },
        modalActionButton: t('services.no_panic.modalActionButton'),
        payLink: '#',
        key: 'no_panic',
    },
    {
        img: '/images/services/service.png',
        title: t('services.individual_chat.title'),
        content: t('services.individual_chat.content'),
        price: '10000',
        actionTitle: t('services.individual_chat.actionTitle'),
        details: [
            t('services.individual_chat.details.detail_1'),
            t('services.individual_chat.details.detail_2'),
        ],
        attachment: null,
        modalActionButton: t('services.individual_chat.modalActionButton'),
        payLink: '#',
        key: 'individual_chat',
    },
    {
        img: '/images/services/service.png',
        title: t('services.vaccination.title'),
        content: t('services.vaccination.content'),
        price: '3000',
        actionTitle: t('services.vaccination.actionTitle'),
        details: [
            t('services.vaccination.details.detail_1'),
            t('services.vaccination.details.detail_2'),
            t('services.vaccination.details.detail_3'),
        ],
        attachment: {
            title: t('services.vaccination.attachment.title'),
            link: '/files/Профилактика кори.pdf',
        },
        modalActionButton: t('services.vaccination.modalActionButton'),
        payLink: '#',
        key: 'vaccination',
    },
];
</script>
