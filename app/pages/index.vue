<template>
    <div class="page-home">
        <div class="container">
            <section class="page-home__welcome">
                <div class="page-home__welcome-content">
                    <div class="page-home__welcome-empty-block">
                        <p class="page-home__welcome-title">
                            {{ $t('pages.home.hook-text') }}
                        </p>
                    </div>

                    <div class="page-home__welcome-image">
                        <img src="/images/main.png" alt="Главная заставка" />
                        <div></div>
                    </div>
                </div>
            </section>

            <section class="page-home__about" id="about">
                <div
                    class="page-home__about-image"
                    v-animateonscroll="{
                        enterClass: 'swipe-in',
                        leaveClass: 'swipe-out',
                        threshold: 0.2,
                    }"
                >
                    <img src="/images/main.png" alt="Главная заставка" />
                </div>

                <div
                    class="page-home__about-content"
                    v-animateonscroll="{
                        enterClass: 'swipe-in',
                        leaveClass: 'swipe-out',
                        threshold: 0.2,
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

            <section class="page-home__map" id="contacts">
                <YandexMap
                    ref="yandexMapRef"
                    :center="mapCenter"
                    :zoom="mapZoom"
                    :locations="locations"
                    @marker:click="markerClick"
                />

                <MapLocationList :locations="locations" @location:click="locationClick" />
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
import type { Service } from '@/types/service';
import type { Location } from '@/types/location';

import YandexMap from '~/components/YandexMap.vue';
import MapLocationList from '~/components/MapLocationList.vue';

const modalService = ref<boolean>(false);
const selectedService = ref<Service | null>(null);
const mapZoom = ref<number>(14);
const mapCenter = ref<[number, number]>([30.120702, 59.572617]);
const yandexMapRef = ref<InstanceType<typeof YandexMap> | null>(null);

const openModalService = (service: Service) => {
    selectedService.value = service;
    modalService.value = true;
};

const markerClick = (location: Location) => {
    console.log('Clicked Location:', location);
};

const locationClick = (location: Location) => {
    yandexMapRef.value?.markerClick(location);
};

const locations: Location[] = [
    {
        address: 'ул. Хохлова, 9, Гатчина, Ленинградская область',
        coordinates: [30.118191, 59.570456],
        id: '1',
        phones: ['+7 (81371) 3-23-15', '+7 (81371) 2-26-50', '+7 (812) 460-04-29'],
        title: 'Гатчинская КМБ, поликлиника, детское поликлиническое отделение',
        website: 'gatchina-clinic.ru',
    },
    {
        address: 'ул. Хохлова, 8, Гатчина, Ленинградская область',
        coordinates: [30.123214, 59.574779],
        id: '2',
        phones: ['+7 (965) 067-79-77'],
        title: 'Медиком',
        website: '',
    },
];

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
        img: '/images/services/service.png',
        title: 'Курс "Про прикорм"',
        content: 'Базовые правила введения прикорма основанные на современных рекомендациях',
        price: '4 000 ₽',
        actionTitle: 'Хочу курс "Про прикорм"',
        details: [
            'Закрытая група в Телеграм канале с удобными короткими роликами;',
            'Самая свежая информация о прикорме;',
            'Готовая схема введения;',
            'Первая помощь при аллергических реакциях.',
        ],
        attachment: {
            title: 'Коротко о прикорме.pdf',
            link: '#',
        },
        modalActionButton: 'Купить курс "Пор прикорм"',
        payLink: '#',
    },
    {
        img: '/images/services/service.png',
        title: 'Групповой чат поддерджки',
        content: 'Задавайте неограниченное количество вопросов в общем чате.',
        price: '5 000 ₽',
        actionTitle: 'Хочу в чат поддержки',
        details: [
            'Закрытая группа в Телеграм канале по принципу вопрос-ответ;',
            'Возможность получить ответы на вопросы других участников чата;',
            'Два раза в месяц консультация психолога;',
            'Два раза в месяц консультация специалиста по сну;',
            'Домашние тренировки от фитнес-тренера в записи',
            'Терапевтические сказки в записи.',
        ],
        attachment: null,
        modalActionButton: 'В чат поддержки',
        payLink: '#',
    },
    {
        img: '/images/services/service.png',
        title: 'Курс "Про прикорм"',
        content: 'Базовые правила введения прикорма основанные на современных рекомендациях',
        price: '4 000 ₽',
        actionTitle: 'Хочу курс "Про прикорм"',
        details: [
            'Закрытая група в Телеграм канале с удобными короткими роликами;',
            'Самая свежая информация о прикорме;',
            'Готовая схема введения;',
            'Первая помощь при аллергических реакциях.',
        ],
        attachment: null,
        modalActionButton: 'Купить курс "Пор прикорм"',
        payLink: '#',
    },
    {
        img: '/images/services/service.png',
        title: 'Курс "Про прикорм"',
        content: 'Базовые правила введения прикорма основанные на современных рекомендациях',
        price: '4 000 ₽',
        actionTitle: 'Хочу курс "Про прикорм"',
        details: [
            'Закрытая група в Телеграм канале с удобными короткими роликами;',
            'Самая свежая информация о прикорме;',
            'Готовая схема введения;',
            'Первая помощь при аллергических реакциях.',
        ],
        attachment: null,
        modalActionButton: 'Купить курс "Пор прикорм"',
        payLink: '#',
    },
    {
        img: '/images/services/service.png',
        title: 'Курс "Про прикорм"',
        content: 'Базовые правила введения прикорма основанные на современных рекомендациях',
        price: '4 000',
        actionTitle: 'Хочу курс "Про прикорм"',
        details: [
            'Закрытая група в Телеграм канале с удобными короткими роликами;',
            'Самая свежая информация о прикорме;',
            'Готовая схема введения;',
            'Первая помощь при аллергических реакциях.',
        ],
        attachment: null,
        modalActionButton: 'Купить курс "Пор прикорм"',
        payLink: '#',
    },
    {
        img: '/images/services/service.png',
        title: 'Курс "Про прикорм"',
        content: 'Базовые правила введения прикорма основанные на современных рекомендациях',
        price: '4 000 ₽',
        actionTitle: 'Хочу курс "Про прикорм"',
        details: [
            'Закрытая група в Телеграм канале с удобными короткими роликами;',
            'Самая свежая информация о прикорме;',
            'Готовая схема введения;',
            'Первая помощь при аллергических реакциях.',
        ],
        attachment: null,
        modalActionButton: 'Купить курс "Пор прикорм"',
        payLink: '#',
    },
];
</script>
