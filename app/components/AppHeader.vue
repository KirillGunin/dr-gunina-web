<template>
    <header ref="header" class="header">
        <div class="container">
            <div class="header__container">
                <!-- Навигация -->
                <nav class="header__navigation" aria-label="Main navigation">
                    <ul v-if="!isPrivacyPage" class="header__menu">
                        <li
                            class="header__menu-item"
                            v-for="item in navigationItems"
                            :key="item.title"
                        >
                            <AppButton
                                rounded
                                :label="$t(item.title)"
                                :raised="activeSection === item.link"
                                :variant="activeSection === item.link ? 'outlined' : 'text'"
                                @click="scrollToSection(item.link)"
                            />
                        </li>
                    </ul>

                    <NuxtLink v-else to="/" class="header__menu-item--home">
                        <AppButton rounded raised variant="outlined">
                            <SvgIcon name="home" style="stroke-width: 2.5" />
                            Домой
                        </AppButton>
                    </NuxtLink>
                </nav>

                <!-- Логотип -->
                <div class="header__logo">
                    <a href="/" class="header__logo-link" aria-label="Home">
                        <SvgIcon name="logo" />
                    </a>
                </div>

                <!-- Соц сети -->
                <div class="header__socials">
                    <a
                        href="mailto:dr.kseniagunina@yandex.ru?subject=Письмо с сайта&body=Здравствуйте, Ксения Александровна!%0D%0A%0D%0AХочу уточнить по поводу "
                    >
                        <AppButton rounded raised variant="outlined">
                            <SvgIcon name="mail" />
                        </AppButton>
                    </a>

                    <AppButton rounded raised variant="outlined">
                        <SvgIcon name="telegram" />
                    </AppButton>

                    <AppPopoverLocale />

                    <AppButton rounded raised variant="outlined" @click="toggleMode">
                        <SvgIcon :name="isDarkMode ? 'lamp-on' : 'lamp-off'" />
                    </AppButton>
                </div>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from '#vue-router';

const route = useRoute();

const isDarkMode = ref<boolean>(false);
const activeSection = ref<string>('about');
const header = ref<HTMLElement | null>(null);
let observer: IntersectionObserver;

const isPrivacyPage = computed(() => route.path === '/privacy');

const toggleMode = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('dark-mode');
};

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element && header.value) {
        const offset = header.value.getBoundingClientRect().height;
        const elementPosition = element.offsetTop - offset;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
        });
    }
};

const navigationItems = [
    { title: 'header.about', link: 'about' },
    { title: 'header.services', link: 'services' },
    { title: 'header.contacts', link: 'contacts' },
];

onMounted(() => {
    const sections = navigationItems
        .map((i) => document.getElementById(i.link))
        .filter(Boolean) as HTMLElement[];

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    activeSection.value = e.target.id;
                }
            });
        },
        {
            // rootMargin: '-20% 0px -40% 0px',
            threshold: 0.3,
        }
    );

    sections.forEach((s) => observer.observe(s));
});

onUnmounted(() => observer?.disconnect());
</script>
