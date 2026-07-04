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
                                @click="infoService && openModalService(infoService)"
                            />
                        </div>
                    </div>

                    <div class="page-home__welcome-image">
                        <img src="/images/main.png" alt="Главная заставка" />
                    </div>
                </div>
            </section>

            <section class="page-home__about" id="section-about">
                <div class="page-home__about-image">
                    <img src="/images/main.png" alt="Главная заставка" />
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
            @select:action="selectAction"
        />

        <LazyModalsModalAppointment
            :visible="modalAppointment"
            @close:visible="modalAppointment = false"
            @success:appointment="(response) => successAppointment(response)"
        />
    </div>
</template>
<script setup lang="ts">
const { t } = useI18n();
import { useSeoHome } from '~/composables/seo-index-ru';
import type { AxiosResponse } from 'axios';
import type { Service } from '@/types/service';

useSeoHome();
const toast = useToast();

const modalService = ref<boolean>(false);
const modalAppointment = ref<boolean>(false);
const selectedService = ref<Service | null>(null);

const infoService = computed(
    () => services.find((service: Service) => service.key === 'info_service') ?? null
);

const selectAction = (service: Service) => {
    modalService.value = false;
    service.command();
};

const openModalService = (service: Service) => {
    selectedService.value = service;
    modalService.value = true;
};

const successAppointment = (response: AxiosResponse) => {
    const message = response.data.message;
    toast.add({ severity: 'success', summary: message.label, detail: message.text, life: 6000 });
    modalAppointment.value = false;
};

const facts = [
    { title: t('pages.facts.me'), link: '' },
    { title: t('pages.facts.education'), link: '' },
    { title: t('pages.facts.additional'), link: '' },
    { title: t('pages.facts.member'), link: '' },
    { title: t('pages.facts.practice'), link: '' },
    { title: t('pages.facts.diagnosis'), link: '' },
    { title: t('pages.facts.certificate'), link: '#' },
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
        command: () => {
            window.open(
                'https://self.payanyway.ru/16756515092850',
                '_blank',
                'noopener, noreferrer'
            );
        },
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
        command: () => {
            window.open(
                'https://api.whatsapp.com/message/YNKZRPC7U7HAH1?autoload=1&app_absent=0',
                '_blank',
                'noopener, noreferrer'
            );
        },
    },
    {
        img: '/images/services/individual_chat.png',
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
        command: () => {
            window.open(
                'https://api.whatsapp.com/message/YNKZRPC7U7HAH1?autoload=1&app_absent=0',
                '_blank',
                'noopener, noreferrer'
            );
        },
    },
    {
        img: '/images/services/consultation.png',
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
        command: () => (modalAppointment.value = true),
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
        command: () => {
            window.open(
                'https://self.payanyway.ru/1672467575731',
                '_blank',
                'noopener, noreferrer'
            );
        },
    },
    {
        img: '/images/services/vaccination.png',
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
        command: () => {
            window.open(
                'https://api.whatsapp.com/message/YNKZRPC7U7HAH1?autoload=1&app_absent=0',
                '_blank',
                'noopener, noreferrer'
            );
        },
    },
    {
        img: '/images/services/mentoring.png',
        title: t('services.mentoring.title'),
        content: t('services.mentoring.content'),
        price: '4000',
        actionTitle: t('services.mentoring.actionTitle'),
        details: [
            t('services.mentoring.details.detail_1'),
            t('services.mentoring.details.detail_2'),
            t('services.mentoring.details.detail_3'),
        ],
        attachment: null,
        modalActionButton: t('services.mentoring.modalActionButton'),
        payLink: '#',
        key: 'mentoring',
        command: () => {
            window.open(
                'https://api.whatsapp.com/message/YNKZRPC7U7HAH1?autoload=1&app_absent=0',
                '_blank',
                'noopener, noreferrer'
            );
        },
    },
];
</script>
