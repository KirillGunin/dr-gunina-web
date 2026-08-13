// SEO: Главная страница /ru/
import { useHead, useSeoMeta } from '#imports';

export function useSeoHome() {
    useSeoMeta({
        title: 'Онлайн-консультация педиатра, аллерголог-иммунолога, дерматолога Гунина Ксения Александровна',
        description:
            'Онлайн-консультация детского врача — педиатра, аллерголога и дерматолога. ' +
            'Очный приём в Гатчине. Курсы для родителей, догоняющий график вакцинации. ',

        ogTitle:
            'Онлайн-консультация педиатра, аллерголог-иммунолога, дерматолога Гунина Ксения Александровна',
        ogDescription:
            'Педиатр, аллерголог и дерматолог. Онлайн-консультации, курсы для родителей, ' +
            'догоняющий график вакцинации. Очный приём в Гатчине.',
        ogType: 'website',
        ogLocale: 'ru_RU',
        ogLocaleAlternate: ['en_US', 'es_ES'],
        ogImage: 'https://dr-gunina.ru/images/main.png',
        twitterCard: 'summary_large_image',
        twitterTitle:
            'Онлайн-консультация педиатра, аллерголог-иммунолога, дерматолога Гунина Ксения Александровна',
        twitterDescription:
            'Онлайн-консультация детского врача. Курсы, вакцинация, очный приём в Гатчине.',
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    useHead({
        htmlAttrs: { lang: 'ru' },

        meta: [
            { name: 'yandex-verification', content: '49c29ec5e711fd97' },
            {
                name: 'google-site-verification',
                content: '9iyt5xjCkATyl5HyV95l9kBnoAZMAfeSs7wF81-QcR8',
            },
        ],

        link: [
            { rel: 'canonical', href: 'https://dr-gunina.ru' },
            { rel: 'alternate', hreflang: 'ru', href: 'https://dr-gunina.ru/' },
            { rel: 'alternate', hreflang: 'en', href: 'https://dr-gunina.ru/en/' },
            { rel: 'alternate', hreflang: 'es', href: 'https://dr-gunina.ru/es/' },
            { rel: 'alternate', hreflang: 'x-default', href: 'https://dr-gunina.ru' },
        ],

        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'Physician',
                            '@id': 'https://dr-gunina.ru/#physician',
                            name: 'Гунина Ксения Александровна',
                            url: 'https://dr-gunina.ru',

                            // Аллергология — через текстовый MedicalSpecialty (Google читает)
                            medicalSpecialty: [
                                'https://schema.org/Pediatric',
                                'https://schema.org/Dermatology',
                                {
                                    '@type': 'MedicalSpecialty',
                                    name: 'Аллергология',
                                },
                            ],
                            description:
                                'Педиатр, детский аллерголог и дерматолог. ' +
                                'Онлайн-консультации для родителей по всему миру на русском, ' +
                                'испанском и английском языках. Очный приём в Гатчине.',
                            knowsLanguage: ['ru', 'en', 'es'],
                            image: 'https://dr-gunina.ru/images/main.png',
                            sameAs: [
                                'https://medicom-plus.ru/people/GatchinaKHokhlova8/1532/',
                                'https://prodoctorov.ru/gatchina/vrach/426918-gunina/',
                                'https://napopravku.ru/spb/doctor-profile/gunina-ksenia-aleksandrovna/',
                                'https://vk.ru/drgunina',
                                'https://zoon.ru/spb/p-doctor/kseniya_aleksandrovna_gunina/',
                            ],
                            telephone: [
                                '+7 (81371) 3-23-15',
                                '+7 (81371) 2-26-50',
                                '+7 (812) 460-04-29',
                                '+7 (965) 067-79-77',
                            ],
                            priceRange: '₽₽',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Гатчина',
                                addressRegion: 'Ленинградская область',
                                addressCountry: 'RU',
                                postalCode: '188300',
                                streetAddress: ['ул. Хохлова, 9', 'ул. Хохлова, 8'],
                            },
                            areaServed: [
                                { '@type': 'Country', name: 'Russia' },
                                { '@type': 'Country', name: 'Spain' },
                                { '@type': 'Country', name: 'Argentina' },
                            ],
                            worksFor: [{ '@id': 'practice1' }, { '@id': 'practice-2' }],
                            hasOfferCatalog: {
                                '@type': 'OfferCatalog',
                                name: 'Услуги',
                                itemListElement: [
                                    {
                                        '@type': 'Offer',
                                        priceSpecification: {
                                            '@type': 'PriceSpecification',
                                            price: '4000',
                                            priceCurrency: 'RUB',
                                        },
                                        itemOffered: {
                                            '@type': 'MedicalTherapy',
                                            name: 'Информационная услуга (онлайн-консультация)',
                                            description:
                                                'Получите срочные ответы на интересующие вопросы не теряя времени' +
                                                'Обсуждение диагноза' +
                                                'Поддержание связи до улучшения.' +
                                                'Узнать второе мнение врача.',
                                            url: 'https://dr-gunina.ru/services/info-service',
                                            image: 'https://api.dr-gunina.ru/storage/services/consultation.png',
                                        },
                                    },
                                    {
                                        '@type': 'Offer',
                                        priceSpecification: {
                                            '@type': 'PriceSpecification',
                                            price: '4000',
                                            priceCurrency: 'RUB',
                                        },
                                        itemOffered: {
                                            '@type': 'Course',
                                            name: 'Курс "Про прикорм"',
                                            description:
                                                'Базовые правила введения прикорма основанные на современных рекомендациях' +
                                                'Готовая схема введения, первая помощь при аллергических реакциях.',
                                            url: 'https://dr-gunina.ru/services/lure',
                                            image: 'https://api.dr-gunina.ru/storage/services/lure.png',
                                            provider: {
                                                '@type': 'Person',
                                                name: 'Гунина Ксения Александровна',
                                                '@id': 'https://dr-gunina.ru/#physician',
                                            },
                                            inLanguage: 'ru',
                                            courseMode: 'online',
                                        },
                                    },
                                    {
                                        '@type': 'Offer',
                                        priceSpecification: {
                                            '@type': 'PriceSpecification',
                                            price: '5000',
                                            priceCurrency: 'RUB',
                                        },
                                        itemOffered: {
                                            '@type': 'Service',
                                            name: 'Групповой чат поддержки для родителей с педиатром, детским психологом и консультантом по сну',
                                            description:
                                                'Задавайте неограниченное количество вопросов в общем чате' +
                                                'консультации психолога и специалиста по сну, ',
                                            url: 'https://dr-gunina.ru/services/chat-group',
                                            image: 'https://api.dr-gunina.ru/storage/services/chat-group.png',
                                        },
                                    },
                                    // {
                                    //     '@type': 'Offer',
                                    //     priceSpecification: {
                                    //         '@type': 'PriceSpecification',
                                    //         price: '',
                                    //         priceCurrency: 'RUB',
                                    //     },
                                    //     itemOffered: {
                                    //         '@type': 'Course',
                                    //         name: 'Курс "Без паники"',
                                    //         description:
                                    //             'Все, что необходимо знать родителям о первой помощи и безопасности ребенка.',
                                    //         provider: {
                                    //             '@type': 'Person',
                                    //             name: 'Гунина Ксения Александровна',
                                    //             '@id': 'https://dr-gunina.ru/#physician',
                                    //         },
                                    //         inLanguage: 'ru',
                                    //         courseMode: 'online',
                                    //         url: 'https://dr-gunina.ru/services/no-panic',
                                    //         image: 'https://api.dr-gunina.ru/storage/services/no-panic.png',
                                    //
                                    //     },
                                    // },
                                    {
                                        '@type': 'Offer',
                                        priceSpecification: {
                                            '@type': 'PriceSpecification',
                                            price: '10000',
                                            priceCurrency: 'RUB',
                                        },
                                        itemOffered: {
                                            '@type': 'Service',
                                            name: 'Индивидуальный чат с врачом',
                                            description:
                                                'Если для Вас важно, чтоб вопрос обсуждался в рамках врача и пациента.' +
                                                'Приватное общение с врачом в индивидуальном чате. ' +
                                                'Быстрые ответы на вопросы в формате врач–пациент.',
                                            url: 'https://dr-gunina.ru/services/individual-chat',
                                            image: 'https://api.dr-gunina.ru/storage/services/individual-chat.png',
                                        },
                                    },
                                    {
                                        '@type': 'Offer',
                                        priceSpecification: {
                                            '@type': 'PriceSpecification',
                                            price: '4000',
                                            priceCurrency: 'RUB',
                                        },
                                        itemOffered: {
                                            '@type': 'Service',
                                            name: 'Индивидуальный догоняющий график вакцинации',
                                            description:
                                                'Составление персонального догоняющего графика прививок.' +
                                                'Консультация по вакцинации.',
                                            url: 'https://dr-gunina.ru/services/vaccination',
                                            image: 'https://api.dr-gunina.ru/storage/services/vaccination.png',
                                        },
                                    },
                                    {
                                        '@type': 'Offer',
                                        priceSpecification: {
                                            '@type': 'PriceSpecification',
                                            price: '4000',
                                            priceCurrency: 'RUB',
                                        },
                                        itemOffered: {
                                            '@type': 'Service',
                                            name: 'Менторство для врачей',
                                            description:
                                                'Личное менторство для врачей. Ответы лично от меня на любые вопросы 6 дней в неделю. ' +
                                                '1 созвон в неделю с разбором случаев в моих и ваших приемов. ' +
                                                'Практические советы по поиску информации.',
                                        },
                                    },
                                ],
                            },
                        },
                        // Очный приём
                        {
                            '@type': 'MedicalBusiness',
                            '@id': 'practice1',
                            name: 'Приём врача Гуниной К.А. Гатчинская КМБ',
                            employee: { '@id': 'https://dr-gunina.ru/#physician' },
                            image: 'https://dr-gunina.ru/images/main.png',
                            priceRange: '₽₽',
                            telephone: [
                                '+7 (81371) 3-23-15',
                                '+7 (81371) 2-26-50',
                                '+7 (812) 460-04-29',
                            ],

                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'ул. Хохлова, 9',
                                addressLocality: 'Гатчина',
                                addressRegion: 'Ленинградская область',
                                postalCode: '188300',
                                addressCountry: 'RU',
                            },

                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: 59.570456,
                                longitude: 30.118191,
                            },

                            openingHoursSpecification: [
                                {
                                    '@type': 'OpeningHoursSpecification',
                                    dayOfWeek: ['Wednesday', 'Friday'],
                                    opens: '12:00',
                                    closes: '18:00',
                                },
                            ],
                        },
                        {
                            '@type': 'MedicalBusiness',
                            '@id': 'practice-2',
                            name: 'Приём врача Гуниной К.А. Медиком',
                            employee: { '@id': 'https://dr-gunina.ru/#physician' },
                            image: 'https://medicom-plus.ru/upload/resize_cache/iblock/6de/230_350_1/x75h4gnpzktsc3a4kwkqwhdatejc2nv0.png',
                            priceRange: '₽₽',
                            telephone: '+7 (965) 067-79-77',

                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'ул. Хохлова, 8',
                                addressLocality: 'Гатчина',
                                addressRegion: 'Ленинградская область',
                                postalCode: '188300',
                                addressCountry: 'RU',
                            },

                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: 59.574779,
                                longitude: 30.123214,
                            },

                            openingHoursSpecification: [
                                {
                                    '@type': 'OpeningHoursSpecification',
                                    dayOfWeek: ['Tuesday', 'Thursday', 'Sunday'],
                                    opens: '09:00',
                                    closes: '15:00',
                                },
                            ],
                        },
                        {
                            '@type': 'WebSite',
                            '@id': 'https://dr-gunina.ru/#website',
                            url: 'https://dr-gunina.ru/',
                            name: 'Гунина Ксения Александровна - педиатр, аллерголог-имунолог, дерматолог',
                            inLanguage: ['ru', 'en', 'es'],
                            publisher: { '@id': 'https://dr-gunina.ru/#physician' },
                        },
                    ],
                }),
            },
        ],
    });
}
