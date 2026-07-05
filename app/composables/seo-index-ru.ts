// SEO: Главная страница /ru/
import { useHead, useSeoMeta } from '#imports';

export function useSeoHome() {
    useSeoMeta({
        title: 'Гунина Ксения Александровна — педиатр, аллерголог, дерматолог онлайн',
        description:
            'Онлайн-консультация детского врача — педиатра, аллерголога и дерматолога. ' +
            'Очный приём в Гатчине. Курсы для родителей, догоняющий график вакцинации. ',

        ogTitle: 'Гунина Ксения Александровна — детский врач онлайн',
        ogDescription:
            'Педиатр, аллерголог и дерматолог. Онлайн-консультации, курсы для родителей, ' +
            'догоняющий график вакцинации. Очный приём в Гатчине.',
        ogType: 'website',
        ogLocale: 'ru_RU',
        ogLocaleAlternate: ['en_US', 'es_ES'],
        // ogImage: 'https://ВАШ_ДОМЕН/og/home-ru.jpg', // 1200×630px — добавь позже

        twitterCard: 'summary_large_image',
        twitterTitle: 'Гунина Ксения Александровна — педиатр, аллерголог, дерматолог онлайн',
        twitterDescription:
            'Онлайн-консультация детского врача. Курсы, вакцинация, очный приём в Гатчине.',

        robots: 'index, follow',
    });

    useHead({
        htmlAttrs: { lang: 'ru' },

        link: [
            { rel: 'canonical', href: 'https://ВАШ_ДОМЕН' },
            { rel: 'alternate', hreflang: 'ru', href: 'https://ВАШ_ДОМЕН/' },
            { rel: 'alternate', hreflang: 'en', href: 'https://ВАШ_ДОМЕН/en/' },
            { rel: 'alternate', hreflang: 'es', href: 'https://ВАШ_ДОМЕН/es/' },
            { rel: 'alternate', hreflang: 'x-default', href: 'https://ВАШ_ДОМЕН' },
        ],

        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'Physician',
                            '@id': 'https://ВАШ_ДОМЕН/#physician',
                            name: 'Гунина Ксения Александровна',
                            url: 'https://ВАШ_ДОМЕН',

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
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Гатчина',
                                addressRegion: 'Ленинградская область',
                                addressCountry: 'RU',
                                postalCode: '188300',
                                streetAddress: ['ул. Хохлова, 9', 'ул. Хохлова, 8'],
                                telephone: '',
                                priceRange: '₽₽',
                            },
                            areaServed: [
                                { '@type': 'Country', name: 'Russia' },
                                { '@type': 'Country', name: 'Spain' },
                                { '@type': 'Country', name: 'Argentina' },
                            ],
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
                                            //url: 'https://ВАШ_ДОМЕН/ru/konsultaciya-onlayn',
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
                                            //url: 'https://ВАШ_ДОМЕН/ru/konsultaciya-onlayn',
                                            provider: {
                                                '@type': 'Person',
                                                name: 'Гунина Ксения Александровна',
                                                '@id': 'https://ВАШ_ДОМЕН/#physician',
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
                                            name: 'Групповой чат поддержки для родителей с пидеатром, детским психологом и консультантом по сну',
                                            description:
                                                'Задавайте неограниченное количество вопросов в общем чате.' +
                                                'консультации психолога и специалиста по сну, ',
                                            //url: 'https://ВАШ_ДОМЕН/ru/vakcinaciya',
                                        },
                                    },
                                    {
                                        '@type': 'Offer',
                                        itemOffered: {
                                            '@type': 'Course',
                                            name: 'Курс "Без паники"',
                                            description:
                                                'Все, что необходимо знать родителям о первой помощи и безопасности ребенка.',
                                            //url: 'https://ВАШ_ДОМЕН/ru/vakcinaciya',
                                            provider: {
                                                '@type': 'Person',
                                                name: 'Гунина Ксения Александровна',
                                                '@id': 'https://ВАШ_ДОМЕН/#physician',
                                            },
                                            inLanguage: 'ru',
                                            courseMode: 'online',
                                        },
                                    },
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
                                            //url: 'https://ВАШ_ДОМЕН/ru/vakcinaciya',
                                        },
                                    },
                                    {
                                        '@type': 'Offer',
                                        priceSpecification: {
                                            '@type': 'PriceSpecification',
                                            price: '3000',
                                            priceCurrency: 'RUB',
                                        },
                                        itemOffered: {
                                            '@type': 'Service',
                                            name: 'Индивидуальный догоняющий график вакцинации',
                                            description:
                                                'Составление персонального догоняющего графика прививок.' +
                                                'Консультация по вакцинации.',
                                            //url: 'https://ВАШ_ДОМЕН/ru/vakcinaciya',
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
                            '@id': 'https://ВАШ_ДОМЕН/#website',
                            url: 'https://ВАШ_ДОМЕН/',
                            name: 'Гунина Ксения Александровна — детский врач',
                            inLanguage: ['ru', 'en', 'es'],
                            publisher: { '@id': 'https://ВАШ_ДОМЕН/#physician' },
                        },
                    ],
                }),
            },
        ],
    });
}
